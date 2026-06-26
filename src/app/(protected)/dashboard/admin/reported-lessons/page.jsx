import { serverFetch, serverFetchById } from "@/lib/actions/common";
import ReportedLessonsContent from "@/components/dashboard/admin/reported-lessons/ReportedLessonsContent";

export const metadata = {
    title: "Reported Lessons | Admin Dashboard"
};

export default async function ReportedLessonsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    // 1. Fetch aggregated report counts
    const reportsData = await serverFetch(`${baseUrl}/api/reports/aggregated`) || [];

    // 2. Map through counts to get actual Lesson Titles
    const detailedReports = await Promise.all(
        reportsData.map(async (report) => {
            const lesson = await serverFetchById('/api/lessons', report._id);
            return {
                lessonId: report._id,
                title: lesson?.title || "[Lesson Deleted]",
                reportCount: report.reportCount
            };
        })
    );

    return <ReportedLessonsContent initialReports={detailedReports} />;
}