import { useState, useRef, useEffect } from "react";
import { ThumbsUp, ThumbsDown, MoreVertical, CornerDownRight, PencilLine, Trash2 } from 'lucide-react';
import { formatDate } from "../utils/time-formatters";
import { LetterAvatar } from "./LetterAvatar";

// --- COMMENT CARD COMPONENT (Updated with Edit Logic and user's structure) ---
export const CommentCard = ({ comment, onLike, onUpdate, onDelete, currentAuthor }) => {
  // State for UI and Edit functionality
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock Authorization: Only the currentAuthor can edit/delete
  const canModify = comment.author === currentAuthor;

  // Effect to handle clicks outside the menu container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handlers for Edit functionality
  const handleSave = async () => {
    // Prevent saving if text is unchanged or empty
    if (editText.trim() === comment.text || editText.trim() === "") {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(comment.id, { text: editText.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving edit:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditText(comment.text); // Reset text to original
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(comment.id);
    setMenuOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMenuOpen(false);
  }

  return (
    <div className="group flex gap-4 w-full items-start">
      {/* Avatar Section */}
      <LetterAvatar
        name={comment.author}
        src={comment.image}
        size="w-10 h-10"
      />

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-1">
        {/* Header: Author + Time */}
        <div className="flex items-baseline gap-2 text-sm">
          <span className="font-semibold text-white cursor-pointer hover:underline text-[13px]">
            @{comment.author.replace(/\s/g, '').toLowerCase()}
          </span>
          <span className="text-gray-400 text-xs hover:text-gray-300 cursor-pointer">
            {formatDate(comment.date)}
            {comment.text !== editText && !isEditing && (
              <span className="ml-2">(edited)</span>
            )}
          </span>
        </div>

        {/* Comment Body / Edit Input */}
        {isEditing ? (
          <div className="w-full flex flex-col space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="bg-gray-700 p-2 rounded text-base text-white focus:outline-none resize-none min-h-[80px]"
              autoFocus
            />
            <div className="flex justify-end space-x-3 pt-1">
              <button
                type="button"
                className="px-3 py-1 text-sm font-medium text-white/80 hover:bg-white/20 rounded-full transition duration-150 ease-in-out"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-sm font-medium rounded-full transition duration-150 ease-in-out 
                                            ${(editText.trim() === comment.text || editText.trim() === "") || isUpdating ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-400 text-black hover:bg-blue-300'}`
                }
                onClick={handleSave}
                disabled={(editText.trim() === comment.text || editText.trim() === "") || isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          // Read-only Comment Text
          <p className="text-[14px] leading-6 text-[#f1f1f1]">
            {comment.text}
          </p>
        )}


        {/* Action Bar (Likes, Dislikes, Reply) */}
        {!isEditing && (
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1">
              <button
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
                onClick={() => onLike(comment.id)}
                aria-label="Like comment"
              >
                <ThumbsUp size={16} />
              </button>
              <span className="text-xs text-gray-400 font-medium">{comment.likes}</span>
            </div>

            {/* <button
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Dislike comment"
            >
              <ThumbsDown size={16} />
            </button>

            <button className="px-3 py-2 rounded-full hover:bg-white/10 text-xs font-medium text-white transition-colors">
              Reply
            </button> */}
          </div>
        )}

        {/* Reply Count (Visual Cue) */}
        {/* {comment.replies > 0 && (
          <button className="flex items-center gap-3 mt-1 px-4 py-2 rounded-full hover:bg-blue-300/10 text-blue-400 w-fit group-/replies">
            <CornerDownRight size={16} className="text-blue-400" />
            <span className="text-sm font-medium">{comment.replies} replies</span>
          </button>
        )} */}
      </div>

      {/* More Options Menu Container (Positioning Fix) */}
      <div ref={menuRef} className="relative">
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-haspopup="true"
          aria-label="Comment options"
        >
          <MoreVertical size={20} />
        </button>

        {/* Options Dropdown Menu (Positioned absolutely) */}
        {menuOpen && canModify && (
          <div className="absolute right-0 top-8 w-30 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 overflow-hidden">
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
              onClick={handleEditClick}
              disabled={isEditing}
            >
              <PencilLine size={16} />
              <span className="inline-block translate-y-[1.5px]">Edit</span>
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
              onClick={handleDeleteClick}
            >
              <Trash2 size={16} />
              <span className="inline-block -translate-y-[-1px]">Delete</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};