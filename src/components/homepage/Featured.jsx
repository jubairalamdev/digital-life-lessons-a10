import { serverFetch } from '@/lib/actions/common';
import React from 'react'
import LessonCard from '@/components/common/LessonCard';
import Link from 'next/link';
import { Button } from '@heroui/react';

const HomeFeatured = async () => {
  
    const featuredFreeItems = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/free`)
    const displayItems = featuredFreeItems?.slice(0,4) || [];

  return (
    <section className="w-full py-16 bg-zinc-950 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2  bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        
        {/* Uniform Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Featured <span className="text-green-400">Life Lessons</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-2 font-light">
            Handpicked wisdom and milestone personal growth insights from our global community.
          </p>
        </div>

        {/* 4-Column Grid Display Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.length > 0 ? (
          displayItems.map((lesson, idx) => (
            <LessonCard key={idx} lesson={lesson} />
          ))):(
            <p className="text-zinc-500 text-sm font-light col-span-full text-center">
              No featured lessons available at the moment. Please check back later.
            </p>
          )}
        </div>

      </div>
      <div className='flex justify-center mt-10'>
        <Link href="/allLessons">
          <Button 
            size="sm"
            className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 rounded-xl transition-all h-9 text-xs"
          >
            See All Lessons
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HomeFeatured;