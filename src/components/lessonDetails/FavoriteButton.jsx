"use client"; // Required for useState and useEffect

import { useState, useEffect } from "react";
import { serverMutation } from "@/lib/actions/common";
import { Button } from "@heroui/react";
import { Bookmark } from "lucide-react";

const FavoriteButton = ({ lesson, user }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(true);

    // Extract raw string variables safely
    const userIdStr = user?.id;
    const lessonIdStr = lesson?._id;

    // Check if this lesson is already favorited on mount
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            // Guard clause if user or lesson are missing
            if (!userIdStr || !lessonIdStr) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true); // Ensure loading state resets cleanly on target change
                const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
                const res = await fetch(`${baseUrl}/api/favorites/check?userId=${userIdStr}&lessonId=${lessonIdStr}`);
                
                if (res.ok) {
                    const data = await res.json();
                    
                    // Explicitly check for valid document presence to toggle state
                    if (data && data._id) {
                        setIsFavorited(true);
                    } else {
                        setIsFavorited(false);
                    }
                }
            } catch (error) {
                console.error("Error checking favorite status:", error);
            } finally {
                setLoading(false);
            }
        };

        checkFavoriteStatus();
    // Depend strictly on the primitive string values, never the parent objects
    }, [userIdStr, lessonIdStr]);

    const handleFavoriteClick = async () => {
        if (!userIdStr || !lessonIdStr || isFavorited) return;

        // Optimistically set state to true so the user gets instant feedback
        setIsFavorited(true);

        const favoriteData = {
            userId: userIdStr,
            lessonId: lessonIdStr,
            createdAt: new Date()
        };

        const result = await serverMutation('/api/favorites', favoriteData, "POST");
        
        if (!result) {
            // Revert state if the API mutation fails
            setIsFavorited(false);
        }
    };

    if (loading) {
        return (
            <Button size="sm" isDisabled className="h-9 rounded-xl text-xs bg-zinc-900 text-zinc-500 border border-zinc-800 animate-pulse">
                Checking status...
            </Button>
        );
    }

    return (
        <Button 
            onClick={handleFavoriteClick} 
            isDisabled={isFavorited} // Disable the button if it's already favorited
            size="sm" 
            className={`h-9 rounded-xl text-xs flex items-center gap-2 border transition-colors ${
                isFavorited 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500 cursor-not-allowed" 
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800"
            }`}
        >
            <Bookmark 
                size={14} 
                className={isFavorited ? "fill-amber-500 text-amber-500" : "text-amber-500"} 
            /> 
            {isFavorited ? "Saved" : "Save"}
        </Button>
    );
};

export default FavoriteButton;