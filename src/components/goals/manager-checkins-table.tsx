"use client";

import { useState } from "react";

import {
    addManagerComment,
} from "@/services/goal.service";

import { toast } from "sonner";

interface Props {
    updates: any[];

    onRefresh: () => void;
}

export default function ManagerCheckinsTable({
    updates,
    onRefresh,
}: Props) {

    const [activeId, setActiveId] =
        useState<string | null>(null);

    const [comment, setComment] =
        useState("");

    async function saveComment(
        updateId: string
    ) {

        const { error } =
            await addManagerComment(
                updateId,
                comment
            );

        if (error) {

            toast.error(error.message);

            return;
        }

        toast.success(
            "Manager review added"
        );

        setActiveId(null);

        setComment("");

        onRefresh();
    }

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">
                    Quarterly Employee Reviews
                </h2>

                <p className="text-sm text-slate-500">
                    Review planned targets versus employee achievements.
                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="border-b bg-slate-50 text-left">

                            <th className="p-3">
                                Goal
                            </th>

                            <th className="p-3">
                                Quarter
                            </th>

                            <th className="p-3">
                                Planned
                            </th>

                            <th className="p-3">
                                Actual
                            </th>

                            <th className="p-3">
                                Progress
                            </th>

                            <th className="p-3">
                                Employee Comment
                            </th>

                            <th className="p-3">
                                Manager Review
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {updates.map((update) => (

                            <tr
                                key={update.id}
                                className="border-b align-top"
                            >

                                {/* Goal */}
                                <td className="p-3">

                                    <div>

                                        <p className="font-medium">

                                            {
                                                update.goals
                                                    ?.title
                                            }

                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">

                                            {
                                                update.goals
                                                    ?.thrust_area
                                            }

                                        </p>

                                    </div>

                                </td>

                                {/* Quarter */}
                                <td className="p-3">
                                    {update.quarter}
                                </td>

                                {/* Planned */}
                                <td className="p-3 font-medium">

                                    {
                                        update.planned_value
                                    }

                                </td>

                                {/* Actual */}
                                <td className="p-3 font-medium">

                                    {
                                        update.actual_value
                                    }

                                </td>

                                {/* Progress */}
                                <td className="p-3">

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize">

                                        {
                                            update.progress
                                        }

                                    </span>

                                </td>

                                {/* Employee comment */}
                                <td className="max-w-xs p-3 text-sm text-slate-600">

                                    {
                                        update.employee_comment
                                    }

                                </td>

                                {/* Manager Review */}
                                <td className="max-w-sm p-3">

                                    {activeId ===
                                        update.id ? (

                                        <div className="space-y-2">

                                            <textarea
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Add structured manager review..."
                                                className="w-full rounded border p-2"
                                            />

                                            <button
                                                onClick={() =>
                                                    saveComment(
                                                        update.id
                                                    )
                                                }
                                                className="rounded bg-black px-3 py-1 text-sm text-white"
                                            >
                                                Save Review
                                            </button>

                                        </div>

                                    ) : (

                                        <div className="space-y-2">

                                            <p className="text-sm text-slate-600">

                                                {
                                                    update.manager_comment ||
                                                    "No review added"
                                                }

                                            </p>

                                            <button
                                                onClick={() => {
                                                    setActiveId(
                                                        update.id
                                                    );

                                                    setComment(
                                                        update.manager_comment || ""
                                                    );
                                                }}
                                                className="rounded bg-slate-200 px-3 py-1 text-xs"
                                            >
                                                Add Review
                                            </button>

                                        </div>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}