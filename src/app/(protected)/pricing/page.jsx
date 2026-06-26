"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Check, X, Crown, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirectBack } from "@/lib/actions/authentication";

const comparisonFeatures = [
    { name: "Number of lessons you can create", free: "Up to 10", premium: "Unlimited" },
    { name: "Access to public Free lessons", free: true, premium: true },
    { name: "Access to Premium content from others", free: false, premium: true },
    { name: "Create Premium lessons", free: false, premium: true },
    { name: "Priority listing in public feeds", free: false, premium: true },
];

export default function PricingPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if(!user){
        redirectBack()
    }

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            {/* Header Section */}
            <div className="text-center pt-16 pb-12 px-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Unlock Your Full Potential
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Choose the plan that fits your journey. Upgrade anytime to preserve your wisdom without limits.
                </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Free Plan Card */}
                <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 flex flex-col shadow-xl h-full">
                    <div className="mb-6">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                            <Zap size={24} className="text-zinc-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
                        <p className="text-zinc-500 text-sm">Perfect for getting started with your personal reflections.</p>
                    </div>

                    <div className="mb-8">
                        <span className="text-5xl font-black">৳0</span>
                        <span className="text-zinc-500 ml-2">Forever</span>
                    </div>

                    <ul className="space-y-4 mb-10 flex-grow">
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-zinc-500 shrink-0" /> Create up to 10 life lessons
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-zinc-500 shrink-0" /> Browse all public free lessons
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-zinc-500 shrink-0" /> Save favorites & leave comments
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <X size={16} className="shrink-0" /> Access premium content
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <X size={16} className="shrink-0" /> Create premium lessons
                        </li>
                    </ul>

                    <Button
                        isDisabled
                        className="w-full h-12 bg-zinc-900 text-zinc-600 rounded-xl font-bold cursor-not-allowed border border-zinc-800"
                    >
                        Available to All Users
                    </Button>
                </div>

                {/* Premium Plan Card */}
                <div className="border border-blue-500/30 bg-zinc-950 rounded-3xl p-8 flex flex-col shadow-xl shadow-blue-500/5 relative h-full">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                        Recommended
                    </div>

                    <div className="mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                            <Crown size={24} className="text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
                        <p className="text-zinc-500 text-sm">For serious learners who want the complete experience.</p>
                    </div>

                    <div className="mb-8">
                        <span className="text-5xl font-black">৳1500</span>
                        <span className="text-zinc-500 ml-2">One-time payment</span>
                    </div>

                    <ul className="space-y-4 mb-10 flex-grow">
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-blue-400 shrink-0" /> Unlimited life lessons creation
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-blue-400 shrink-0" /> Browse all public free lessons
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-blue-400 shrink-0" /> Unlock premium content from others
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-blue-400 shrink-0" /> Create & monetize premium lessons
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-blue-400 shrink-0" /> Completely ad-free experience
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check size={16} className="text-blue-400 shrink-0" /> Priority listing & Verified badge
                        </li>
                    </ul>

                    {/* Leave onClick empty for now as requested */}
                    <form action="/api/checkout_sessions" method="POST">
                        <section>
                            {
                                user?.plan === 'premium' ?
                                    <Button
                                        type="submit"
                                        isDisabled
                                        role="link"
                                        className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors"
                                    >
                                        Already Premium User
                                    </Button> :
                                    <Button
                                        type="submit"
                                        role="link"
                                        className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors"
                                    >
                                        Get Premium!
                                    </Button>
                            }
                        </section>
                    </form>

                </div>

            </div>

            {/* Comparison Table Section */}
            <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-8">Compare Features</h3>
                <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950 shadow-xl">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-900/50">
                                <th className="text-left p-4 font-semibold text-zinc-400">Features</th>
                                <th className="text-center p-4 font-semibold text-zinc-400">Free</th>
                                <th className="text-center p-4 font-semibold text-blue-400">Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonFeatures.map((feature, index) => (
                                <tr key={index} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-900/30 transition-colors">
                                    <td className="p-4 text-zinc-300 font-medium">{feature.name}</td>

                                    <td className="p-4 text-center">
                                        {typeof feature.free === 'boolean' ? (
                                            feature.free ?
                                                <Check size={18} className="text-zinc-500 mx-auto" /> :
                                                <X size={18} className="text-red-500/50 mx-auto" />
                                        ) : (
                                            <span className="text-zinc-400">{feature.free}</span>
                                        )}
                                    </td>

                                    <td className="p-4 text-center">
                                        {typeof feature.premium === 'boolean' ? (
                                            feature.premium ?
                                                <Check size={18} className="text-blue-400 mx-auto" /> :
                                                <X size={18} className="text-red-500/50 mx-auto" />
                                        ) : (
                                            <span className="text-white font-semibold">{feature.premium}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}