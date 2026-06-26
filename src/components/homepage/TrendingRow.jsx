import React from 'react';
import { Table } from '@heroui/react';
import { serverFetchById } from '@/lib/actions/common';

export async function TrendingRow({ stat, baseUrl }) {
    let actualLesson = {}
    try {
        actualLesson = await serverFetchById(`/api/lessons`, stat.lessonId);
    }
    catch(error){
        // console.log("Unable to get data: ", error)
    }

    if (!actualLesson) {
        return (
            null
        );
    }

    return (
        <Table.Row className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
            
            {/* Name Cell matches font-semibold and text-white */}
            <Table.Cell className="font-semibold text-white py-4 max-w-xs">
                <span className="line-clamp-1 text-sm tracking-tight">
                    {actualLesson.title || actualLesson.name}
                </span>
            </Table.Cell>
            
            {/* Tone Cell matches your badge layout styling logic cleanly */}
            <Table.Cell className="py-4">
                <span className="px-2 py-0.5 rounded text-xs bg-zinc-800 text-zinc-400 font-medium border border-zinc-700/30">
                    {actualLesson.emotionalTone || "Insight"}
                </span>
            </Table.Cell>
            
            {/* Count Favorites Cell matches text-right and custom colors */}
            <Table.Cell className="text-right font-bold text-emerald-400 py-4 font-mono">
                {stat.countFavorites}
            </Table.Cell>

        </Table.Row>
    );
}