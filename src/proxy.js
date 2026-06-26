import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Keep the 'proxy' name for your specific Next.js version
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
    matcher: [
        "/dashboard",           // Fixed: Added the missing leading slash here
        "/dashboard/:path*",    // Better wildcard pattern for subroutes
        "/lesson/:path*",
        "/payment-successful",
        "/pricing",
        "/profile/:path*"
    ],
};