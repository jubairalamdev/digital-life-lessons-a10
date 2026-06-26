"use client";

import React from "react";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Image from "next/image";

export default function AdminDashboardContent({
    users,
    lessons,
    totalUsers,
    totalPublicLessons,
    todaysNewLessons,
    topContributors,
}) {

    // Reusable function to process any array by createdAt for the last 7 days
    const getWeeklyData = (dataArr, metricKey) => {
        const counts = {};

        // 1. Group items by UTC date string
        (dataArr || []).forEach(item => {
            if (item.createdAt) {
                const dateStr = new Date(item.createdAt).toISOString().split('T')[0];
                counts[dateStr] = (counts[dateStr] || 0) + 1;
            }
        });

        const days = [];
        const today = new Date();

        // 2. Generate the last 7 days dynamically
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setUTCDate(d.getUTCDate() - i);

            const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
            const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;

            days.push({
                day: label,
                [metricKey]: counts[dateStr] || 0
            });
        }

        return days;
    };

    // Generate dynamic data for both charts
    const userGrowthData = getWeeklyData(users, "Users");
    const lessonGrowthData = getWeeklyData(lessons, "Lessons");

    console.log("Contributors just before showing in UI ======> ",topContributors)

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Admin Overview</h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Platform-wide analytics and system health.
                </p>
            </div>

            {/* Metrics Row - 4 Columns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Users</span>
                        <h2 className="text-4xl font-black text-white">{totalUsers}</h2>
                    </div>
                    <div className="bg-blue-500/10 text-blue-400 p-4 rounded-xl border border-blue-500/20">
                        <Users size={24} />
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Public Lessons</span>
                        <h2 className="text-4xl font-black text-white">{totalPublicLessons}</h2>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl border border-emerald-500/20">
                        <BookOpen size={24} />
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Today&apos;s New</span>
                        <h2 className="text-4xl font-black text-white">{todaysNewLessons}</h2>
                    </div>
                    <div className="bg-purple-500/10 text-purple-400 p-4 rounded-xl border border-purple-500/20">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Top Creators</span>
                        <h2 className="text-4xl font-black text-white">{topContributors.length}</h2>
                    </div>
                    <div className="bg-amber-500/10 text-amber-400 p-4 rounded-xl border border-amber-500/20">
                        <Award size={24} />
                    </div>
                </div>
            </div>

            {/* Charts & Top Contributors Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">User Growth</h3>
                    <div className="w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                                <XAxis dataKey="day" stroke="#71717a" fontSize={11} tick={{ fill: '#71717a' }} />
                                <YAxis stroke="#71717a" fontSize={11} allowDecimals={false} tick={{ fill: '#71717a' }} />
                                <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", color: "#fff" }} />
                                <Area type="monotone" dataKey="Users" stroke="#3b82f6" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lesson Growth Chart */}
                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Lesson Growth</h3>
                    <div className="w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lessonGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                                <XAxis dataKey="day" stroke="#71717a" fontSize={11} tick={{ fill: '#71717a' }} />
                                <YAxis stroke="#71717a" fontSize={11} allowDecimals={false} tick={{ fill: '#71717a' }} />
                                <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", color: "#fff" }} />
                                <Area type="monotone" dataKey="Lessons" stroke="#10b981" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Most Active Contributors List */}
                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl shadow-xl flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Most Active Contributors</h3>
                    <div className="grow space-y-3 overflow-y-auto max-h-48 pr-1">
                        {topContributors.length === 0 ? (
                            <p className="text-zinc-600 text-sm text-center py-4">No data yet</p>
                        ) : (
                            topContributors.map((user, index) => (
                                <div key={user._id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="text-zinc-600 text-xs font-mono w-4">{index + 1}.</span>
                                        {user.image ? (
                                            <Image height={100} width={100} src={user.image} className="w-7 h-7 rounded-full object-cover border border-zinc-800" alt="" />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                                                {user.name?.charAt(0)}
                                            </div>
                                        )}
                                        <span className="text-sm text-zinc-300 truncate">{user.name}</span>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-500 shrink-0">{user.lessonCount} lessons</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}