"use client";

import React, { useState, useEffect } from 'react';
import { Button, Modal } from "@heroui/react";
import { AlertTriangle } from 'lucide-react';
import { serverMutation } from '@/lib/actions/common';

const REPORT_REASONS = [
    "Inappropriate content",
    "Spam",
    "Hate speech",
    "Misinformation",
    "Copyright violation",
    "Other"
];

export default function ReportButton({ user, lesson }) {
    const [isReported, setIsReported] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reason, setReason] = useState("");

    // 1. Check if user already reported this lesson on mount
    useEffect(() => {
        const checkReportStatus = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
            try {
                const res = await fetch(`${baseUrl}/api/reports/check?lessonId=${lesson._id}&userId=${user.id}`);
                
                if (res.ok && res.status !== 204) {
                    const text = await res.text();
                    if (text) {
                        const data = JSON.parse(text);
                        if (data) setIsReported(true);
                    }
                }
            } catch (err) {
                console.error("Error checking report status:", err);
            } finally {
                setIsChecking(false);
            }
        };

        if (user?.id && lesson?._id) {
            checkReportStatus();
        }
    }, [user?.id, lesson?._id]);

    // 2. Handle Report Submission
    const handleSubmit = async () => {
        if (!reason) return;

        setIsSubmitting(true);
        
        const result = await serverMutation('/api/reports', {
            lessonId: lesson._id,
            reporterUserId: user.id,
            reportedUserEmail: user.email,
            reason: reason,
            timestamp: new Date().toISOString()
        }, 'POST');

        if (result) {
            setIsReported(true);
            setReason(""); 
        } else {
            alert("Failed to submit report. Please try again.");
        }
        
        setIsSubmitting(false);
    };

    return (
        <Modal>
            {/* The first button inside <Modal> acts as the native trigger */}
            <Button
                size="sm"
                isDisabled={isChecking || isReported}
                className={`h-9 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    isReported 
                        ? 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed' 
                        : 'bg-transparent hover:bg-red-500/5 text-zinc-500 hover:text-red-400 border-transparent hover:border-red-500/10'
                }`}
            >
                <AlertTriangle size={14} />
                {isChecking ? "Checking..." : isReported ? "Reported" : "Report"}
            </Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-100 bg-zinc-950 border border-zinc-800 text-white">
                        <Modal.CloseTrigger />
                        
                        <Modal.Header>
                            <Modal.Icon className="bg-red-500/10 text-red-400 border border-red-500/20">
                                <AlertTriangle className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-white">Report Lesson</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <p className="text-zinc-400 text-sm mb-4">
                                Help us understand the issue with: 
                            </p>
                            <p className="text-white font-semibold text-sm mb-4 truncate">
                                &quot;{lesson.title}&ldquo;
                            </p>
                            
                            <select 
                                value={reason} 
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-xl p-3 focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select a reason...</option>
                                {REPORT_REASONS.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button 
                                variant="flat" 
                                slot="close" // Retains HeroUI's auto-close feature on click
                                className="bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button 
                                isLoading={isSubmitting}
                                isDisabled={!reason}
                                onClick={handleSubmit}
                                className="bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 disabled:opacity-50"
                            >
                                Submit Report
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}