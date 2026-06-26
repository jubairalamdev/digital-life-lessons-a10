"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Skeleton } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";

// Imported session auth tools from your inspiration code
import { authClient } from "@/lib/auth-client";
import { logOutUser } from "@/lib/actions/authentication";
import { redirect } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dynamic user verification hook integration
  const { data: session, isPending } = authClient.useSession();
  // console.log("Current user: ", session)
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await logOutUser();
      setIsMenuOpen(false);
      setIsProfileOpen(false);
      redirect('/auth/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full sticky top-0 py-3 z-50 border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="container mx-auto flex h-16 max-w-300 items-center justify-between">
        {/* Left side: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <Xmark className="h-6 w-6" />
            ) : (
              <Bars className="h-6 w-6" />
            )}
          </button>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold flex items-center text-lg gap-2">
              <Image src="/images/logo-small.png" alt="logo-small" width={40} height={50} />
              <div className="flex flex-col">
                <div className="text-xl">
                  DIGITAL <span className="text-green-400">LIFE</span>
                </div>
                <div className="-mt-2 ">
                  <span className="font-medium tracking-[0.45rem] text-gray-300 ">
                    LESSONS
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/addLessons">Add Lesson</Link>
          </li>
          <li>
            <Link href="/dashboard/myLessons">My Lessons</Link>
          </li>
          <li>
            <Link href="/allLessons">Public Lessons</Link>
          </li>
          <li>
            <Link href="/pricing">Pricing / Upgrade</Link>
          </li>
        </ul>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24 rounded-lg" />
              </div>
            </div>
          ) : user ? (
            /* --- Logged In Dropdown Menu Structure --- */
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                  <Image
                    src={user.image || "/images/logo-small.png"}
                    alt={user.name || "User Avatar"}
                    fill
                    className="object-cover"
                  />
                </div>
                <p>Welcome, {user?.name?.split(' ')[0]}</p>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-2 z-50 text-sm text-zinc-200">
                  <div className="px-4 py-2 border-b border-zinc-800 font-medium text-xs text-zinc-400 truncate">
                    {user.name}
                  </div>
                  <Link
                    href="/dashboard/myProfile"
                    className="block px-4 py-2 hover:bg-zinc-800 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-zinc-800 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-800 transition-colors"
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
                <Button color="primary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/add-lesson" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                Add Lesson
              </Link>
            </li>
            <li>
              <Link href="/dashboard/my-lessons" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                My Lessons
              </Link>
            </li>
            <li>
              <Link href="/public-lessons" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                Public Lessons
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                Pricing / Upgrade
              </Link>
            </li>

            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 py-2 px-1">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={user.image || "/images/logo-small.png"}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-white text-sm">{user.name}</span>
                  </div>
                  <Link href="/dashboard/myProfile" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link href="/dashboard" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left py-2 text-red-400 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/register" className="w-full" color="primary" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}