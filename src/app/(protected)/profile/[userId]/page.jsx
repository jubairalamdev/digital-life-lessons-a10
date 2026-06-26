import { serverFetch, serverFetchById } from '@/lib/actions/common';
import React from 'react';
import LessonCard from '@/components/common/LessonCard';

const ProfilePage = async ({params}) => {
    const {userId} = await params;

    // 2. Fetch the detailed MongoDB user document using serverFetchById
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
    const databaseUser = await serverFetchById(`/api/users`, userId);
    console.log(databaseUser)

    // 3. Fetch all public lessons authored by this specific user
    const rawLessons = await serverFetch(`${baseUrl}/api/my/lessons/${userId}`);
    
    // Ensure data handles fallbacks safely and matches latest-first order
    const userLessons = Array.isArray(rawLessons) 
        ? rawLessons.map(lesson => ({ ...lesson, creator: databaseUser })).reverse()
        : [];

    const isPremium = databaseUser?.plan?.toLowerCase() === 'premium';

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 select-none py-10">
            
            {/* PROFILE MANAGEMENT CONTAINER CARDFRAME */}
            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                {/* Background Accent Mesh */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                    
                    {/* User Identity Info Layout */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full md:w-auto">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={databaseUser?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
                            alt={databaseUser?.name || "User Avatar"} 
                            className="w-24 h-24 rounded-2xl object-cover border-2 border-zinc-800"
                        />
                        <div className="flex flex-col text-center sm:text-left space-y-2 mt-1">
                            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                                    {databaseUser?.name || "Community Member"}
                                </h2>
                                {isPremium && (
                                    <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                        Premium ⭐
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-500 text-sm font-mono">{databaseUser?.email}</p>
                            
                            {/* Counter Metrics Block */}
                            <div className="flex items-center gap-4 mt-2 text-xs font-medium text-zinc-400">
                                <span className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800/60">
                                    ✍️ {userLessons.length} Lessons Shared
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* DYNAMIC SUBSECTION: USER WRITTEN INSIGHTS */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        Your Public Insights
                    </h3>
                    <p className="text-zinc-500 text-xs font-light mt-0.5">
                        Displaying all wisdom cards currently exposed to public tracks.
                    </p>
                </div>

                {userLessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userLessons.map((lesson) => (
                            <LessonCard 
                                key={lesson._id} 
                                lesson={lesson} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center py-16 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">
                        <p className="text-zinc-500 text-sm font-light">
                            You haven&apos;t generated or populated any public lessons yet.
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProfilePage;