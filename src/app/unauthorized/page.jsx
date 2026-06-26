import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldOff, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Unauthorized Access | Digital Life Lessons"
};

export default function UnauthorizedPage() {
    return (
        <main className="w-full min-h-screen bg-black text-zinc-100 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient Background Aesthetic Elements */}
            <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-lg w-full text-center space-y-6">
                {/* Icon Container */}
                <div className="flex justify-center">
                    <div className="bg-red-500/10 p-5 rounded-2xl border border-red-500/20 shadow-xl shadow-red-500/5">
                        <ShieldOff className="w-16 h-16 text-red-400" />
                    </div>
                </div>

                {/* Error Code */}
                <div>
                    <h1 className="text-7xl md:text-8xl font-black text-zinc-800 tracking-tighter leading-none">
                        401
                    </h1>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Access Denied
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                        You do not have the required permissions to view this page. Please log in with an authorized account or return to the safety of the homepage.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl h-11 font-semibold text-sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto">
                        <Button className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl h-11 font-bold text-sm shadow-lg shadow-red-600/10 transition-all">
                            Go to Login
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}