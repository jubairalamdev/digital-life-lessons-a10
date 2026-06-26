"use client";

import React, { useState } from 'react';
import { Table, Button } from "@heroui/react";
import { serverMutation, updateDataAndRevalidate } from "@/lib/actions/common";
import { ShieldCheck, User } from "lucide-react";

export default function ManageUsersContent({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [updatingId, setUpdatingId] = useState(null);

    const handleRoleUpdate = async (userId, currentRole) => {
        // Prevent unnecessary calls if already admin
        if (currentRole === "admin") return;

        setUpdatingId(userId);
        const newRole = "admin";

        const result = await serverMutation(`/api/users/role/${userId}`, { role: newRole }, 'PATCH');

        if (result) {
            // Optimistic UI update
            setUsers(prev => prev.map(u => 
                u._id === userId ? { ...u, role: newRole } : u
            ));
            // Refresh server data if needed
            updateDataAndRevalidate("/dashboard/admin/manage-users");
        } else {
            alert("Failed to update role.");
        }
        setUpdatingId(null);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Manage Users</h1>
                <p className="text-zinc-400 text-sm mt-1">
                    View all registered users and manage their platform roles.
                </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-xl">
                <Table aria-label="Platform Users" shadow="none" className="bg-transparent">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Platform users data" className="min-w-[700px] bg-zinc-950/20">
                            <Table.Header>
                                <Table.Column isRowHeader className="text-zinc-500 font-bold text-xs uppercase tracking-wider">
                                    User Info
                                </Table.Column>
                                <Table.Column className="text-zinc-500 font-bold text-xs uppercase tracking-wider">
                                    Email
                                </Table.Column>
                                <Table.Column className="text-zinc-500 font-bold text-xs uppercase tracking-wider text-center">
                                    Lessons Created
                                </Table.Column>
                                <Table.Column className="text-zinc-500 font-bold text-xs uppercase tracking-wider text-center">
                                    Current Role
                                </Table.Column>
                                <Table.Column className="text-zinc-500 font-bold text-xs uppercase tracking-wider text-right">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent="No users found.">
                                {users.map((user) => (
                                    <Table.Row key={user._id} className="border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors">
                                        
                                        {/* User Info Cell */}
                                        <Table.Cell className="py-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                {user.image ? (
                                                    <img src={user.image} className="w-8 h-8 rounded-full object-cover border border-zinc-800" alt="" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                                                        {user.name?.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="font-semibold text-white text-sm">{user.name || "Unknown User"}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Email Cell */}
                                        <Table.Cell className="py-4 text-sm text-zinc-400">
                                            {user.email}
                                        </Table.Cell>

                                        {/* Lessons Count Cell */}
                                        <Table.Cell className="py-4 text-center">
                                            <span className="text-sm font-mono text-zinc-300">{user.totalLessons}</span>
                                        </Table.Cell>

                                        {/* Role Cell */}
                                        <Table.Cell className="py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                                                user?.role === "admin" 
                                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                                                    : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                                            }`}>
                                                {user?.role === "admin" ? <ShieldCheck size={12} /> : <User size={12} />}
                                                {user?.role || "user"}
                                            </span>
                                        </Table.Cell>

                                        {/* Actions Cell */}
                                        <Table.Cell className="py-4 pr-6 text-right">
                                            {user?.role === "admin" ? (
                                                <span className="text-xs text-zinc-600 font-medium">Administrator</span>
                                            ) : (
                                                <Button 
                                                    size="sm" 
                                                    isLoading={updatingId === user._id}
                                                    onClick={() => handleRoleUpdate(user._id, user?.role)}
                                                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl px-3 h-8 text-[11px] font-semibold transition-all"
                                                >
                                                    Promote to Admin
                                                </Button>
                                            )}
                                        </Table.Cell>

                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
}