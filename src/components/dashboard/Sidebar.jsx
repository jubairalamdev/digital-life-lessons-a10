"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { Button } from '@heroui/react';
import { 
  LayoutGrid, 
  PlusCircle, 
  FolderHeart, 
  Heart, 
  User2, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react';
import { logOutUser } from '@/lib/actions/authentication';
import { authClient } from '@/lib/auth-client';
import { Books } from '@gravity-ui/icons';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const adminItems = [
    { title: 'Admin Dashboard', route: '/dashboard/admin', icon: LayoutGrid },
    { title: 'Manage Users', route: '/dashboard/admin/manage-users', icon: Users },
    { title: 'Manage Lessons', route: '/dashboard/admin/manage-lessons', icon: Books },
    { title: 'Admin Profile', route: '/dashboard/admin/profile', icon: User2 },
  ];

  const userItems = [
    { title: 'Dashboard Home', route: '/dashboard', icon: LayoutGrid },
    { title: 'Add Lesson', route: '/dashboard/addLessons', icon: PlusCircle },
    { title: 'My Lessons', route: '/dashboard/myLessons', icon: FolderHeart },
    { title: 'My Favorites', route: '/dashboard/favorites', icon: Heart },
    { title: 'Profile', route: '/dashboard/myProfile', icon: User2 },
  ];

  const toneColors = {
    active: 'bg-zinc-900 text-white font-semibold',
    inactive: 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
  };

  return (
    <div className="w-full md:w-64 bg-zinc-950 border-b h-fit sticky top-24 md:top-28 mb-6 rounded-2xl md:border border-zinc-900 p-4 select-none">
      
      {/* 1. COMPACT MOBIL CONTROL PANEL BAR (Stays statically inline at the top of the page flow) */}
      <div className="flex items-center justify-between md:hidden w-full mb-2">
        <Button 
          light 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium text-sm flex items-center gap-2 px-3 h-10 rounded-xl"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Menu Sidebar</span>
        </Button>
      </div>

      {/* 2. DYNAMIC CONTENT LINKS VIEW (Always visible on desktop, toggles inline on mobile) */}
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col gap-6 w-full mt-4 md:mt-0`}>
        
        {/* Navigation Routes */}
        <div className="flex flex-col gap-1.5 w-full">
          {user?.role == "user" ? userItems.map((item, idx) => (
            <Link href={item.route} key={idx} passHref className="w-full" onClick={() => setIsOpen(false)}>
              <Button
                light
                className={`w-full justify-start gap-3 h-10 px-3 rounded-xl transition-all font-medium text-sm text-left ${
                  pathname === item.route ? toneColors.active : toneColors.inactive
                }`}
              >
                <item.icon size={16} className={pathname === item.route ? 'text-green-400' : 'text-zinc-500'} />
                <span>{item.title}</span>
              </Button>
            </Link>
          )) : user?.role == "admin" ? adminItems.map((item, idx) => (
            <Link href={item.route} key={idx} passHref className="w-full" onClick={() => setIsOpen(false)}>
              <Button
                light
                className={`w-full justify-start gap-3 h-10 px-3 rounded-xl transition-all font-medium text-sm text-left ${
                  pathname === item.route ? toneColors.active : toneColors.inactive
                }`}
              >
                <item.icon size={16} className={pathname === item.route ? 'text-green-400' : 'text-zinc-500'} />
                <span>{item.title}</span>
              </Button>
            </Link> )) : null}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-1.5 w-full pt-4 border-t border-zinc-900/60">
          <Button 
            light
            className="w-full justify-start gap-3 h-10 px-3 rounded-xl bg-transparent text-zinc-400 hover:text-red-400 hover:bg-red-500/5 font-medium text-sm text-left transition-all"
            onClick={async() => {
              await logOutUser();
              setIsOpen(false);
              redirect('/auth/login');
            }}
          >
            <LogOut size={16} className="text-zinc-500" />
            <span>Log out</span>
          </Button>
        </div>

      </div>
    </div>
  );
}