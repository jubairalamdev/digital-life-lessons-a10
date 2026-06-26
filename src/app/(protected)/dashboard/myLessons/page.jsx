import React from "react";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/lib/auth"; // Adjusted standard path mapping to match your structure
import { serverFetchById } from "@/lib/actions/common";
import MyLessonsTable from "@/components/dashboard/myLessons/MyLessonsTable";
import { Sparkles } from "lucide-react";

export default async function MyLessonsPage() {
    // 1. Authenticate user session using server context engine
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || !session.user) {
        return redirect('/login');
    }
    if (session?.user?.role === "user") {

        const userId = session.user.id;
        const targetPlan = session.user.plan?.toLowerCase() || 'free';
        const isPremiumUser = targetPlan === 'premium' || targetPlan === 'pro';

        // 2. Fetch data via standard server-side helper
        let lessons = [];
        try {
            // console.log("/api/my/allLessons", userId)
            lessons = await serverFetchById(`/api/my/allLessons`, userId);
            console.log(lessons);
        } catch (error) {
            console.error("Failed to fetch user lessons pipeline:", error);
        }
        return (
            <section className="w-full border-zinc-900 relative">
                <div className="container mx-auto max-w-6xl">

                    {/* Section Header Consistent with Top Contributors / Wisdom blocks */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            <Sparkles className="text-green-400 fill-green-400/10" size={26} />
                            My Archived <span className="text-green-400">Lessons</span>
                        </h2>
                        <p className="text-zinc-500 text-sm mt-2 font-light">
                            Manage, review performance, configure access controls, or refine your recorded life insights.
                        </p>
                    </div>

                    {/* Main Interactive Interactive Data Grid Core */}
                    <MyLessonsTable
                        initialLessons={lessons}
                        isPremiumUser={isPremiumUser}
                    />

                </div>
            </section>
        );
    } else {
        RedirectType("/unauthorized")
    }
}