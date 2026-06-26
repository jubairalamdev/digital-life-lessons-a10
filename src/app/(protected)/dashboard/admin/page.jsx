import { getUserById, getAllLessons, serverFetch } from "@/lib/actions/common";
import AdminDashboardContent from "@/components/dashboard/admin/home/AdminDashboardContent";

export const metadata = {
  title: "Admin Dashboard | Digital Life Lessons"
};

export default async function AdminDashboardPage() {
  // 1. Fetch users, lessons, and raw contributor IDs concurrently
  const [usersData, allLessons, contributionsData] = await Promise.all([
    serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`),
    getAllLessons(),
    serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/top_contributors`),
  ]);

  const users = usersData || [];
  const lessons = allLessons || [];

  // 2. Calculate Metrics
  const totalUsers = users.length;
  const totalPublicLessons = lessons.filter((lesson) => lesson.visibility === "Public").length;

  const today = new Date();
  const todaysNewLessons = lessons.filter((lesson) => {
    if (!lesson.createdAt) return false;
    const lessonDate = new Date(lesson.createdAt);
    return lessonDate.getFullYear() === today.getFullYear() &&
      lessonDate.getMonth() === today.getMonth() &&
      lessonDate.getDate() === today.getDate();
  }).length;

  // 3. Resolve internal profile fetches for contributors
  let topContributors = [];
  if (Array.isArray(contributionsData)) {
    topContributors = await Promise.all(
      contributionsData.map(async (contributor) => {
        try {
          const targetId = contributor._id; // Your aggregation uses _id
          const userProfile = await getUserById(targetId);

          return {
            _id: targetId, // Keep _id for the React key
            name: userProfile?.name || "Anonymous User",
            image: userProfile?.image,
            lessonCount: contributor.totalLessons || 0 // Match the key expected in the UI
          };
        } catch (err) {
          return {
            _id: contributor._id,
            name: "Unresolved Profile",
            image: null,
            lessonCount: contributor.totalLessons || 0
          };
        }
      })
    );
  }

  return (
    <AdminDashboardContent
      users={users}
      lessons={lessons}
      totalUsers={totalUsers}
      totalPublicLessons={totalPublicLessons}
      todaysNewLessons={todaysNewLessons}
      topContributors={topContributors} // Now passes the array with names, images, and lessonCount
    />
  );
}