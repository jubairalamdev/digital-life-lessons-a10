"use client";

import React, { useState } from 'react';
import { Table, Button, Modal } from "@heroui/react";
import { serverMutation, serverFetch, updateDataAndRevalidate } from "@/lib/actions/common";
import { AlertTriangle, Trash2, Eye, ShieldOff } from 'lucide-react';

export default function ReportedLessonsContent({ initialReports }) {
    const [reports, setReports] = useState(initialReports);
    
    // States for Details Modal
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [detailsList, setDetailsList] = useState([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    // States for Delete Modal
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch individual reports for the Details Modal
    const handleViewDetails = async (lessonId, title) => {
        setSelectedLesson(title);
        setIsLoadingDetails(true);
        setIsDetailsOpen(true);

        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
        const data = await serverFetch(`${baseUrl}/api/reports/lesson/${lessonId}`, ["lessons"]);
        setDetailsList(Array.isArray(data) ? data : []);
        setIsLoadingDetails(false);
    };

    // Ignore Reports (Clears reports, keeps lesson)
    const handleIgnore = async (lessonId) => {
        const result = await serverMutation(`/api/reports/lesson/${lessonId}`, {}, 'DELETE');
        if (result) {
            setReports(prev => prev.filter(r => r.lessonId !== lessonId));
            updateDataAndRevalidate("/dashboard/admin/reported-lessons");
        }
    };

    // Open Delete Modal
    const handleOpenDelete = (lesson) => {
        setDeleteTarget(lesson);
        setIsDeleteOpen(true);
    };

    // Confirm Delete (Deletes lesson AND reports)
    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);

        const result = await serverMutation(`/api/admin/lessons/${deleteTarget.lessonId}`, {}, 'DELETE');
        if (result) {
            setReports(prev => prev.filter(r => r.lessonId !== deleteTarget.lessonId));
            updateDataAndRevalidate("/dashboard/admin/reported-lessons");
            setIsDeleteOpen(false);
        } else {
            alert("Failed to delete lesson.");
        }
        setIsDeleting(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Reported Lessons</h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Review community flags and take necessary moderation actions.
                </p>
            </div>

            {/* Table Container */}
            <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-xl">
                <Table aria-label="Reported Lessons" shadow="none" className="bg-transparent">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Reported lessons data" className="min-w-150 bg-zinc-950/20">
                            <Table.Header>
                                <Table.Column isRowHeader className="text-zinc-500 font-bold text-xs uppercase tracking-wider">
                                    Lesson Title
                                </Table.Column>
                                <Table.Column className="text-zinc-500 font-bold text-xs uppercase tracking-wider text-center">
                                    Report Count
                                </Table.Column>
                                <Table.Column className="text-zinc-500 font-bold text-xs uppercase tracking-wider text-right">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent="No reported lessons at the moment.">
                                {reports.map((item) => (
                                    <Table.Row key={item.lessonId} className="border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors">
                                        <Table.Cell className="py-4 pl-6">
                                            <span className="font-semibold text-white text-sm truncate block max-w-md">
                                                {item.title}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="py-4 text-center">
                                            <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold px-3 py-1 rounded-md">
                                                {item.reportCount} Reports
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="py-4 pr-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="flat"
                                                    onClick={() => handleViewDetails(item.lessonId, item.title)}
                                                    className="bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-xl h-8 text-[11px] font-semibold hover:bg-zinc-800"
                                                >
                                                    <Eye size={13} /> Details
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="flat"
                                                    onClick={() => handleIgnore(item.lessonId)}
                                                    className="bg-zinc-900 text-zinc-500 border border-zinc-800 rounded-xl h-8 text-[11px] font-semibold hover:bg-zinc-800 hover:text-zinc-300"
                                                >
                                                    <ShieldOff size={13} /> Ignore
                                                </Button>
                                                <Button 
                                                    isIconOnly 
                                                    size="sm"
                                                    onClick={() => handleOpenDelete(item)}
                                                    className="bg-zinc-900 text-red-500/70 border border-zinc-800 rounded-lg h-8 w-8 hover:border-red-500/30 hover:text-red-400"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            {/* --- MODALS --- */}

            {/* 1. View Details Modal (HeroUI v3) */}
            <Modal isOpen={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-125 bg-zinc-950 border border-zinc-800 text-white">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <Eye className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white">Report Details</Modal.Heading>
                            </Modal.Header>
                            
                            <Modal.Body>
                                <p className="text-zinc-400 text-xs mb-4 uppercase tracking-wider">Reports for: <span className="text-white font-bold normal-case">{selectedLesson}</span></p>
                                
                                {isLoadingDetails ? (
                                    <div className="space-y-3 animate-pulse">
                                        <div className="h-12 bg-zinc-900 rounded-lg"></div>
                                        <div className="h-12 bg-zinc-900 rounded-lg"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                        {detailsList.length === 0 ? (
                                            <p className="text-zinc-600 text-sm text-center py-4">No details found.</p>
                                        ) : (
                                            detailsList.map((report, i) => (
                                                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <span className="text-sm text-white font-medium block">{report.reason}</span>
                                                        <span className="text-xs text-zinc-500 block mt-1 truncate">{report.reportedUserEmail}</span>
                                                    </div>
                                                    <span className="text-[10px] text-zinc-600 font-mono shrink-0">
                                                        {new Date(report.timestamp).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <Button 
                                    variant="flat" 
                                    slot="close"
                                    className="bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xl w-full"
                                >
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            {/* 2. Delete Confirmation Modal (HeroUI v3) */}
            <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-100 bg-zinc-950 border border-zinc-800 text-white">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-red-500/10 text-red-400 border border-red-500/20">
                                    <Trash2 className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white">Confirm Deletion</Modal.Heading>
                            </Modal.Header>
                            
                            <Modal.Body>
                                <p className="text-zinc-400 text-sm">
                                    Are you sure you want to permanently delete this lesson and clear all its reports?
                                </p>
                                <p className="text-white font-semibold text-sm mt-2 truncate">&quot;{deleteTarget?.title}&quot;</p>
                                <p className="text-zinc-600 text-xs mt-2">This action cannot be undone.</p>
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <Button 
                                    variant="flat" 
                                    slot="close"
                                    className="bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    isLoading={isDeleting}
                                    onPress={confirmDelete}
                                    className="bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500"
                                >
                                    Delete Lesson
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}