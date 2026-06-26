import { getUserById } from '@/lib/actions/common';
import React from 'react';

const CommentsSection = ({ comments }) => {



    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">No comments for this lesson yet.</p>
            ) : (
                comments.map(async(comment) => {
                    // Safely format the timestamp to "Month Year" (e.g., "June 2026")
                    const formattedDate = comment?.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                        })
                        : 'Unknown Date';

                    const authorData = await getUserById(comment.userId);
                    const authorName = authorData?.name;
                    return (
                        <div
                            key={comment._id || comment.id}
                            className="bg-zinc-900/10 border border-zinc-900/60 rounded-xl p-4 space-y-2"
                        >
                            <div className="flex items-center justify-between text-xs">
                                {/* Dynamic Author Name */}
                                <span className="font-bold text-zinc-300">
                                    {authorName || 'Anonymous'}
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
                })
            )}
        </div>
    );
};

export default CommentsSection;