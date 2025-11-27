from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.db.base import Base


class Comment(Base):
    """
    SQLAlchemy model for a comment, based on the provided JSON structure.

    id: Primary key (Integer)
    author: The name of the commenter (String)
    text: The main content of the comment (Text)
    date: The timestamp when the comment was created (DateTime)
    likes: The current number of likes (Integer, defaults to 0)
    image: The URL for the author's avatar image (String)
    """
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String(100), nullable=False)
    text = Column(Text, nullable=False)
    date = Column(DateTime(timezone=True),
                  server_default=func.now(), nullable=False)
    likes = Column(Integer, default=0, nullable=False)
    image = Column(String(255), default="", nullable=False)
