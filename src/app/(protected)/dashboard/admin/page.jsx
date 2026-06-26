import { getUserById, getAllLessons, serverFetch, serverFetchById } from "@/lib/actions/common";
import AdminDashboardContent from "@/components/dashboard/admin/home/AdminDashboardContent";

export const metadata = {
  title: "Admin Dashboard | Digital Life Lessons"
};

export default async function AdminDashboardPage() {
  // 1. Fetch all necessary data using your backbone functions
  const [usersData, allLessons, topContributorsDetails] = await Promise.all([
    serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`),
    getAllLessons(),
    serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/top_contributors`),
  ]);

  // console.log("users Data ======>", usersData)
  // console.log("all lessons Data ======>", allLessons)

  const users = usersData || [];
  const lessons = allLessons || [];

  // 2. Calculate Metrics
  const totalUsers = users.length;

  const totalPublicLessons = lessons.filter(
    (lesson) => lesson.visibility === "Public"
  ).length;

  // FOR TESTING ONLY: Force the app to think today is July 25th, 2026
  const today = new Date();

  const todaysNewLessons = lessons.filter((lesson) => {
    if (!lesson.createdAt) return false;

    const lessonDate = new Date(lesson.createdAt);

    // Compare local year, month, and day
    return lessonDate.getFullYear() === today.getFullYear() &&
      lessonDate.getMonth() === today.getMonth() &&
      lessonDate.getDate() === today.getDate();
  }).length;

  console.log("today ============> ", today);
  console.log("lessons today ============> ", todaysNewLessons);

  let displayContributors = [];

  try {
    // 1. Fetch your aggregated raw contributor stats
    const contributionsData = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/lessons/top_contributors`);

    if (Array.isArray(contributionsData)) {
      // 2. Resolve internal profile fetches concurrently with Promise.all
      displayContributors = await Promise.all(
        contributionsData.map(async (contributor) => {
          try {
            // Adjust local fields to map your aggregation response (using _id or user_id)
            const targetId = contributor.user_id || contributor._id;
            const userProfile = await serverFetchById(
              `/api/users`,
              targetId
            );

            return {
              id: targetId,
              name: userProfile?.name || "Anonymous User",
              email: userProfile?.email || "N/A",
              role: userProfile?.role || "user",
              totalLessons: contributor.totalLessons || 0
            };
          } catch (err) {
            console.error("Error matching contributor profile:", err);
            return {
              id: contributor.user_id,
              name: "Unresolved Profile",
              email: "N/A",
              role: "user",
              totalLessons: contributor.totalLessons || 0
            };
          }
        })
      );
    }
  } catch (error) {
    console.error("Failed to load contributors:", error);
  }

  // In app/dashboard/admin/page.jsx
  return (
    <AdminDashboardContent
      users={users}               // <--- ADD THIS
      lessons={lessons}           // <--- ADD THIS
      totalUsers={totalUsers}
      totalPublicLessons={totalPublicLessons}
      todaysNewLessons={todaysNewLessons}
      topContributors={topContributorsDetails}
    />
  );
}