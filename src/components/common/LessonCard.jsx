import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

export default function LessonCard({ lesson }) {
  const {
    title,
    description,
    category,
    emotionalTone,
    accessLevel,
  } = lesson;

  // Determine emotional tone color accents
  const toneColors = {
    Motivational: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    Realization: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Gratitude: 'text-green-400 bg-green-500/10 border-green-500/20',
    Sad: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };

  const selectedToneStyle = toneColors[emotionalTone] || 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';

  return (
    <div className="relative group bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg h-[280px]">
      
      {/* Top Section: Badges & Title */}
      <div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300">
            {category}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${selectedToneStyle}`}>
            {emotionalTone}
          </span>
          {accessLevel === 'Premium' && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 ml-auto animate-pulse">
              ⭐ Premium
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-zinc-400 text-sm mt-2 font-light leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bottom Section: Stats & Action */}
      <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
        <div className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
          <span className="text-red-500/80">❤️</span> {lesson.likes.length || 0} Likes
        </div>

        <Link href={`/lesson/${lesson._id}`} passHref>
          <Button 
            size="sm"
            className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-4 rounded-xl transition-all h-9 text-xs"
          >
            See Details
          </Button>
        </Link>
      </div>
    </div>
  );
}