"use client";

import React from "react";
import { Button, Chip } from "@heroui/react";
import { Eye, Edit, Trash2, Calendar, ThumbsUp, Heart } from "lucide-react";
import Image from "next/image";

const LessonRowItem = {
    // 1. Title and Cover cell 
    TitleCell: ({ lesson }) => (
        <div className="flex items-center gap-3 pl-6 py-4">
            {lesson.image ? (
                <Image
                    src={lesson.image}
                    alt={lesson.name}
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-lg object-cover border border-zinc-800"
                />
            ) : (
                <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 font-mono text-xs">
                    N/A
                </div>
            )}
            <div className="flex flex-col max-w-xs">
                <span className="text-white font-bold text-base line-clamp-1">{lesson.title}</span>
                <span className="text-zinc-500 text-xs font-mono line-clamp-1">ID: {lesson._id}</span>
            </div>
        </div>
    ),

    // 2. Category styling matching main layout badges
    CategoryCell: ({ lesson }) => (
        <div className="py-4 text-zinc-300 text-base font-medium">
            {lesson.category}
        </div>
    ),

    // 3. Visibility configuration wrapper
    VisibilityCell: ({ lesson }) => (
        <div className="py-4">
            <Chip
                variant="flat"
                size="sm"
                className={`${lesson.visibility?.toLowerCase() === 'public' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'} font-bold uppercase text-xs rounded-md px-1`}
            >
                {lesson.visibility || "Public"}
            </Chip>
        </div>
    ),

    // 4. Guarded Access metrics
    AccessCell: ({ lesson, isPremiumUser }) => (
        <div className="py-4">
            <Chip
                variant="flat"
                size="sm"
                className={`${lesson.accessLevel?.toLowerCase() === 'premium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'} font-bold uppercase text-xs rounded-md px-1`}
            >
                {lesson.accessLevel || "Free"}
            </Chip>
        </div>
    ),

    // 5. Aggregate interactive tracking performance analytics stats
    MetricsCell: ({ lesson }) => (
        <div className="py-4 flex flex-col gap-1 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
                <ThumbsUp size={13} className="text-zinc-500" /> {lesson.likes.length || 0} Likes
            </span>
        </div>
    ),

    // 6. Native Date Stamp Format Parsing block
    DateCell: ({ lesson }) => (
        <div className="py-4 text-zinc-400 text-sm font-medium flex items-center gap-1.5">
            <Calendar size={14} className="text-zinc-600" />
            {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "Recent"}
        </div>
    ),

    // 7. Operations Control Actions row (Handlers left completely blank for next execution modules)
    ActionsCell: ({ lesson }) => (
        <div className="flex items-center justify-end gap-2 pr-6 py-4">

            {/* Update / Patch Button */}
            <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg"
                title="Update Lesson"
            >
                <Edit size={16} />
            </Button>

            {/* Delete Confirmation Button */}
            <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                title="Delete Lesson permanently"
            >
                <Trash2 size={16} />
            </Button>
        </div>
    )
};

export default LessonRowItem;