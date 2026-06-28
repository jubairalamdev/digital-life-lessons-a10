"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Skeleton } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";
import { logOutUser } from "@/lib/actions/authentication";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const role = user?.role || "user";
  const isAdmin = role === "admin";

  const dashboardBase = isAdmin ? "/dashboard/admin" : "/dashboard";

  const routes = {
    profile: `${dashboardBase}/profile`,
    dashboard: dashboardBase,
    addLesson: `${dashboardBase}/addLessons`,
    myLessons: `${dashboardBase}/myLessons`,
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
      setIsMenuOpen(false);
      setIsProfileOpen(false);
      window.location.href = "/auth/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full sticky top-0 py-3 z-50 border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="container mx-auto flex h-16 max-w-300 items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
          </button>

          <Link href="/" className="font-bold flex items-center text-lg gap-2">
            <Image src="/images/logo-small.png" alt="logo" width={40} height={50} />
            <div className="flex flex-col">
              <div className="text-xl">
                DIGITAL <span className="text-green-400">LIFE</span>
              </div>
              <div className="-mt-2 tracking-[0.45rem] text-gray-300">
                LESSONS
              </div>
            </div>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href={routes.addLesson}>Add Lesson</Link></li>
          <li><Link href={routes.myLessons}>My Lessons</Link></li>
          <li><Link href="/allLessons">Public Lessons</Link></li>
          <li><Link href="/pricing">Pricing / Upgrade</Link></li>
        </ul>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                  <Image
                    src={user.image || "/images/logo-small.png"}
                    alt="avatar"
                    width={50}
                    height={50}
                    className=""
                  />
                </div>
                <p>Welcome, {user?.name?.split(" ")[0]}</p>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-400">
                    {user.name}
                  </div>

                  <Link
                    href={routes.profile}
                    className="block px-4 py-2 hover:bg-zinc-800"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    href={routes.dashboard}
                    className="block px-4 py-2 hover:bg-zinc-800"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">
                <Button color="primary">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* MOBILE */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">

            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>

            <li><Link href={routes.addLesson} onClick={() => setIsMenuOpen(false)}>Add Lesson</Link></li>

            <li><Link href={routes.myLessons} onClick={() => setIsMenuOpen(false)}>My Lessons</Link></li>

            <li><Link href="/allLessons" onClick={() => setIsMenuOpen(false)}>Public Lessons</Link></li>

            <li><Link href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing / Upgrade</Link></li>

            <li className="mt-4 border-t pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={user.image || "/images/logo-small.png"}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{user.name}</span>
                  </div>

                  <Link href={routes.profile} onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>

                  <Link href={routes.dashboard} onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">Login</Link>
                  <Link href="/auth/register">Sign Up</Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}