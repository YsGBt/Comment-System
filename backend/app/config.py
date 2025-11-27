from pydantic import BaseModel
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "CommentAPI"
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    DATABASE_URL: str
    ALLOWED_ORIGINS: str

    class Config:
        env_file = ".env"


settings = Settings()
