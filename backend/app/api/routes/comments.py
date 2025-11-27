from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete, update
from typing import List

from app.api.dependencies.db import get_async_session
from app.schemas.comment import CommentCreate, CommentRead, CommentUpdate
from app.db.models.comment import Comment

# Initialize the APIRouter for comment-related endpoints
router = APIRouter(
    prefix="/comments",
    tags=["comments"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
async def create_comment(
    comment: CommentCreate, db: AsyncSession = Depends(get_async_session)
):
    """
    Creates a new comment in the database.
    """
    # Convert the Pydantic schema to a SQLAlchemy model instance
    db_comment = Comment(
        author=comment.author,
        text=comment.text,
        image=comment.image,
        likes=0  # Always start with 0 likes
    )

    db.add(db_comment)
    await db.commit()
    await db.refresh(db_comment)

    return db_comment


@router.get("/", response_model=List[CommentRead])
async def read_all_comments(db: AsyncSession = Depends(get_async_session)):
    """
    Retrieves a list of all comments.
    """
    result = await db.execute(select(Comment).order_by(Comment.date.desc()))
    comments = result.scalars().all()
    return comments


@router.get("/{comment_id}", response_model=CommentRead)
async def read_comment(comment_id: int, db: AsyncSession = Depends(get_async_session)):
    """
    Retrieves a single comment by its ID.
    """
    result = await db.execute(select(Comment).filter(Comment.id == comment_id))
    comment = result.scalars().first()

    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )

    return comment


@router.patch("/{comment_id}", response_model=CommentRead)
async def update_comment(
    comment_id: int,
    comment_update: CommentUpdate,
    db: AsyncSession = Depends(get_async_session)
):
    """
    Partially updates an existing comment by ID.
    """
    # Retrieve the existing comment
    result = await db.execute(select(Comment).filter(Comment.id == comment_id))
    db_comment = result.scalars().first()

    if db_comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )

    # Convert Pydantic model to a dictionary, ignoring fields that were not provided
    update_data = comment_update.dict(exclude_unset=True)

    # Apply updates to the SQLAlchemy model instance
    for key, value in update_data.items():
        setattr(db_comment, key, value)

    db.add(db_comment)
    await db.commit()
    await db.refresh(db_comment)

    return db_comment


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_async_session)):
    """
    Deletes a comment by its ID.
    """
    # First, check if the comment exists before attempting deletion
    result = await db.execute(select(Comment).filter(Comment.id == comment_id))
    if result.scalars().first() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )

    # Perform the deletion
    await db.execute(delete(Comment).where(Comment.id == comment_id))
    await db.commit()

    # FastAPI automatically handles the 204 response (No Content)
    return
