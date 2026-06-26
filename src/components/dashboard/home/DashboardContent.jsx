"use client";

import React from "react";
import { Button } from "@heroui/react";
import { BookOpen, Heart, PlusCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import MyLessonsTable from "./MyLessonsTable";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardContent({ lessons, favorites, userName }) {

    // Dynamic chart data calculated from the user's lessons
    const chartData = (() => {
        const counts = {};
        
        // 1. Group lessons by their UTC date string (YYYY-MM-DD)
        lessons.forEach(lesson => {
            if (lesson.createdAt) {
                const dateStr = new Date(lesson.createdAt).toISOString().split('T')[0];
                counts[dateStr] = (counts[dateStr] || 0) + 1;
            }
        });

        const days = [];
        const today = new Date();
        
        // 2. Generate the last 7 days dynamically using strict UTC
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setUTCDate(d.getUTCDate() - i);
            
            // Format label nicely (e.g., "Jun 20") for the X-axis
            const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
            
            // Format matching string to look up in our counts object
            const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
            
            days.push({
                day: label,
                Contributions: counts[dateStr] || 0
            });
        }

        return days;
    })();

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                    Welcome back, {userName}
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Track your custom contributions, favorites, and milestones.
                </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                            Lessons Created
                        </span>
                        <h2 className="text-4xl font-black text-white">{lessons.length}</h2>
                    </div>
                    <div className="bg-blue-500/10 text-blue-400 p-4 rounded-xl border border-blue-500/20">
                        <BookOpen size={24} />
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                            Saved Favorites
                        </span>
                        <h2 className="text-4xl font-black text-white">{favorites.length}</h2>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl border border-emerald-500/20">
                        <Heart size={24} />
                    </div>
                </div>
            </div>

            {/* Charts & Shortcuts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border border-zinc-900 bg-zinc-950 p-6 rounded-2xl shadow-xl">
                    <div className="w-full h-64 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                                <XAxis dataKey="day" stroke="#71717a" fontSize={11} tick={{ fill: '#71717a' }} />
                                <YAxis stroke="#71717a" fontSize={11} allowDecimals={false} tick={{ fill: '#71717a' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#09090b",
                                        borderColor: "#27272a",
                                        color: "#fff",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Contributions"
                                    stroke="#3b82f6"
                                    fillOpacity={0.1}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl shadow-xl flex flex-col gap-3 justify-center">
                    <Link href="/dashboard/addLessons">
                        <Button className="w-full justify-between bg-zinc-900 border border-zinc-800 text-white rounded-xl h-11">
                            <span className="flex items-center gap-2">
                                <PlusCircle size={16} className="text-blue-400" /> Create New Lesson
                            </span>
                            <ArrowUpRight size={14} />
                        </Button>
                    </Link>
                    <Link href="/dashboard/myLessons">
                        <Button className="w-full justify-between bg-zinc-900 border border-zinc-800 text-white rounded-xl h-11">
                            <span className="flex items-center gap-2">
                                <BookOpen size={16} className="text-amber-400" /> Manage Lessons
                            </span>
                            <ArrowUpRight size={14} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Recent Lessons Table */}
            <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-xl p-4">
                <div className="p-2 pb-4">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                        Recently Added Lessons
                    </h3>
                </div>
                <MyLessonsTable initialLessons={lessons} />
            </div>
        </div>
    );
}