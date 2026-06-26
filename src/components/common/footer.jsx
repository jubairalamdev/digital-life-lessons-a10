"use client";

import React from "react";
import Link from "next/link"; // Replaced uikit with native Next.js Link
import Image from "next/image";   // For the logo image
import { Envelope, Handset, MapPin } from "@gravity-ui/icons"; // Swapped to Handset

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900/60 selection:bg-green-500/30">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

                {/* Brand Column with Your Custom Logo */}
                <div className="space-y-4 col-span-1 md:col-span-1">
                    <Link href="/" className="font-bold flex items-center text-lg gap-2">
                        <Image src="/images/logo-small.png" alt="logo-small" width={40} height={50} />
                        <div className="flex flex-col">
                            <div className="text-xl">

                                DIGITAL <span className="text-green-400">LIFE</span>
                            </div>
                            <div className="-mt-2 ">
                                <span className="font-medium tracking-[0.45rem] text-gray-300 ">

                                    LESSONS
                                </span>
                            </div>
                        </div>
                    </Link>
                    <p className="text-sm leading-relaxed font-light text-zinc-500 pt-2">
                        A premium crowdsourced archive built to preserve personal transformations, turning points, and collective life lessons.
                    </p>
                </div>

                {/* Quick Explore Links */}
                <div className="flex flex-col space-y-3">
                    <h4 className="text-sm font-semibold text-zinc-200 tracking-wider uppercase">Explore</h4>
                    <ul className="space-y-2 text-sm font-light">
                        <li>
                            <Link href="/allLessons" className="text-zinc-400 hover:text-green-400 transition-colors">
                                All Lessons
                            </Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="text-zinc-400 hover:text-green-400 transition-colors">
                                Premium Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard" className="text-zinc-400 hover:text-green-400 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info Column */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-zinc-200 tracking-wider uppercase">Get In Touch</h4>
                    <ul className="space-y-3 text-sm font-light">
                        <li className="flex items-center gap-2">
                            <Envelope className="text-zinc-500 w-4 h-4" />
                            <span className="hover:text-zinc-300 transition-colors">support@digitallifelessons.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Handset className="text-zinc-500 w-4 h-4" />
                            <span className="hover:text-zinc-300 transition-colors">+1 (555) 234-5678</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="text-zinc-500 w-4 h-4" />
                            <span className="text-zinc-500">San Francisco, CA</span>
                        </li>
                    </ul>
                </div>

                {/* Legal & Social Media Connections */}
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-zinc-200 tracking-wider uppercase">Legal & Social</h4>
                    <ul className="space-y-2 text-sm font-light">
                        <li>
                            <Link href="/terms" className="text-zinc-400 hover:text-green-400 transition-colors">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="text-zinc-400 hover:text-green-400 transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>

                    {/* Social Platform Links with Custom Brand SVGs */}
                    <div className="flex items-center gap-4 pt-2">
                        {/* New X Logo */}
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="X (formerly Twitter)"
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-green-400 hover:border-zinc-700 hover:bg-zinc-800 transition-all"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            {/* Under-Footer Copyright */}
            <div className="w-full bg-zinc-950/60 border-t border-zinc-900/40 py-6 text-center text-xs text-zinc-600">
                &copy; {currentYear} DIGITAL LIFE LESSONS. All rights reserved.
            </div>
        </footer>
    );
}