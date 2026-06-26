"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { serverMutation, updateDataAndRevalidate } from "@/lib/actions/common";
import { toast } from "react-toastify";

export default function DeleteLessonAction({ lessonId, lessonTitle, onDeleteSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPurging, setIsPurging] = useState(false);

    const executeDeletion = async () => {
        try {
            setIsPurging(true);
            const result = await serverMutation(`/api/lessons/${lessonId}`, {}, 'DELETE');
            toast.success("Lesson Deleted Successfully")
            window.location.reload();
        } catch (error) {
            console.error("Deletion execution crash:", error);
            toast.error("Network error during deletion process.");
        } finally {
            setIsPurging(false);
        }
    };

    return (
        <>
            {/* Table Row Trigger Button */}
            <Button 
                size="sm" 
                onClick={() => setIsOpen(true)}
                className="bg-zinc-900 hover:bg-red-950/40 border border-zinc-800/80 text-red-400 rounded-xl px-3 h-8 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
                <Trash2 size={13} /> Delete
            </Button>

            {/* Simple HeroUI v3 Structural Modal Box */}
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="bg-zinc-950 border border-zinc-900 shadow-2xl rounded-2xl max-w-md w-full p-6 text-left">
                            <Modal.CloseTrigger className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors" />
                            
                            <Modal.Header>
                                <Modal.Heading className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                    Delete Lesson
                                </Modal.Heading>
                            </Modal.Header>
                            
                            <Modal.Body className="py-3">
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Are you sure you want to permanently delete <span className="text-white font-semibold">&quot;{lessonTitle}&ldquo;</span>? This action cannot be undone.
                                </p>
                            </Modal.Body>
                            
                            <Modal.Footer className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900/60">
                                <Button 
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-medium px-4 h-9 rounded-xl border border-zinc-800"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    size="sm"
                                    isLoading={isPurging}
                                    onClick={executeDeletion}
                                    className="bg-red-500 hover:bg-red-600 text-zinc-950 font-bold px-4 h-9 rounded-xl transition-colors"
                                >
                                    {isPurging ? "Deleting..." : "Delete Permanently"}
                                </Button>
                            </Modal.Footer>

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}