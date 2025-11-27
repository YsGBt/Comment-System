import { MoreVertical } from 'lucide-react';
import { useComments } from "../hooks/useComments";
import { CommentInput } from "../components/CommentInput";
import { CommentCard } from "../components/CommentCard";
import { useState } from "react";

export const CommentsPage = () => {
  const { comments, loading, addComment, likeComment, updateCommentText, deleteComment } = useComments();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!author || !text) return;
  //   await addComment({ author, text });
  // };

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-8 px-4 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="flex items-center gap-8 mb-6">
          <h2 className="text-xl font-bold text-white">
            {comments.length} Comments
          </h2>
          {/* <div className="flex items-center gap-2 cursor-pointer text-white hover:text-gray-300">
            <MoreVertical size={24} />
            <span className="font-bold text-sm">Sort by</span>
          </div> */}
        </div>

        {/* Add Comment Section */}
        <CommentInput
          onSubmit={(comment) => addComment(comment)}
        />


        {/* Comment List */}
        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} onLike={likeComment} onUpdate={updateCommentText} onDelete={deleteComment} currentAuthor={comment.author} />
          ))}
        </div>
      </div>
    </div>
  );
};
