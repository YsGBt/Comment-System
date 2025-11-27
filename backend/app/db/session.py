from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.config import settings

engine = create_async_engine(settings.DATABASE_URL, future=True, echo=True)
async_session_maker = async_sessionmaker(bind=engine, expire_on_commit=False)
