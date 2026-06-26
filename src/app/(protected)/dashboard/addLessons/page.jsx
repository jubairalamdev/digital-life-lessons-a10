"use client";

import React, { useState } from "react";
import {
    Form,
    TextField,
    Label,
    Input,
    Button,
    FieldError,
    Select,
    ListBox,
    TextArea,
    Tooltip
} from "@heroui/react";
import { Check, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { serverMutation } from "@/lib/actions/common";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function AddLessonPage() {
    const [submitting, setSubmitting] = useState(false);

    // Fetch live authenticated user session and plan tier configs
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;




    const targetPlan = user?.plan?.toLowerCase() || 'free';
    const isPremiumUser = targetPlan === 'premium' || targetPlan === 'pro';

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error("Authentication expired. Please log in again.");
            return;
        }

        // Cache form reference to completely safeguard lifecycle from async thread loss
        const formElement = e.currentTarget;

        setSubmitting(true);
        const formData = new FormData(formElement);

        // Match payload attributes securely with database model parameters
        const payload = {
            title: formData.get("title")?.toString(),
            description: formData.get("description")?.toString(),
            category: formData.get("category")?.toString(),
            emotionalTone: formData.get("emotionalTone")?.toString(),
            image: formData.get("image")?.toString() || "",
            visibility: "Public",
            accessLevel: isPremiumUser ? formData.get("accessLevel")?.toString() : "Free",
            likes: [],
            isFeatured: false,
            isReviewed: true,
            creatorId: user.id
        };

        try {
            const result = await serverMutation("/api/lessons", payload, "POST");

            if (result && result.success) {
                toast.success("Life lesson saved and preserved successfully! ✨");
                formElement.reset();
            } else {
                toast.error(result?.message || "Something went wrong saving this lesson.");
            }
        } catch (error) {
            console.error("Mutation post failure runtime intercept:", error);
            toast.error("Failed executing structural network save pipeline.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isPending) {
        return (
            <div className="w-full max-w-3xl mx-auto text-center text-zinc-500 text-base animate-pulse">
                Evaluating structural session tiers...
            </div>
        );
    }
    if (session?.user?.role === "user") {
        return (
            <section className="w-full border-zinc-900 relative">
                <div className="container mx-auto max-w-3xl px-4">

                    {/* Section Heading aligned perfectly with Top Contributors style */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            <Sparkles className="text-green-400 fill-green-400/10" size={26} />
                            Document New <span className="text-green-400">Wisdom</span>
                        </h2>
                        <p className="text-zinc-500 text-sm mt-2 font-light">
                            Compile values, breakthrough realizations, or core experiences into the directory streams.
                        </p>
                    </div>

                    {/* Form Wrapper Container */}
                    <Form
                        validationBehavior="native"
                        className="flex flex-col gap-6 w-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-xl"
                        onSubmit={onSubmit}
                    >

                        {/* Lesson Title Input */}
                        <TextField name="title" type="text" className="w-full">
                            <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Lesson Title</Label>
                            <Input required placeholder="Enter a sharp, clear title summarizing your discovery..." className="bg-zinc-900 text-base h-11 text-white" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        {/* Category Selection Component Group */}
                        <Select name="category" className="w-full" placeholder="Choose a classification topic">
                            <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Category</Label>
                            <Select.Trigger required className="bg-zinc-900 border border-zinc-800 rounded-xl h-11 text-base text-zinc-200">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl">
                                <ListBox className="text-zinc-300 text-base">
                                    <ListBox.Item id="Personal Growth" textValue="Personal Growth">
                                        🌱 Personal Growth <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Career" textValue="Career">
                                        💼 Career <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Relationships" textValue="Relationships">
                                        ❤️ Relationships <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Mindset" textValue="Mindset">
                                        🧠 Mindset <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Mistakes Learned" textValue="Mistakes Learned">
                                        ⚠️ Mistakes Learned <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Emotional Tone Indicator Component Group */}
                        <Select name="emotionalTone" className="w-full" placeholder="Select primary perspective mood profile">
                            <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Emotional Tone</Label>
                            <Select.Trigger required className="bg-zinc-900 border border-zinc-800 rounded-xl h-11 text-base text-zinc-200">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl">
                                <ListBox className="text-zinc-300 text-base">
                                    <ListBox.Item id="Motivational" textValue="Motivational">
                                        🔥 Motivational <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Sad" textValue="Sad">
                                        😢 Sad <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Realization" textValue="Realization">
                                        💡 Realization <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Gratitude" textValue="Gratitude">
                                        🙏 Gratitude <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Optional Image Url Attachment */}
                        <TextField name="image" type="url" className="w-full">
                            <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Illustration Cover Image URL (Optional)</Label>
                            <Input placeholder="https://images.unsplash.com/photo-..." className="bg-zinc-900 text-base h-11 text-white font-mono" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        {/* Full Description TextArea Field */}
                        <div className="flex flex-col w-full">
                            <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Full Description / Story / Insight</Label>
                            <TextArea
                                required
                                name="description"
                                aria-label="Full Lesson Content Story Space"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl text-base text-zinc-200 min-h-32"
                                placeholder="Deep dive explanation. Share the background story, what happened, and what the lasting takeaway means for someone else..."
                            />
                        </div>

                        {/* Guarded Tier Access Control Dropdown */}
                        <div className="flex flex-col w-full border-t border-zinc-800/60 pt-4 mt-2">
                            {isPremiumUser ? (
                                <Select name="accessLevel" className="w-full" defaultSelectedKey="Free" placeholder="Set Protection Tier">
                                    <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Access Level</Label>
                                    <Select.Trigger className="bg-zinc-900 border border-zinc-800 rounded-xl h-11 text-base text-zinc-200">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl">
                                        <ListBox className="text-zinc-300 text-base">
                                            <ListBox.Item id="Free" textValue="Free">
                                                🔓 Free Tier Content (Visible to everyone) <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="Premium" textValue="Premium">
                                                💎 Premium Only (Locked behind member subscription plans) <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            ) : (
                                <Tooltip
                                    content="Upgrade to Premium to create paid lessons."
                                    placement="top"
                                    className="bg-zinc-900 border border-zinc-800 text-green-400 font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xl"
                                >
                                    <div className="w-full">
                                        <Select isDisabled name="accessLevel" className="w-full opacity-50 cursor-not-allowed" defaultSelectedKey="Free">
                                            <Label className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1.5">Access Level</Label>
                                            <Select.Trigger className="bg-zinc-900 border border-zinc-800 rounded-xl h-11 text-base text-zinc-400">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl">
                                                <ListBox className="text-zinc-400 text-base">
                                                    <ListBox.Item id="Free" textValue="Free">
                                                        🔓 Free Tier Content (Defaulted) <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </Tooltip>
                            )}
                        </div>

                        {/* Action Operations Row */}
                        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60 mt-2">
                            <Button
                                type="submit"
                                isLoading={submitting}
                                className="bg-green-400 hover:bg-green-300 font-extrabold text-sm uppercase tracking-wider text-zinc-950 h-11 px-6 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {!submitting && <Check size={16} strokeWidth={3} />}
                                {submitting ? "Publishing card..." : "Publish Lesson"}
                            </Button>
                            <Button
                                type="reset"
                                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold text-sm uppercase tracking-wider h-11 px-5 rounded-xl border border-zinc-800 transition-colors"
                            >
                                Reset Form
                            </Button>
                        </div>

                    </Form>
                </div>
            </section>
        );
    } else {
        redirect("/unauthorized")
    }
}