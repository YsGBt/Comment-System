from app.db.models import *
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base class which provides automated table name
    and other common configurations for SQLAlchemy models.
    """
    pass
