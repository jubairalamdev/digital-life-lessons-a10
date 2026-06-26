"use client";

import React, { useState } from 'react';
import { Button, toast } from '@heroui/react';
import { Heart } from 'lucide-react';
import { serverMutation } from '@/lib/actions/common';

export default function LikeButton({ user, lesson }) {
    // 1. Check if the current user's ID exists in the lesson's likes array
    const [isLiked, setIsLiked] = useState(
        lesson?.likes?.includes(user?.id) || false
    );
    
    const [isLiking, setIsLiking] = useState(false);

    const handleLikeToggle = async () => {
        if (!user?.id || !lesson?._id) {
            return toast.error("Please Login to like")
        };
        
        setIsLiking(true);
        
        // Optimistic UI update (fills heart instantly)
        const nextState = !isLiked;
        setIsLiked(nextState);

        // 2. Call the backend to $pull or $addToSet
        const result = await serverMutation(
            `/api/lessons/like/${lesson._id}`,
            { userId: user.id },
            'PATCH'
        );

        // 3. If the network request failed, revert the heart state
        // if (!result) {
        //     setIsLiked(!nextState);
        // }

        setIsLiking(false);
    };

    return (
        <Button
            size="sm"
            isLoading={isLiking}
            onClick={handleLikeToggle}
            className={`h-9 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                isLiked 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' 
                    : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
            }`}
        >
            {/* fill-current ensures the heart icon fills with color when liked */}
            <Heart size={14} className={`${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
        </Button>
    );
}