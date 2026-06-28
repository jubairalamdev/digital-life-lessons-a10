import React from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { serverFetchById } from '@/lib/actions/common';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';

export default async function AllLessonCard({ lesson }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;
  const targetPlan = user?.plan || 'free';

  const targetId = lesson?.creatorId;
  const authorData = await serverFetchById(
    `/api/users`,
    targetId, ["users"]
  );

  const toneColors = {
    Motivational: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    Realization: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Gratitude: 'text-green-400 bg-green-500/10 border-green-500/20',
    Sad: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };


  // console.log("Likes count ===========>",lesson.likes.length)
  // console.log("Likes array ==========>",lesson.likes)

  return (
    <>
      {
        targetPlan === "free" && lesson.accessLevel === "Free" && targetPlan === "premium" ? (
          <div className="group bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl min-h-80">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                  {lesson.category}
                </span>
                <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${toneColors[lesson.emotionalTone] || 'text-zinc-400 border-zinc-800'}`}>
                  {lesson.emotionalTone}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-auto ${lesson.accessLevel === 'Premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800/40 text-zinc-500'}`}>
                  {lesson.accessLevel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-green-400 transition-colors duration-200">
                {lesson.title}
              </h3>

              {/* Description Preview */}
              <p className="text-zinc-400 text-sm mt-2.5 font-light leading-relaxed line-clamp-3">
                {lesson.description}
              </p>
            </div>

            {/* Card Footer */}
            <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={authorData?.image}
                    alt={authorData?.name}
                    className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-200 max-w-[140px] truncate">{authorData?.name || "Community Member"}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'June 2026'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-zinc-500 font-medium">
                  ❤️ {lesson.likes.length || 0}
                </div>
              </div>

              {/* See Details Route Link */}
              <Link href={`/lesson/${lesson._id}`} passHref className="w-full">
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl border border-zinc-700/50 transition-all h-10 text-xs">
                  See Details
                </Button>
              </Link>
            </div>
          </div>
        ) : targetPlan === "free" && lesson.accessLevel === "Premium" ? (
          <>
            {/* Parent wrapper hosting the layout card */}
            <div className="relative overflow-hidden rounded-2xl group">

              {/* MAIN CARD CONTENTS */}
              <div className="bg-zinc-900/30 border border-zinc-800 p-6 flex flex-col justify-between shadow-xl min-h-80">
                <div>
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                      
                    </span>
                    <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${toneColors[lesson.emotionalTone] || 'text-zinc-400 border-zinc-800'}`}>
                      
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded ml-auto bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {lesson.accessLevel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1">
                    
                  </h3>

                  {/* Description Preview */}
                  <p className="text-zinc-400 text-sm mt-2.5 font-light leading-relaxed line-clamp-3">
                    
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={authorData?.image}
                        alt={authorData?.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-zinc-200 max-w-35 truncate">{authorData?.name || "Community Member"}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'June 2026'}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 font-medium">
                      ❤️ {lesson.likes.length || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* THE BLUR OVERLAY (Positioned absolutely over the content) */}
              <div className="absolute inset-0 z-10 backdrop-blur-3xl bg-zinc-950/85 flex flex-col items-center justify-center p-6 text-center border border-zinc-800 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl mb-3">
                  🔒
                </div>
                <h4 className="text-white font-bold  tracking-tight">Premium Insight</h4>
                <p className="text-zinc-500 text-sm mt-1 font-light max-w-65">
                  Upgrade your plan parameters to unlock this community wisdom.
                </p>
                <Link href="/pricing" passHref className="w-fit mt-3">
                <Button className="w-full bg-white hover:bg-gray-200 text-zinc-900 font-medium rounded-xl border border-zinc-700/50 transition-all h-10 text-xs">
                  Upgrade to Premium
                </Button>
              </Link>
              </div>

            </div>
          </>
        ) : (
          <div className="group bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl min-h-80">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                  {lesson.category}
                </span>
                <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${toneColors[lesson.emotionalTone] || 'text-zinc-400 border-zinc-800'}`}>
                  {lesson.emotionalTone}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-auto ${lesson.accessLevel === 'Premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800/40 text-zinc-500'}`}>
                  {lesson.accessLevel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-green-400 transition-colors duration-200">
                {lesson.title}
              </h3>

              {/* Description Preview */}
              <p className="text-zinc-400 text-sm mt-2.5 font-light leading-relaxed line-clamp-3">
                {lesson.description}
              </p>
            </div>

            {/* Card Footer */}
            <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={authorData?.image}
                    alt={authorData?.name}
                    className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-200 max-w-[140px] truncate">{authorData?.name || "Community Member"}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'June 2026'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-zinc-500 font-medium">
                  ❤️ {lesson.likes.length || 0}
                </div>
              </div>

              {/* See Details Route Link */}
              <Link href={`/lesson/${lesson._id}`} passHref className="w-full">
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl border border-zinc-700/50 transition-all h-10 text-xs">
                  See Details
                </Button>
              </Link>
            </div>
          </div>
        ) 
      }
    </>
  );
}