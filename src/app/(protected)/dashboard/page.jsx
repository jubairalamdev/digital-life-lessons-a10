import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { serverFetchById } from "@/lib/actions/common";
import DashboardContent from "@/components/dashboard/home/DashboardContent";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <p className="text-zinc-500 text-lg">Please sign in to view your dashboard.</p>
            </div>
        );
    }

    const [lessons, favorites] = await Promise.all([
        serverFetchById("/api/my/allLessons", user.id, ["lessons"]),
        serverFetchById("/api/favorites", user.id, ["lessons"]),
    ]);

    if (user?.role === "user") {
        return (
            <DashboardContent
                lessons={lessons || []}
                favorites={favorites || []}
                userName={user.name || user.email}
            />
        );
    } else {
        redirect("/unauthorized")
    }
}