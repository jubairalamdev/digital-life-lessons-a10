"use client";

import React, { useState } from 'react';
import { Button, Select, Label, ListBox, Modal } from "@heroui/react";
import { serverMutation, updateDataAndRevalidate } from "@/lib/actions/common";
import { BookOpen, Star, CheckCircle, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export default function ManageLessonsContent({ initialLessons, publicCount, privateCount }) {
    const [lessons, setLessons] = useState(initialLessons);
    const [filterVisibility, setFilterVisibility] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Extract unique categories dynamically for the filter dropdown
    const categories = [...new Set(initialLessons.map(l => l.category).filter(Boolean))];

    // Filter Logic
    const filteredLessons = lessons.filter(lesson => {
        const matchVisibility = filterVisibility === "All" || lesson.visibility === filterVisibility;
        const matchCategory = filterCategory === "All" || lesson.category === filterCategory;
        return matchVisibility && matchCategory;
    });

    // Action Handlers
    const handleToggleFeatured = async (id, currentStatus) => {
        const newState = !currentStatus;
        setLessons(prev => prev.map(l => l._id === id ? { ...l, isFeatured: newState } : l));
        await serverMutation(`/api/lessons/toggle-featured/${id}`, { isFeatured: newState }, 'PATCH');
        updateDataAndRevalidate("/dashboard/admin/manage-lessons");
    };

    const handleToggleReviewed = async (id, currentStatus) => {
        const newState = !currentStatus;
        setLessons(prev => prev.map(l => l._id === id ? { ...l, isReviewed: newState } : l));
        await serverMutation(`/api/lessons/toggle-reviewed/${id}`, { isReviewed: newState }, 'PATCH');
    };

    const handleDeleteClick = (lesson) => {
        setDeleteTarget(lesson);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        const result = await serverMutation(`/api/lessons/${deleteTarget._id}`, {}, 'DELETE');
        if (result) {
            setLessons(prev => prev.filter(l => l._id !== deleteTarget._id));
            updateDataAndRevalidate("/dashboard/admin/manage-lessons");
            setIsModalOpen(false);
        } else {
            alert("Failed to delete lesson.");
        }
        setIsDeleting(false);
        setDeleteTarget(null);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Manage Lessons</h1>
                <p className="text-zinc-400 text-sm mt-1">Review, feature, and moderate all platform content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Public Lessons</span>
                        <h2 className="text-4xl font-black text-white">{publicCount}</h2>
                    </div>
                    <div className="bg-blue-500/10 text-blue-400 p-4 rounded-xl border border-blue-500/20">
                        <Eye size={24} />
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Private Lessons</span>
                        <h2 className="text-4xl font-black text-white">{privateCount}</h2>
                    </div>
                    <div className="bg-purple-500/10 text-purple-400 p-4 rounded-xl border border-purple-500/20">
                        <EyeOff size={24} />
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Visibility Filter */}
                <Select 
                    className="w-[256px]" 
                    placeholder="Select visibility"
                    selectedKey={filterVisibility}
                    onSelectionChange={(key) => setFilterVisibility(String(key))}
                >
                    <Label className="text-zinc-400 text-xs mb-1 block">Visibility</Label>
                    <Select.Trigger className="bg-zinc-950 border border-zinc-800 text-white rounded-xl px-3 py-2 flex items-center justify-between w-full">
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl text-white">
                        <ListBox>
                            {["All", "Public", "Private"].map((vis) => (
                                <ListBox.Item key={vis} id={vis} textValue={vis} className="hover:bg-zinc-900 px-3 py-2 rounded-lg cursor-pointer flex justify-between items-center">
                                    {vis}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Category Filter */}
                <Select 
                    className="w-[256px]" 
                    placeholder="Select category"
                    selectedKey={filterCategory}
                    onSelectionChange={(key) => setFilterCategory(String(key))}
                >
                    <Label className="text-zinc-400 text-xs mb-1 block">Category</Label>
                    <Select.Trigger className="bg-zinc-950 border border-zinc-800 text-white rounded-xl px-3 py-2 flex items-center justify-between w-full">
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl text-white">
                        <ListBox>
                            <ListBox.Item id="All" textValue="All Categories" className="hover:bg-zinc-900 px-3 py-2 rounded-lg cursor-pointer flex justify-between items-center">
                                All Categories
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            {categories.map((cat) => (
                                <ListBox.Item key={cat} id={cat} textValue={cat} className="hover:bg-zinc-900 px-3 py-2 rounded-lg cursor-pointer flex justify-between items-center">
                                    {cat}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* Lessons List Layout */}
            <div className="space-y-3">
                {filteredLessons.length === 0 ? (
                    <div className="border border-zinc-900 bg-zinc-950 rounded-2xl p-10 text-center text-zinc-600">
                        No lessons match your current filters.
                    </div>
                ) : (
                    filteredLessons.map((lesson) => (
                        <div key={lesson._id} className="border border-zinc-900 bg-zinc-950 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-zinc-800 transition-colors">
                            
                            {/* Left Info */}
                            <div className="flex-1 min-w-0 flex items-start gap-4">
                                {lesson.image ? (
                                    <img src={lesson.image} className="w-14 h-14 rounded-lg object-cover border border-zinc-800 shrink-0 hidden sm:block" alt="" />
                                ) : (
                                    <div className="w-14 h-14 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center hidden sm:block">
                                        <BookOpen size={20} className="text-zinc-700" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <h3 className="text-white font-bold truncate text-sm">{lesson.title}</h3>
                                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                        <span className="text-xs text-zinc-500">by {lesson.creatorName}</span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">
                                            {lesson.category || "Uncategorized"}
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                            lesson.visibility === 'Public' 
                                            ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' 
                                            : 'text-zinc-500 border-zinc-800 bg-zinc-900'
                                        }`}>
                                            {lesson.visibility}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                                {/* Reviewed Toggle */}
                                <Button
                                    size="sm"
                                    variant="flat"
                                    onClick={() => handleToggleReviewed(lesson._id, lesson.isReviewed)}
                                    className={`rounded-lg text-xs font-semibold h-8 px-3 ${
                                        lesson.isReviewed 
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                        : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300"
                                    }`}
                                >
                                    <CheckCircle size={14} />
                                    {lesson.isReviewed ? "Reviewed" : "Review"}
                                </Button>

                                {/* Featured Toggle */}
                                <Button
                                    size="sm"
                                    variant="flat"
                                    onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                    className={`rounded-lg text-xs font-semibold h-8 px-3 ${
                                        lesson.isFeatured 
                                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                                        : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300"
                                    }`}
                                >
                                    <Star size={14} />
                                    {lesson.isFeatured ? "Featured" : "Feature"}
                                </Button>

                                {/* Delete Button */}
                                <Button
                                    isIconOnly
                                    size="sm"
                                    onClick={() => handleDeleteClick(lesson)}
                                    className="bg-zinc-900 text-red-500/70 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 h-8 w-8 rounded-lg"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* HeroUI v3 Compound Delete Confirmation Modal */}
            {isModalOpen && (
                <Modal native isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
                        <Modal.Container>
                            <Modal.Dialog className="sm:max-w-[400px] bg-zinc-950 border border-zinc-800 text-white rounded-2xl p-6">
                                <Modal.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-white" onClick={() => setIsModalOpen(false)} />
                                
                                <Modal.Header className="flex gap-3 items-center">
                                    <Modal.Icon className="bg-red-500/10 text-red-400 p-2 rounded-lg border border-red-500/20">
                                        <AlertTriangle className="size-5" />
                                    </Modal.Icon>
                                    <Modal.Heading className="text-xl font-bold text-red-400">Confirm Deletion</Modal.Heading>
                                </Modal.Header>
                                
                                <Modal.Body className="mt-4">
                                    <p className="text-zinc-400 text-sm">
                                        Are you sure you want to permanently delete: <span className="text-white font-bold">&quot;{deleteTarget?.title}&ldquo;</span>?
                                    </p>
                                    <p className="text-zinc-600 text-xs mt-2">This action cannot be undone.</p>
                                </Modal.Body>
                                
                                <Modal.Footer className="mt-6 flex gap-3 justify-end">
                                    <Button 
                                        variant="flat" 
                                        onClick={() => setIsModalOpen(false)} 
                                        className="bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xl px-4 py-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        color="danger" 
                                        isLoading={isDeleting}
                                        onClick={confirmDelete} 
                                        className="bg-red-600 text-white rounded-xl font-semibold px-4 py-2"
                                    >
                                        Delete Lesson
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            )}
        </div>
    );
}