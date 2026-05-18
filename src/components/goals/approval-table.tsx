"use client";

import { useState } from "react";

import {
    updateGoalByManager,
} from "@/services/goal.service";

import { toast } from "sonner";

interface ApprovalTableProps {
    goals: any[];

    onApprove: (goal: any) => void;

    onReject: (goal: any) => void;
}

export default function ApprovalTable({
    goals,
    onApprove,
    onReject,
}: ApprovalTableProps) {

    const [editingGoalId, setEditingGoalId] =
        useState<string | null>(null);

    const [editedTarget, setEditedTarget] =
        useState("");

    const [editedWeightage, setEditedWeightage] =
        useState("");

    function formatTarget(goal: any) {

        switch (goal.uom_type) {

            case "percentage":

                return `${goal.target_value}%`;

            case "timeline":

                return `${goal.target_value} hrs`;

            case "zero_based":

                return goal.target_value === 1
                    ? "Completed"
                    : goal.target_value;

            default:

                return goal.target_value;
        }
    }

    function startEditing(goal: any) {

        setEditingGoalId(goal.id);

        setEditedTarget(
            String(goal.target_value)
        );

        setEditedWeightage(
            String(goal.weightage)
        );
    }

    async function saveChanges(
        goal: any
    ) {

        const newWeightage =
            Number(editedWeightage);

        if (newWeightage < 10) {

            toast.error(
                "Minimum weightage is 10%"
            );

            return;
        }

        const {
            data: employeeGoals,
        } =
            await getGoalsByEmployee(
                goal.employee_id
            );

        const totalWeightage =
            (employeeGoals || [])
                .reduce(
                    (sum, currentGoal) => {

                        if (
                            currentGoal.id === goal.id
                        ) {

                            return (
                                sum + newWeightage
                            );
                        }

                        return (
                            sum +
                            Number(
                                currentGoal.weightage
                            )
                        );

                    },
                    0
                );

        if (totalWeightage > 100) {

            toast.error(
                `Total weightage exceeds 100% (${totalWeightage}%)`
            );

            return;
        }

        const { error } =
            await updateGoalByManager(
                goal,
                {
                    target_value:
                        Number(editedTarget),

                    weightage:
                        newWeightage,
                }
            );

        if (error) {

            toast.error(error.message);

            return;
        }

        toast.success(
            "Goal updated successfully"
        );

        setEditingGoalId(null);

        window.location.reload();
    }

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-semibold">
                        Submitted Goals
                    </h2>

                    <p className="text-sm text-slate-500">
                        Review, calibrate and approve employee KPIs
                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="border-b bg-slate-50 text-left">

                            <th className="p-3 text-sm font-semibold">
                                Goal
                            </th>

                            <th className="p-3 text-sm font-semibold">
                                Thrust Area
                            </th>

                            <th className="p-3 text-sm font-semibold">
                                UOM
                            </th>

                            <th className="p-3 text-sm font-semibold">
                                Target
                            </th>

                            <th className="p-3 text-sm font-semibold">
                                Weightage
                            </th>

                            <th className="p-3 text-sm font-semibold">
                                Status
                            </th>

                            <th className="p-3 text-sm font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {goals.map((goal) => {

                            const isCompletedState =
                                goal.status === "approved" ||
                                goal.status === "rejected";

                            const isEditing =
                                editingGoalId === goal.id;

                            return (

                                <tr
                                    key={goal.id}
                                    className="border-b transition-colors hover:bg-slate-50"
                                >

                                    {/* Goal */}
                                    <td className="max-w-sm p-3 align-top">

                                        <div>

                                            <p className="font-medium text-slate-900">
                                                {goal.title}
                                            </p>

                                            {goal.description && (

                                                <p className="mt-1 truncate text-sm text-slate-500">
                                                    {goal.description}
                                                </p>

                                            )}

                                            {goal.rejection_comment && (

                                                <p className="mt-2 rounded bg-red-50 px-2 py-1 text-xs text-red-600">

                                                    Rejection:
                                                    {" "}

                                                    {
                                                        goal.rejection_comment
                                                    }

                                                </p>

                                            )}

                                        </div>

                                    </td>

                                    {/* Thrust */}
                                    <td className="p-3 align-top text-sm">
                                        {goal.thrust_area}
                                    </td>

                                    {/* UOM */}
                                    <td className="p-3 align-top text-sm capitalize">

                                        {goal.uom_type.replace(
                                            "_",
                                            " "
                                        )}

                                    </td>

                                    {/* Target */}
                                    <td className="p-3 align-top text-sm font-medium">

                                        {isEditing ? (

                                            <input
                                                type="number"
                                                value={editedTarget}
                                                onChange={(e) =>
                                                    setEditedTarget(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-24 rounded border p-2"
                                            />

                                        ) : (

                                            formatTarget(goal)

                                        )}

                                    </td>

                                    {/* Weightage */}
                                    <td className="p-3 align-top text-sm">

                                        {isEditing ? (

                                            <input
                                                type="number"
                                                value={editedWeightage}
                                                onChange={(e) =>
                                                    setEditedWeightage(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-20 rounded border p-2"
                                            />

                                        ) : (

                                            `${goal.weightage}%`

                                        )}

                                    </td>

                                    {/* Status */}
                                    <td className="p-3 align-top">

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize">

                                            {goal.status}

                                        </span>

                                    </td>

                                    {/* Actions */}
                                    <td className="p-3 align-top">

                                        <div className="flex flex-wrap gap-2">

                                            {!isCompletedState ? (

                                                <>

                                                    {isEditing ? (

                                                        <button
                                                            onClick={() =>
                                                                saveChanges(goal)
                                                            }
                                                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                                                        >
                                                            Save
                                                        </button>

                                                    ) : (

                                                        <button
                                                            onClick={() =>
                                                                startEditing(goal)
                                                            }
                                                            className="rounded bg-slate-700 px-3 py-1 text-sm text-white"
                                                        >
                                                            Edit
                                                        </button>

                                                    )}

                                                    <button
                                                        onClick={() =>
                                                            onApprove(goal)
                                                        }
                                                        className="rounded bg-green-600 px-3 py-1 text-sm text-white transition hover:bg-green-700"
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            onReject(goal)
                                                        }
                                                        className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
                                                    >
                                                        Reject
                                                    </button>

                                                </>

                                            ) : (

                                                <span className="text-xs text-slate-500">
                                                    Action completed
                                                </span>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

                {goals.length === 0 && (

                    <div className="py-10 text-center text-sm text-slate-500">
                        No submitted goals found.
                    </div>

                )}

            </div>

        </div>
    );
}