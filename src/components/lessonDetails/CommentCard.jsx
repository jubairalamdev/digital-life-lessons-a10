import React from 'react';

const CommentCard = ({comment}) => {
    return (
        <div
                            key={comment._id || comment.id}
                            className="bg-zinc-900/10 border border-zinc-900/60 rounded-xl p-4 space-y-2"
                        >
                            <div className="flex items-center justify-between text-xs">
                                {/* Dynamic Author Name */}
                                <span className="font-bold text-zinc-300">
                                    {comment.authorName || 'Anonymous'}
                                </span>

                                {/* Dynamic Formatted Date */}
                                <span className="font-mono text-zinc-600">
                                    {formattedDate}
                                </span>
                            </div>

                            {/* Dynamic Comment Body */}
                            <p className="text-sm font-light text-zinc-400 leading-relaxed">
                                {comment.comment}
                            </p>
                        </div>
    );
};

export default CommentCard;