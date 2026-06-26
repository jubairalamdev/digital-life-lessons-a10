import { serverFetch } from '@/lib/actions/common';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
// import LessonCard from '@/components/allLessons/LessonCard';
import AllLessonCard from '@/components/allLessons/AllLessonsCard';
export const dynamic = "force-dynamic";

const AllLessonsPage = async () => {

    const lessonsData = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/lessons`);
    return (
        <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 py-16 relative overflow-hidden">
            {/* Background Aesthetic Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-4 relative z-10">

                {/* Header Block */}
                <div className="mb-12 max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Browse Public <span className="text-green-400">Wisdom</span>
                    </h1>
                    <p className="text-zinc-400 text-base mt-3 font-light leading-relaxed">
                        Explore shared lifetracks, career shifts, and milestone realizations cataloged by thinkers around the globe.
                    </p>
                </div>

                {/* Display Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessonsData.length > 0 ? (
                        lessonsData.map((lesson) => (
                            <AllLessonCard key={lesson._id} lesson={lesson} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">
                            <p className="text-zinc-500 text-sm font-light">No lessons available on your plan parameters at the moment.</p>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
};

export default AllLessonsPage;