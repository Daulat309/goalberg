"use client";

import { useState } from "react";

import {
    updateSharedGoalWeightage,
} from "@/services/shared-goal.service";

import { toast } from "sonner";

interface SharedGoalsTableProps {
    goals: any[];
}

export default function SharedGoalsTable({
    goals,
}: SharedGoalsTableProps) {

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [weightage, setWeightage] =
        useState("");

    function startEditing(goal: any) {

        setEditingId(goal.id);

        setWeightage(
            String(goal.weightage)
        );
    }

    async function saveWeightage(
        assignmentId: string
    ) {

        const numericWeightage =
            Number(weightage);

        if (
            numericWeightage < 10
        ) {

            toast.error(
                "Minimum weightage is 10%"
            );

            return;
        }

        const { error } =
            await updateSharedGoalWeightage(
                assignmentId,
                numericWeightage
            );

        if (error) {

            toast.error(error.message);

            return;
        }

        toast.success(
            "Weightage updated"
        );

        setEditingId(null);

        window.location.reload();
    }

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">
                    Shared Organizational KPIs
                </h2>

                <p className="text-sm text-slate-500">
                    Department-level goals assigned by leadership.
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
                                Thrust Area
                            </th>

                            <th className="p-3">
                                UOM
                            </th>

                            <th className="p-3">
                                Target
                            </th>

                            <th className="p-3">
                                Weightage
                            </th>

                            <th className="p-3">
                                Governance
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {goals.map((goal) => {

                            const isEditing =
                                editingId === goal.id;

                            return (

                                <tr
                                    key={goal.id}
                                    className="border-b"
                                >

                                    {/* Goal */}
                                    <td className="p-3">

                                        <div>

                                            <p className="font-medium">

                                                {
                                                    goal.shared_goals
                                                        ?.title
                                                }

                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">

                                                {
                                                    goal.shared_goals
                                                        ?.description
                                                }

                                            </p>

                                        </div>

                                    </td>

                                    {/* Thrust */}
                                    <td className="p-3">

                                        {
                                            goal.shared_goals
                                                ?.thrust_area
                                        }

                                    </td>

                                    {/* UOM */}
                                    <td className="p-3 capitalize">

                                        {
                                            goal.shared_goals
                                                ?.uom_type
                                                ?.replace(
                                                    "_",
                                                    " "
                                                )
                                        }

                                    </td>

                                    {/* Target */}
                                    <td className="p-3 font-medium">

                                        {
                                            goal.shared_goals
                                                ?.target_value
                                        }

                                    </td>

                                    {/* Weightage */}
                                    <td className="p-3">

                                        {isEditing ? (

                                            <div className="flex items-center gap-2">

                                                <input
                                                    type="number"
                                                    value={weightage}
                                                    onChange={(e) =>
                                                        setWeightage(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-20 rounded border p-2"
                                                />

                                                <button
                                                    onClick={() =>
                                                        saveWeightage(
                                                            goal.id
                                                        )
                                                    }
                                                    className="rounded bg-black px-3 py-1 text-sm text-white"
                                                >
                                                    Save
                                                </button>

                                            </div>

                                        ) : (

                                            <div className="flex items-center gap-2">

                                                <span>

                                                    {
                                                        goal.weightage
                                                    }%

                                                </span>

                                                <button
                                                    onClick={() =>
                                                        startEditing(
                                                            goal
                                                        )
                                                    }
                                                    className="rounded bg-slate-200 px-2 py-1 text-xs"
                                                >
                                                    Edit
                                                </button>

                                            </div>

                                        )}

                                    </td>

                                    {/* Governance */}
                                    <td className="p-3">

                                        <div className="flex flex-col gap-1">

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">

                                                Shared KPI

                                            </span>

                                            <span className="text-xs text-slate-500">

                                                Target locked by organization

                                            </span>

                                        </div>

                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

                {goals.length === 0 && (

                    <div className="py-10 text-center text-sm text-slate-500">

                        No shared organizational KPIs assigned.

                    </div>

                )}

            </div>

        </div>
    );
}