import { useState } from "react";
import { LetterAvatar } from "./LetterAvatar";

export const CommentInput = ({ onSubmit }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!author || !text) return;
        onSubmit({ author: author, text: text });
        clearComment()
    };

    const clearComment = () => {
        setAuthor("")
        setText("");
        setIsFocused(false);
    };

    return (
        <div className="flex gap-4 mb-8 w-full">
            <LetterAvatar
                name={author}
                // name={comment.author}
                // src={comment.image}
                size="w-10 h-10"
            />
            <div className="flex flex-col w-full gap-2">
                {/* Author Input - Always visible */}
                <input
                    type="text"
                    placeholder="Your Name (Author)"
                    className="w-1/3 min-w-[150px] bg-transparent border-b border-gray-700 focus:border-white text-white outline-none pb-1 placeholder-gray-400 transition-colors text-sm"
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                />
                {/* Main Comment Input */}
                <div className="flex flex-col w-full gap-2">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full bg-transparent border-b border-gray-700 focus:border-white text-white outline-none pb-1 placeholder-gray-400 transition-colors"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => !text && setIsFocused(false)}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    {(isFocused || text) && (
                        <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center">{/* Emoji icon */}</div>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-full transition-colors"
                                    onClick={clearComment}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${author && text
                                        ? 'bg-blue-400 text-black hover:bg-blue-300'
                                        : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!author || !text}
                                    onClick={handleSubmit}
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
