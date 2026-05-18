"use client";

import { useState } from "react";

interface RejectionDialogProps {
    goal: any;

    onSubmit: (
        id: string,
        comment: string
    ) => void;
}

export default function RejectionDialog({
    goal,
    onSubmit,
}: RejectionDialogProps) {
    const [comment, setComment] =
        useState("");

    if (!goal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6">
                <h2 className="text-xl font-semibold">
                    Reject Goal
                </h2>

                <textarea
                    placeholder="Rejection reason..."
                    className="mt-4 w-full rounded border p-3"
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                />

                <div className="mt-4 flex gap-3">
                    <button
                        onClick={() =>
                            onSubmit(goal.id, comment)
                        }
                        className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                        Submit Rejection
                    </button>
                </div>
            </div>
        </div>
    );
}