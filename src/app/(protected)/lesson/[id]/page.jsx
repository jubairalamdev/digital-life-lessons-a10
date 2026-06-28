import { serverFetch, serverFetchById } from '@/lib/actions/common';
import React from 'react';
import Link from 'next/link';
import { Button, Input } from '@heroui/react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
    Heart,
    Bookmark,
    AlertTriangle,
    Share2,
    Clock,
    Calendar,
    Eye,
    MessageSquare,
    Send,
    Sparkles
} from 'lucide-react';
import CommentForm from '@/components/lessonDetails/CommentForm';
import CommentsSection from '@/components/lessonDetails/Comments';
import FavoriteButton from '@/components/lessonDetails/FavoriteButton';
import LikeButton from '@/components/lessonDetails/LikeButton';
import ReportButton from '@/components/lessonDetails/ReportButton';

const LessonDetailsPage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || !session.user) {
        return redirect('/login');
    }

    const user = session.user;
    const targetPlan = user?.plan || 'free';

    // 1. Fetch core lesson document data
    const lessonData = await serverFetchById(
        `/api/lessons`,
        id, ["lessons"]
    );

    if (!lessonData) {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
                <p className="text-zinc-500 text-sm font-light">The requested life lesson could not be resolved or found.</p>
                <Link href="/allLessons" className="mt-4">
                    <Button size="sm" className="bg-zinc-800 text-white border border-zinc-700 rounded-xl">
                        Back to Feed
                    </Button>
                </Link>
            </div>
        );
    }

    // 2. Fetch specific author identity metrics
    const targetId = lessonData.creatorId;
    const userProfile = await serverFetchById(
        `/api/users`,
        targetId, ["users"]
    );

    // 3. Evaluate conditional authorization locking constraints
    const dynamicLockGate = lessonData.accessLevel === 'Premium' && targetPlan.toLowerCase() !== 'premium';

    // Static random fallback calculations for engagement previews
    const displayViews = Math.floor(Math.random() * 8500) + 1200;
    const wordsPerMinute = 200;
    const calculatedReadTime = Math.ceil((lessonData.description?.split(/\s+/).length || 1) / wordsPerMinute);

    const toneColors = {
        Motivational: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        Realization: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        Gratitude: 'text-green-400 bg-green-500/10 border-green-500/20',
        Sad: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    };


    // 4. Fetch all public lessons authored by this specific user
    const rawLessons = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/lessons/${targetId}`, ["lessons"]);

    const commentsData = await serverFetchById(`/api/comments`, lessonData._id, ["comments"]);

    // Ensure comments defaults to an empty array if the response is null/undefined
    const comments = Array.isArray(commentsData) ? commentsData : [];

    return (
        <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 py-16 relative overflow-hidden">
            {/* Ambient Background Aesthetic Elements */}
            <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl px-4 relative z-10 space-y-8">

                {/* Return Nav Path Link */}
                <div>
                    <Link href="/allLessons" className="text-xs text-zinc-500 hover:text-green-400 transition-colors inline-flex items-center gap-2">
                        ← Back to all lessons
                    </Link>
                </div>

                {/* CORE SYSTEM CONTAINER BOX */}
                <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md shadow-2xl">

                    <article className={`p-6 md:p-12 space-y-8 ${dynamicLockGate ? 'blur-md select-none pointer-events-none' : ''}`}>

                        {/* 1. Categorization Track Header Component */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {lessonData.category}
                            </span>
                            <span className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md border ${toneColors[lessonData.emotionalTone] || 'text-zinc-400 border-zinc-800'}`}>
                                {lessonData.emotionalTone}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded ml-auto ${lessonData.accessLevel === 'Premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800/40 text-zinc-500'}`}>
                                {lessonData.accessLevel} Tier
                            </span>
                        </div>

                        {/* Title Block Layout */}
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                                {lessonData.title}
                            </h1>

                            {/* 2. Structured Metadata Cluster Row */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-1">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} className="text-zinc-600" />
                                    Published: {lessonData.createdAt ? new Date(lessonData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'June 2026'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={13} className="text-zinc-600" />
                                    {calculatedReadTime} min read time
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Eye size={13} className="text-zinc-600" />
                                    {displayViews.toLocaleString()} reads
                                </span>
                            </div>
                        </div>

                        {/* Optional Featured Graphics Window */}
                        {lessonData.featuredImage && (
                            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-zinc-800 relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={lessonData.featuredImage} alt="Cover preview" className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Story Transcription Output Frame */}
                        <div className="prose prose-invert max-w-none border-t border-zinc-900/80 pt-6">
                            <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed whitespace-pre-line tracking-wide">
                                {lessonData.description}
                            </p>
                        </div>

                        {/* 4. Stats Engagement Overview Tracking Grid Block */}
                        <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-900 font-mono text-xs text-zinc-400 text-center">
                            <div>
                                <span className="block text-lg font-bold text-zinc-200">{lessonData.likes.length || 0}</span>
                                <span className="text-zinc-600 text-[10px] uppercase tracking-wider">Likes Counter</span>
                            </div>
                            <div>
                                <span className="block text-lg font-bold text-zinc-200">{lessonData.favoritesCount || 14}</span>
                                <span className="text-zinc-600 text-[10px] uppercase tracking-wider">Bookmarked</span>
                            </div>
                            <div>
                                <span className="block text-lg font-bold text-zinc-200">{displayViews}</span>
                                <span className="text-zinc-600 text-[10px] uppercase tracking-wider">Traffic Impressions</span>
                            </div>
                        </div>

                        {/* 5. Functional Action Operation Row Container */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                            <div className="flex items-center gap-2">
                                <LikeButton user={user} lesson={lessonData} />

                                {/* Favorites button */}
                                <FavoriteButton lesson={lessonData} user={user}/>

                            </div>

                            <ReportButton user={user} lesson={lessonData} />
                        </div>
                    </article>

                    {/* DYNAMIC PROTECTION INLINE WALL BLOCK */}
                    {dynamicLockGate && (
                        <div className="absolute inset-0 z-20 bg-zinc-950/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center border border-zinc-800 rounded-3xl animate-in fade-in duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl mb-4 shadow-xl shadow-amber-500/5 text-amber-400 animate-pulse">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">Premium Membership Required</h3>
                            <p className="text-zinc-400 text-sm mt-2 max-w-sm font-light leading-relaxed">
                                This file contains deeper industry post-mortems locked down to premium tier parameters.
                            </p>
                            <Link href="/pricing" className="mt-6">
                                <Button className="bg-green-500 hover:bg-green-400 text-zinc-950 font-extrabold px-8 rounded-xl text-xs h-10 shadow-lg shadow-green-500/10 transition-all">
                                    Upgrade Plan Track ⭐
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* 3. AUTHOR / CREATOR BIO METRICS PROFILE CARD */}
                <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={userProfile?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                            alt={userProfile?.name || "Author"}
                            className="w-14 h-14 rounded-xl object-cover border border-zinc-800"
                        />
                        <div className="space-y-1">
                            <span className="text-xs text-zinc-500 font-medium block">Shared by Thinker:</span>
                            <h4 className="text-base font-bold text-white tracking-tight">{userProfile?.name || "Anonymous Member"}</h4>
                            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                                ✍️ {rawLessons.length} Lessons Published
                            </span>
                        </div>
                    </div>
                    <Link href={`/profile/${userProfile?._id || targetId}`}>
                        <Button size="sm" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs rounded-xl h-9">
                            View All by Author
                        </Button>
                    </Link>
                </div>

                {/* 6. RESPONSIVE THREADED COMMENTS SECTION MODULE */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
                        <MessageSquare size={18} className="text-green-400" />
                        <h3>Discussion Thread</h3>
                    </div>

                    {/* Input Entry Box form */}
                    <CommentForm user={user} lesson={lessonData} />

                    {/* Static placeholder array simulation outputting thread responses */}
                    <CommentsSection comments={comments} />
                </div>
            </div>
        </main>
    );
};

export default LessonDetailsPage;