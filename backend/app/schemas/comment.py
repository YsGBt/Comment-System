from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class CommentBase(BaseModel):
    """
    Base schema for comment data that can be used for inputs.
    Excludes server-generated fields like id, date, and likes.
    """
    author: str
    text: str
    image: str = Field("")


class CommentCreate(CommentBase):
    """
    Schema used for creating a new comment.
    It simply inherits the necessary fields from CommentBase.
    """
    pass


class CommentRead(CommentBase):
    """
    Schema used for reading a comment from the database (response model).
    Includes all fields, including server-generated ones.
    """
    id: int
    date: datetime
    likes: int

    class Config:
        # Enables reading data directly from SQLAlchemy ORM objects
        from_attributes = True


class CommentUpdate(BaseModel):
    """
    Schema for updating an existing comment (PATCH request).
    All fields are optional.
    """
    author: Optional[str] = Field(
        None, description="The name of the comment author.")
    text: Optional[str] = Field(
        None, description="The content of the comment.")
    image: Optional[str] = Field(
        None, description="The URL for the author's avatar image.")
    likes: Optional[int] = Field(None, description="The number of likes.")
