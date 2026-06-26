import { serverFetch } from "@/lib/actions/common";
import ManageLessonsContent from "@/components/dashboard/admin/manage-lessons/ManageLessonsContent";
export const dynamic = "force-dynamic"; 

export const metadata = {
    title: "Manage Lessons | Admin Dashboard"
};

export default async function ManageLessonsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    const [lessonsRes, usersRes] = await Promise.all([
        fetch(`${baseUrl}/api/lessons`).then(res => res.ok ? res.json() : []),
        fetch(`${baseUrl}/api/users`).then(res => res.ok ? res.json() : [])
    ]);

    const lessons = Array.isArray(lessonsRes) ? lessonsRes : [];
    const users = Array.isArray(usersRes) ? usersRes : [];

    // Create a map for quick creator name lookup
    const userMap = {};
    users.forEach(u => { userMap[u._id] = u.name || "Unknown User"; });

    // Attach creator name to lesson
    const lessonsWithCreators = lessons.map(lesson => ({
        ...lesson,
        creatorName: userMap[lesson.creatorId] || "Unknown User"
    }));

    // Calculate Stats
    const publicCount = lessons.filter(l => l.visibility === "Public").length;
    const privateCount = lessons.filter(l => l.visibility === "Private").length;

    return (
        <ManageLessonsContent 
            initialLessons={lessonsWithCreators} 
            publicCount={publicCount} 
            privateCount={privateCount} 
        />
    );
}