import client from "./axios";

/**
 * API client functions for managing comments via the FastAPI backend.
 */

/**
 * Retrieves all comments from the server, ordered by creation date (newest first).
 * Corresponds to: GET /comments/
 * @returns {Promise<AxiosResponse<CommentRead[]>>}
 */
export const fetchComments = async () => {
    return client.get("/comments/");
};

/**
 * Creates a new comment.
 * Corresponds to: POST /comments/
 * @param {object} comment - The new comment data {author, text, image}
 * @returns {Promise<AxiosResponse<CommentRead>>}
 */
export const createComment = async (comment) => {
    // Note: The FastAPI backend expects 'image' for the avatar,
    // not just 'image' or 'text'. Ensure the input object matches the Pydantic schema.
    return client.post("/comments/", comment);
};

/**
 * Updates an existing comment, typically used for incrementing likes.
 * Corresponds to: PATCH /comments/{comment_id}
 * @param {number} commentId - The ID of the comment to update.
 * @param {object} updateData - An object containing fields to update (e.g., {likes: 102}).
 * @returns {Promise<AxiosResponse<CommentRead>>}
 */
export const updateComment = async (commentId, updateData) => {
    return client.patch(`/comments/${commentId}`, updateData);
};

/**
 * Deletes a comment by ID.
 * Corresponds to: DELETE /comments/{comment_id}
 * @param {number} commentId - The ID of the comment to delete.
 * @returns {Promise<AxiosResponse<void>>}
 */
export const deleteComment = async (commentId) => {
    return client.delete(`/comments/${commentId}`);
};