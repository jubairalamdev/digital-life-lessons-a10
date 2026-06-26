"use client";

import React from "react";
import { Table } from "@heroui/react";
import { Calendar } from "lucide-react";

export default function LessonRow({ lesson }) {
    return (
        <Table.Row className="border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors">
            <Table.Cell>
                <div className="flex items-center gap-3 font-semibold text-white py-1">
                    {lesson.image ? (
                        <img
                            src={lesson.image}
                            className="w-8 h-8 rounded-md object-cover border border-zinc-800"
                            alt={lesson.title}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800" />
                    )}
                    <span className="line-clamp-1">{lesson.title}</span>
                </div>
            </Table.Cell>

            <Table.Cell>
                <span className="text-sm font-mono text-zinc-400">
                    {lesson.category || "General"}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {lesson.visibility || "Public"}
                </span>
            </Table.Cell>

            <Table.Cell>
                <div className="flex items-center justify-end gap-1.5 text-zinc-500 text-xs font-medium">
                    <Calendar size={12} />
                    {lesson.createdAt
                        ? new Date(lesson.createdAt).toLocaleDateString()
                        : "Recent"}
                </div>
            </Table.Cell>
        </Table.Row>
    );
}