"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { Eye, Edit, Calendar, ThumbsUp, Heart, LinkIcon } from "lucide-react";
import Link from "next/link";
import DeleteLessonAction from "./DeleteLessonAction";
import UpdateLessonAction from "./UpdateLessonAction";

export default function MyLessonsTable({ initialLessons, isPremiumUser }) {
    const [lessons, setLessons] = useState(initialLessons || []);

    // State filtering sync passed directly into subcomponent instances
    const handleOptimisticUIPurge = (deletedId) => {
        setLessons((prev) => prev.filter((lesson) => lesson._id !== deletedId));
    };

    return (
        <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="User's Created Lessons List" className="min-w-[800px] bg-zinc-950/20 backdrop-blur-md">

                        <Table.Header>
                            <Table.Column isRowHeader className="pl-6 h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase">
                                Title / Cover
                            </Table.Column>
                            <Table.Column className="h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase">Category</Table.Column>
                            <Table.Column className="h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase">Visibility</Table.Column>
                            <Table.Column className="h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase">Access Level</Table.Column>
                            <Table.Column className="h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase">Metrics</Table.Column>
                            <Table.Column className="h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase">Created Date</Table.Column>
                            <Table.Column className="pr-6 h-12 text-zinc-400 font-bold text-sm tracking-wider uppercase text-right">Actions</Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No lessons found under your profile."}>
                            {lessons.map((lesson) => (
                                <Table.Row key={lesson._id} className="border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors">

                                    {/* 1. Title / Image Identity */}
                                    <Table.Cell className="pl-6 py-4 max-w-xs font-medium text-zinc-200">
                                        <div className="flex items-center gap-3">
                                            {lesson.image ? (
                                                <img
                                                    src={lesson.image}
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg object-cover border border-zinc-800"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 font-mono text-xs">
                                                    N/A
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="line-clamp-1 text-base font-bold text-white tracking-tight">
                                                    {lesson.title}
                                                </span>
                                                <span className="text-zinc-500 text-xs font-mono">
                                                    ID: {lesson._id}
                                                </span>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    {/* 2. Category Cell */}
                                    <Table.Cell className="py-4 text-sm font-mono text-zinc-300 font-medium">
                                        {lesson.category || "Mindset"}
                                    </Table.Cell>

                                    {/* 3. Visibility Cell */}
                                    <Table.Cell className="py-4 text-sm">
                                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold uppercase border ${lesson.visibility?.toLowerCase() === 'public'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                                            }`}>
                                            {lesson.visibility || "Public"}
                                        </span>
                                    </Table.Cell>

                                    {/* 4. Access Control Tier Badge */}
                                    <Table.Cell className="py-4 text-sm">
                                        <span className={`font-bold tracking-wider text-xs ${lesson.accessLevel === 'Premium' ? 'text-amber-400' : 'text-zinc-500'
                                            }`}>
                                            {lesson.accessLevel || "Free"}
                                        </span>
                                    </Table.Cell>

                                    {/* 5. Metrics Interaction Analytics */}
                                    <Table.Cell className="py-4 text-sm text-zinc-400">
                                        <div className="flex flex-col gap-0.5 font-medium">
                                            <span className="flex items-center gap-1.5 text-xs">
                                                <ThumbsUp size={12} className="text-zinc-500" /> {lesson.likes.length || 0} Likes
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    {/* 6. Date Created Cell */}
                                    <Table.Cell className="py-4 text-sm text-zinc-400 font-medium">
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <Calendar size={13} className="text-zinc-500" />
                                            {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "Recent"}
                                        </div>
                                    </Table.Cell>

                                    {/* 7. Action Operations Execution Cluster */}
                                    <Table.Cell className="py-4 pr-6 text-right">
                                        <div className="flex items-center flex-wrap justify-end gap-2">
                                            <Link 
                                                className="bg-zinc-900 hover:bg-gray-950/40 border border-zinc-800/80 text-gray-300 rounded-xl pr-2 pl-1 h-8 text-xs font-semibold flex items-center  transition-all" 
                                                href={`/lesson/${lesson._id}`}
                                            >
                                                    <LinkIcon className="h-3" /> Details
                                            </Link>
                                            <UpdateLessonAction
                                                lesson={lesson}
                                                isPremiumUser={isPremiumUser}
                                                onUpdateSuccess={(updatedLesson) => {
                                                    setLessons((prev) => prev.map((item) => item._id === updatedLesson._id ? updatedLesson : item));
                                                }}
                                            />

                                            {/* Dynamic Isolated Modal Target Trigger Instance */}
                                            <DeleteLessonAction
                                                lessonId={lesson._id}
                                                lessonTitle={lesson.title}
                                                onDeleteSuccess={handleOptimisticUIPurge}
                                            />

                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}