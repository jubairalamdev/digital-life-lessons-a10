"use client";

import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "🧠",
    title: "Preserve Personal Wisdom",
    description: "Valuable insights fade over time. Documenting your milestones ensures that the clarity and lessons you fought hard to learn are kept safe forever."
  },
  {
    icon: "🌱",
    title: "Encourage Mindful Reflection",
    description: "Slowing down to transform a daily event into a structured life lesson helps cultivate true emotional intelligence and continuous personal growth."
  },
  {
    icon: "🌍",
    title: "Grow Through Community",
    description: "Wisdom shouldn't live in a silo. By exploring public shared viewpoints, you fast-track your own path by understanding mistakes others have made."
  },
  {
    icon: "🎯",
    title: "Build a Mental Compass",
    description: "Organize your values by category and emotional tone. Create a structured library of your own truth to look back on when facing complex choices."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function WhyLifeLessons() {
  return (
    <section className="w-full py-16 bg-zinc-950  border-zinc-900 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        
        {/* Consistent Layout Heading */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Why Learning From <span className="text-green-400">Life Matters</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-2 font-light max-w-xl">
            A structured framework designed to preserve milestone perspectives and build an evolving foundation of wisdom.
          </p>
        </div>

        {/* 4-Column Grid for Benefit Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl flex flex-col justify-start transition-all duration-300 shadow-md h-[240px] select-none"
            >
              {/* Icon Container */}
              <div className="text-2xl mb-4 bg-zinc-800/50 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-700/50 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-green-400 transition-colors">
                {benefit.title}
              </h3>

              {/* Paragraph Description */}
              <p className="text-zinc-400 text-sm mt-2 font-light leading-relaxed line-clamp-4">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}