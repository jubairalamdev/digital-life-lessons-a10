import DashboardSidebar from "@/components/dashboard/Sidebar";

const dashboardLayout = ({children}) => {
    return (
        <div className="max-w-310 mx-auto md:flex gap-6">
            <DashboardSidebar />
            <div className="py-6">

            {children}
            </div>
        </div>
    );
};

export default dashboardLayout;