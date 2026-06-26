import React from 'react';
import Link from 'next/link';
import { Table, Button } from '@heroui/react';
import { serverFetchById } from '@/lib/actions/common';
import { Eye } from 'lucide-react';

export async function FavoriteRow({ favorite, currentUserId, baseUrl }) {
    const actualLesson = await serverFetchById(`/api/lessons`, favorite.lessonId);

    // If the lesson was deleted from the main database, render a fallback row with EXACTLY 5 cells
    if (!actualLesson) {
        return (
            <Table.Row className="border-b border-zinc-900/40 opacity-50">
                <Table.Cell className="pl-6 py-4 text-zinc-500 italic text-sm">
                    [Lesson no longer available]
                </Table.Cell>
                <Table.Cell className="py-4 text-zinc-600">—</Table.Cell>
                <Table.Cell className="py-4 text-zinc-600">—</Table.Cell>
                <Table.Cell className="py-4 text-zinc-600">—</Table.Cell>
                {/* Added the missing 5th cell here to match the header count */}
                <Table.Cell className="py-4 pr-6 text-right"></Table.Cell>
            </Table.Row>
        );
    }

    return (
        <Table.Row className="border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors">
            
            {/* 1. Name Track Identity */}
            <Table.Cell className="pl-6 py-4 max-w-xs font-medium text-zinc-200">
                <span className="line-clamp-1 text-sm tracking-tight">
                    {actualLesson.title || actualLesson.name}
                </span>
            </Table.Cell>
            
            {/* 2. Category Tag Badge */}
            <Table.Cell className="py-4 text-xs font-mono text-zinc-400">
                {actualLesson.category || "Mindset"}
            </Table.Cell>
            
            {/* 3. Tone Metric Cell */}
            <Table.Cell className="py-4 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800 font-medium">
                    {actualLesson.emotionalTone || "Realization"}
                </span>
            </Table.Cell>
            
            {/* 4. Tier Restriction Label */}
            <Table.Cell className="py-4 text-xs">
                <span className={`font-semibold tracking-wider ${actualLesson.accessLevel === 'Premium' ? 'text-amber-400 text-[11px]' : 'text-zinc-600'}`}>
                    {actualLesson.accessLevel || "Free"}
                </span>
            </Table.Cell>
            
            {/* 5. Operation Button Interactions Execution Cluster */}
            <Table.Cell className="py-4 pr-6 text-right">
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/lesson/${actualLesson._id}`}>
                        <Button 
                            size="sm" 
                            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 rounded-xl px-3 h-8 text-[11px] font-semibold flex items-center gap-1.5 transition-all"
                        >
                            <Eye size={13} className="text-zinc-500" /> Details
                        </Button>
                    </Link>
                </div>
            </Table.Cell>

        </Table.Row>
    );
}