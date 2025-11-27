from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.routes import comments

from app.db.session import async_session_maker
from app.seed.seed import wait_for_db, wait_for_migrations_to_complete, seed_comments


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip().rstrip("/")
                   for origin in settings.ALLOWED_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(comments.router, tags=["comments"])


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup_event():
    await wait_for_db()

    async with async_session_maker() as session:
        await wait_for_migrations_to_complete(session)
        await seed_comments(session)
