"use client";

import React, { useEffect, useState } from 'react';
import { Table } from '@heroui/react';

export function FavoritesTableWrapper({ children }) {
    const [mounted, setMounted] = useState(false);

    // Forces rendering to synchronize safely after browser mount, bypassing hydration flags
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a stable placeholder frame with matching sizing parameters during the initial pass
        return (
            <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl min-h-[200px] animate-pulse" />
        );
    }

    return (
        <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="User's Saved Lessons List" className="min-w-[700px] bg-zinc-950/20 backdrop-blur-md">
                        {children}
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}