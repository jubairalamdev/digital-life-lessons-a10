import { serverFetch, getAllLessons } from "@/lib/actions/common";
import ManageUsersContent from "@/components/dashboard/admin/manage-users/ManageUsersContent";
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Manage Users | Admin Dashboard"
};

export default async function ManageUsersPage() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    const [usersRes, allLessons] = await Promise.all([
        fetch(`${baseUrl}/api/users`).then(res => res.ok ? res.json() : []),
        getAllLessons()
    ]);

    const users = Array.isArray(usersRes) ? usersRes : [];
    const lessons = Array.isArray(allLessons) ? allLessons : [];

    // Calculate total lessons for each user
    const lessonCounts = {};
    lessons.forEach(lesson => {
        if (lesson.creatorId) {
            lessonCounts[lesson.creatorId] = (lessonCounts[lesson.creatorId] || 0) + 1;
        }
    });

    // Attach lesson count to user object
    const usersWithCounts = users.map(user => ({
        ...user,
        totalLessons: lessonCounts[user._id] || 0
    }));

    return <ManageUsersContent initialUsers={usersWithCounts} />;
}