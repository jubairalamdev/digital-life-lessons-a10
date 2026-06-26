"use client";

import React, { useState } from "react";
import { Modal, Button, Input, Label, TextField, Surface } from "@heroui/react";
import { Edit, Sparkles } from "lucide-react";
import { serverMutation } from "@/lib/actions/common";
import { toast } from "react-toastify";

export default function UpdateLessonAction({ lesson, isPremiumUser, onUpdateSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Dynamic collection generation via standard standard browser form data entries
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        // Construct the tracking layout mapping object to meet your backend req.body names
        const modifiedLessonPayload = {
            name: formValues.title,
            description: formValues.description,
            category: formValues.category,
            emotionalTone: formValues.emotionalTone,
            image: formValues.image || lesson.image,
            visibility: formValues.visibility,
            accessLevel: formValues.accessLevel,
            isFeatured: lesson.isFeatured,
            isReviewed: lesson.isReviewed
        };

        try {
            setIsUpdating(true);
            
            // Execute mutation phase using your serverMutation action wrapper
            const result = await serverMutation(`/api/lessons/${lesson._id}`, modifiedLessonPayload, 'PATCH');

            if (result && (result.modifiedCount > 0 || result.acknowledged)) {
                toast.success("Lesson updated seamlessly! ✨");
                setIsOpen(false);
                
                // Fire optimistic UI update up to state management layout hook
                if (onUpdateSuccess) {
                    onUpdateSuccess({ 
                        ...lesson, 
                        title: modifiedLessonPayload.name,
                        description: modifiedLessonPayload.description,
                        category: modifiedLessonPayload.category,
                        emotionalTone: modifiedLessonPayload.emotionalTone,
                        image: modifiedLessonPayload.image,
                        visibility: modifiedLessonPayload.visibility,
                        accessLevel: modifiedLessonPayload.accessLevel
                    });
                }
            } else {
                toast.error("No modifications found or update failed.");
            }
        } catch (error) {
            console.error("Patch mutation lifecycle crash:", error);
            toast.error("Network runtime structural connection failure.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            {/* The structural dynamic row action execution target button */}
            <Button 
                size="sm" 
                onClick={() => setIsOpen(true)}
                className="bg-zinc-900 hover:bg-blue-950/40 border border-zinc-800/80 text-blue-400 rounded-xl px-3 h-8 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
                <Edit size={13} /> Update
            </Button>

            {/* HeroUI v3 Anatomy Compliant Form Editing Dialog Window */}
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="bg-zinc-950 border border-zinc-900 shadow-2xl rounded-2xl max-w-md w-full text-left">
                            <Modal.CloseTrigger className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors" />
                            
                            <Modal.Header className="p-6 pb-0">
                                <Modal.Icon className="bg-blue-500/10 text-blue-400 p-2 rounded-xl border border-blue-500/20 inline-block mb-3">
                                    <Sparkles className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-xl font-bold text-white tracking-tight">
                                    Edit Lesson Details
                                </Modal.Heading>
                                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                                    Modify your custom lesson properties below. Changes will sync to the live application database ecosystem immediately.
                                </p>
                            </Modal.Header>
                            
                            <Modal.Body className="p-6">
                                <Surface variant="default" className="bg-transparent border-none p-0 shadow-none">
                                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                                        
                                        {/* Lesson Title input mapping field */}
                                        <TextField className="w-full" name="title" type="text" variant="secondary" defaultValue={lesson.title}>
                                            <Label className="text-zinc-400 text-xs font-bold uppercase mb-1 block">Lesson Title</Label>
                                            <Input placeholder="E.g., Rebuilding Trust" className="bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm" required />
                                        </TextField>

                                        {/* Description Field mapping logic */}
                                        <TextField className="w-full" name="description" type="text" variant="secondary" defaultValue={lesson.description}>
                                            <Label className="text-zinc-400 text-xs font-bold uppercase mb-1 block">Description</Label>
                                            <Input placeholder="Enter details..." className="bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm" required />
                                        </TextField>

                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Category Entry point segment */}
                                            <TextField name="category" type="text" variant="secondary" defaultValue={lesson.category || "Mindset"}>
                                                <Label className="text-zinc-400 text-xs font-bold uppercase mb-1 block">Category</Label>
                                                <Input placeholder="Mindset" className="bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm" required />
                                            </TextField>

                                            {/* Emotional Tone Element structure block */}
                                            <TextField name="emotionalTone" type="text" variant="secondary" defaultValue={lesson.emotionalTone || "Realization"}>
                                                <Label className="text-zinc-400 text-xs font-bold uppercase mb-1 block">Tone</Label>
                                                <Input placeholder="Sad" className="bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm" required />
                                            </TextField>
                                        </div>

                                        {/* Optional Image Payload Address Source string */}
                                        <TextField className="w-full" name="image" type="url" variant="secondary" defaultValue={lesson.image}>
                                            <Label className="text-zinc-400 text-xs font-bold uppercase mb-1 block">Cover Artwork URL</Label>
                                            <Input placeholder="https://images.unsplash.com/..." className="bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm" />
                                        </TextField>

                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Visibility selection tracking cell mapping block */}
                                            <div className="flex flex-col gap-1">
                                                <label className="text-zinc-400 text-xs font-bold uppercase">Visibility</label>
                                                <select 
                                                    name="visibility" 
                                                    defaultValue={lesson.visibility || "Public"}
                                                    className="w-full h-10 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-xl px-3 text-sm focus:outline-none font-medium"
                                                >
                                                    <option value="Public">Public</option>
                                                    <option value="Private">Private</option>
                                                </select>
                                            </div>

                                            {/* Access restrictions checking subscription constraints validation */}
                                            <div className="flex flex-col gap-1">
                                                <label className="text-zinc-400 text-xs font-bold uppercase">Access Tier</label>
                                                <select 
                                                    name="accessLevel" 
                                                    disabled={!isPremiumUser}
                                                    defaultValue={lesson.accessLevel || "Free"}
                                                    className="w-full h-10 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-xl px-3 text-sm focus:outline-none font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    <option value="Free">Free</option>
                                                    <option value="Premium">Premium</option>
                                                </select>
                                                {!isPremiumUser && (
                                                    <span className="text-[10px] text-amber-500/80 leading-none">Requires Premium Plan</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Operations Footer Buttons Row */}
                                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900 mt-2">
                                            <Button 
                                                type="button"
                                                size="sm"
                                                onClick={() => setIsOpen(false)}
                                                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-medium px-4 h-9 rounded-xl border border-zinc-800"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                type="submit"
                                                size="sm"
                                                isLoading={isUpdating}
                                                className="bg-blue-500 hover:bg-blue-600 text-zinc-950 font-bold px-5 h-9 rounded-xl transition-colors"
                                            >
                                                {isUpdating ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </div>

                                    </form>
                                </Surface>
                            </Modal.Body>

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}