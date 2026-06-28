import React from 'react';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { Table, Button } from '@heroui/react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { serverFetchById } from '@/lib/actions/common';
import { ArrowLeftCircle } from 'lucide-react';
import { FavoriteRow } from '@/components/dashboard/favorites/FavoriteRow';
import { FavoritesTableWrapper } from '@/components/dashboard/favorites/FavoritesTableWrapper';

const MyFavoritesPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || !session.user) {
        return redirect('/login');
    }

    if (session?.user?.role === "user") {

        const currentUserId = session.user.id;
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

        const favoriteEntries = await serverFetchById(`/api/favorites`, currentUserId, ["favorites"]) || [];

        return (
            <div className="w-full max-w-6xl mx-auto space-y-6 select-none p-4 md:p-8 text-zinc-100">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white">My Saved Favorites</h1>
                        <p className="text-zinc-500 text-xs mt-0.5 font-light">
                            Review, inspect, or offload compiled bookmark cards tracking community insight wisdom.
                        </p>
                    </div>
                    <Link href="/allLessons">
                        <Button size="sm" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs rounded-xl flex items-center gap-2 h-9">
                            <ArrowLeftCircle size={14} /> Back to Feed
                        </Button>
                    </Link>
                </div>

                {favoriteEntries.length > 0 ? (
                    /* Dynamic Client-Safe Hydration Guard Container */
                    <FavoritesTableWrapper>
                        <Table.Header className="bg-zinc-900/40 border-b border-zinc-900 text-zinc-400 font-bold text-xs uppercase tracking-wider">
                            <Table.Column isRowHeader className="pl-6 h-12">Title / Subject Track</Table.Column>
                            <Table.Column className="h-12">Category</Table.Column>
                            <Table.Column className="h-12">Emotional Tone</Table.Column>
                            <Table.Column className="h-12">Tier Protection</Table.Column>
                            <Table.Column className="h-12 pr-6 text-right">Operational Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {favoriteEntries.map((favorite) => (
                                <FavoriteRow
                                    key={favorite._id}
                                    favorite={favorite}
                                    currentUserId={currentUserId}
                                    baseUrl={baseUrl}
                                />
                            ))}
                        </Table.Body>
                    </FavoritesTableWrapper>
                ) : (
                    <div className="w-full text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl">
                        <p className="text-zinc-500 text-sm font-light">
                            No life lessons discovered inside your personalized bookmarks tracker.
                        </p>
                    </div>
                )}

            </div>
        );
    } else {
        RedirectType("/unauthorized")
    }
};

export default MyFavoritesPage;