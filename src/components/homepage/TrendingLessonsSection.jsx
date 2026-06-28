import React from 'react';
import { Table } from '@heroui/react';
import { TrendingRow } from './TrendingRow';

export async function TrendingLessonsSection() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
    
    let topSavedCounters = [];
    try {
        const res = await fetch(`${baseUrl}/api/favorites/most-saved`);
        if (res.ok) {
            topSavedCounters = await res.json();
        }
    } catch (err) {
        console.error("Failed fetching trending aggregation metrics:", err);
    }

    return (
        <section className="w-full py-16 bg-zinc-950 border-zinc-900 relative">
            <div className="container mx-auto max-w-7xl px-4">
                
                {/* Section Heading matching your exact template style */}
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        <span className="text-emerald-400">Most saved lessons</span> till now
                    </h2>
                    <p className="text-zinc-500 text-sm mt-2 font-light">
                        Recognizing the core value concepts most favorited and preserved by the community.
                    </p>
                </div>

                {/* HeroUI Grid Table Wrapper with perfect matching styling specs */}
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

            </div>
        </section>
    );
}