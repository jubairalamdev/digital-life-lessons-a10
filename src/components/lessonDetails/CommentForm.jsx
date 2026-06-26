"use client"

import { serverMutation } from '@/lib/actions/common';
import { Button, Input } from '@heroui/react';
import { Send } from 'lucide-react';
import React from 'react';

const CommentForm = ({ user, lesson }) => {
    const currentUserId = user?.id
    const currentLessonId = lesson?._id
    const postComment = async(formData) => {
        const comment = Object.fromEntries(formData.entries());
        comment.userId = currentUserId
        comment.lessonId = currentLessonId
        comment.createdAt = new Date(); // Stores the current date and time
        // console.log("Submitting new user payload:", comment);
        const resData = await serverMutation(`/api/comments`, comment, "POST");
        // Refresh the Server Component router tree state context safely if necessary
        window.location.reload();
        return resData;
    }
    return (
        <form 
            className="flex gap-3 items-end bg-zinc-900/20 border border-zinc-900 p-4 rounded-xl"
            onSubmit={(e) => {
                e.preventDefault();
                // Instantiate the structural FormData object using the submission target directly
                const formDataInstance = new FormData(e.currentTarget);
                postComment(formDataInstance);
            }}
            >
            <div className="flex-1">
                <Input
                    size="sm"
                    type="text"
                    name='comment'
                    placeholder="Add your constructive reflection or experience inquiry..."
                    className="bg-zinc-950 w-full text-white border border-zinc-800 rounded-xl outline-none"
                />
            </div>
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl min-w-0 px-4 h-9 border border-zinc-700" type='submit'>
                <Send size={14} />
            </Button>
        </form>
    );
};

export default CommentForm;