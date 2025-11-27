import { useState, useEffect } from "react";
import { fetchComments, createComment, updateComment, deleteComment } from "../api/comments";

// Helper function to find and update a comment in the state array
const updateCommentInState = (prevComments, id, update) => {
    return prevComments.map(c =>
        c.id === id ? { ...c, ...update } : c
    );
};

export const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all comments from the backend API.
     */
    const loadComments = async () => {
        setLoading(true);
        try {
            const response = await fetchComments();
            setComments(response.data);
        } catch (err) {
            console.error("Failed to load comments:", err);
            // Handle error gracefully
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Creates a new comment via the API and adds the returned object to the state.
     * @param {object} comment - {author, text, image}
     */
    const addComment = async (comment) => {
        try {
            // 1. Call API to create comment
            const response = await createComment(comment);
            const newComment = response.data;

            // 2. Add the new comment (returned from server with ID and timestamp) to the top of the list
            setComments((prev) => [newComment, ...prev]);
        } catch (err) {
            console.error("Failed to add comment:", err);
            // You might want to display a toast notification here
        }
    };

    /**
     * Increments the like count for a comment, updating the backend.
     * Uses optimistic UI update.
     * @param {number} id - The ID of the comment to like.
     */
    const likeComment = async (id) => {
        const commentToLike = comments.find(c => c.id === id);
        if (!commentToLike) return;

        // 1. Optimistic UI update
        const newLikes = commentToLike.likes + 1;
        setComments(prev => updateCommentInState(prev, id, { likes: newLikes }));

        try {
            // 2. Send update request to the backend
            // The API handles the PATCH request to update the 'likes' field
            await updateComment(id, { likes: newLikes });
        } catch (err) {
            console.error("Failed to like comment:", err);
            // 3. Revert optimistic update on failure
            setComments(prev => updateCommentInState(prev, id, { likes: commentToLike.likes }));
        }
    };

    const updateCommentText = async (id, updatedComment) => {
        const commentToUpdate = comments.find(c => c.id === id);
        if (!commentToUpdate) return;

        setComments(prev => updateCommentInState(prev, id, { text: updatedComment.text }));

        try {
            await updateComment(id, { text: updatedComment.text });
        } catch (err) {
            console.error("Failed to like comment:", err);
            setComments(prev => updateCommentInState(prev, id, { text: commentToUpdate.text }));
        }
    };

    /**
     * Deletes a comment by ID, updating the backend.
     * Uses optimistic UI update.
     * @param {number} id - The ID of the comment to delete.
     */
    const removeComment = async (id) => {
        // 1. Store original list for rollback
        const originalComments = comments;

        // 2. Optimistic UI update: filter out the comment
        setComments(prev => prev.filter(c => c.id !== id));

        try {
            // 3. Send delete request to the backend API
            await deleteComment(id);
        } catch (err) {
            console.error("Failed to delete comment:", err);
            // 4. Revert optimistic update on failure
            setComments(originalComments);
            // Optionally, show error to user
        }
    };

    // Load data on component mount
    useEffect(() => {
        loadComments();
    }, []);


    useEffect(() => {
        console.log("Comments updated:", comments);
    }, [comments]);

    return {
        comments,
        loading,
        reload: loadComments,
        addComment,
        likeComment,
        updateCommentText,
        deleteComment: removeComment // Renamed local function to removeComment to avoid naming conflict with imported function, mapping to deleteComment in return
    };
};