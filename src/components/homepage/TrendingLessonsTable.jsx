"use client";

import React from 'react';
import { Table } from '@heroui/react';
import { TrendingRow } from './TrendingRow';

export default function TrendingLessonsTable({ topSavedCounters, baseUrl }) {
    return (
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <Table aria-label="Most Saved Trend Items" className="text-zinc-300">
                <Table.ScrollContainer>
                    <Table.Content className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader className="bg-zinc-900 text-zinc-400 font-bold">Lesson Name</Table.Column>
                            <Table.Column className="bg-zinc-900 text-zinc-400 font-bold">System Tone</Table.Column>
                            <Table.Column className="bg-zinc-900 text-zinc-400 font-bold text-right">Count Favorites</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {topSavedCounters.length > 0 ? (
                                topSavedCounters.map((stat, index) => (
                                    <TrendingRow 
                                        key={stat.lessonId || index} 
                                        stat={stat} 
                                        baseUrl={baseUrl} 
                                    />
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell className="text-center text-zinc-500 py-6" colSpan={3}>
                                        No life-lessons compiled into aggregate bookmark queues.
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}