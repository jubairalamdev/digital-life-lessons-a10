"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Swiper modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Dummy Data optimized for a Wisdom/Life Lessons platform
const BANNER_DATA = [
  {
    id: 1,
    title: "Preserve Your Wisdom",
    subtitle: "Your Journey Matters",
    description: "Don't let your unique life lessons fade away. Document your experiences, insights, and turning points to build an enduring legacy for future generations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600", // Dark cosmic/tech abstract
  },
  {
    id: 2,
    title: "Learn From the Collective",
    subtitle: "Avoid Common Pitfalls",
    description: "Dive into a vast reservoir of crowdsourced human experiences. Discover real stories and breakthrough moments shared by mentors worldwide.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600", // Dark networking/connection node
  },
  {
    id: 3,
    title: "Track Your Personal Growth",
    subtitle: "Reflect and Evolve",
    description: "Save your favorite insights, look back at your personal milestones, and map how your perspective shifts over time with our intuitive tracking tools.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600", // Dark atmospheric moody landscape
  },
];

export default function HeroBanner() {
  // Keep track of active slide index to re-trigger Motion.dev animations per slide change
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full relative bg-zinc-950 overflow-hidden select-none">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[600px] md:h-[550px] hero-swiper-custom"
      >
        {BANNER_DATA.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative flex items-center transition-transform duration-700 ease-out border border-b-gray-600"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            >
              {/* Overall dark tint overlay to unify the aesthetic */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

              {/* Layout Container pinned to the right */}
              <div className="absolute inset-0 flex items-center justify-end z-10 px-6 sm:px-12 md:px-20 lg:px-32">
                
                {/* Dark Mode Premium Radial Gradient:
                  Dense black core (rgba 0,0,0,0.95) tapering out to transparent 
                  at the 75% mark to blend cleanly into the background photo.
                */}
                <div className="flex flex-col justify-center items-start text-left max-w-xl h-full w-full px-8 md:px-16 bg-black/70 border-gray-600 border-l md:-mr-35">
                  
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        {/* Subtitle / Kicker */}
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
                        >
                          {slide.subtitle}
                        </motion.span>

                        {/* Main Title */}
                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none"
                        >
                          {slide.title}
                        </motion.h1>

                        {/* Description Body */}
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-md"
                        >
                          {slide.description}
                        </motion.p>

                        {/* Call to Action CTA */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className="pt-4 flex gap-4"
                        >
                          <button className="px-6 py-3 text-sm font-medium text-black bg-white hover:bg-zinc-200 transition-colors rounded-xl font-semibold shadow-xl shadow-white/5">
                            Explore Lessons
                          </button>
                          <button className="px-6 py-3 text-sm font-medium text-white bg-zinc-900/80 hover:bg-zinc-800 transition-colors rounded-xl font-semibold border border-zinc-800 backdrop-blur-md">
                            Share Your Story
                          </button>
                        </motion.div>
                        
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}