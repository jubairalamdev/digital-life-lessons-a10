import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    if (user?.role === "admin") {

        return (
            <>
                {children}
            </>
        );
    } else {
        redirect("/unauthorized")
    }
};

export default AdminLayout;