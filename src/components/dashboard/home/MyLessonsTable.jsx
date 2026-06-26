"use client";

import React from "react";
import { Table } from "@heroui/react";
import LessonRow from "./LessonRow";

export default function MyLessonsTable({ initialLessons = [] }) {
    const sortedRecentLessons = [...initialLessons]
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 3);

    return (
        <Table aria-label="Recent content listings" shadow="none" className="bg-transparent">
            <Table.ScrollContainer>
                <Table.Content aria-label="Recent content listings content data container">
                    <Table.Header>
                        <Table.Column
                            isRowHeader
                            textValue="Lesson Info"
                            className="text-zinc-500 font-bold text-xs uppercase tracking-wider"
                        >
                            Lesson Information
                        </Table.Column>
                        <Table.Column
                            textValue="Category"
                            className="text-zinc-500 font-bold text-xs uppercase tracking-wider"
                        >
                            Category
                        </Table.Column>
                        <Table.Column
                            textValue="Visibility"
                            className="text-zinc-500 font-bold text-xs uppercase tracking-wider"
                        >
                            Visibility
                        </Table.Column>
                        <Table.Column
                            textValue="Created Date"
                            className="text-zinc-500 font-bold text-xs uppercase tracking-wider text-right"
                        >
                            Created Date
                        </Table.Column>
                    </Table.Header>

                    <Table.Body emptyContent="No items found under your account.">
                        {sortedRecentLessons.map((lesson) => (
                            <LessonRow key={lesson._id} lesson={lesson} />
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}