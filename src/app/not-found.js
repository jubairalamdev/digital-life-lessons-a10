"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col justify-center items-center px-4 relative selection:bg-green-500/30 overflow-hidden">
      
      {/* Decorative Radial Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center z-10 max-w-md mx-auto">
        
        {/* Massive Styled Error Code */}
        <div className="relative inline-block select-none animate-pulse">
          <h1 className="text-[12rem] font-black tracking-tighter text-zinc-900/40 border-zinc-800 leading-none">
            404
          </h1>
          <span className="absolute inset-0 flex items-center justify-center text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
            Oops!
          </span>
        </div>

        {/* Dynamic Typography Message */}
        <h2 className="text-2xl font-bold text-white mt-4 tracking-tight">
          This Lesson is <span className="text-green-400">Missing</span>
        </h2>
        
        <p className="text-zinc-500 text-sm mt-3 font-light leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" passHref className="w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-8 py-6 rounded-xl transition-all shadow-xl shadow-white/5"
            >
              Go Back Home
            </Button>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium px-8 py-3 h-12 rounded-xl transition-all text-sm"
          >
            Previous Page
          </button>
        </div>

      </div>

      {/* Subtle floating ambient elements for extra polish */}
      <div className="absolute bottom-10 left-10 text-xs text-zinc-700/30 select-none hidden md:block">
        [err_code: page_not_found]
      </div>
      <div className="absolute top-10 right-10 text-xs text-zinc-700/30 select-none hidden md:block">
        DIGITAL LIFE LESSONS
      </div>

    </div>
  );
}