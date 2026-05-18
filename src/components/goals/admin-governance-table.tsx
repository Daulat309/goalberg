"use client";

import { reopenGoal } from "@/services/goal.service";

import { toast } from "sonner";

interface GovernanceTableProps {
    goals: any[];

    onRefresh: () => void;
}

export default function AdminGovernanceTable({
    goals,
    onRefresh,
}: GovernanceTableProps) {

    async function handleReopen(
        goalId: string
    ) {

        const { error } =
            await reopenGoal(goalId);

        if (error) {

            toast.error(error.message);

            return;
        }

        toast.success(
            "Goal reopened successfully"
        );

        onRefresh();
    }

    const governedGoals =
        goals.filter(
            (goal) =>
                goal.status ===
                "approved"
        );

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">
                    Goal Governance
                </h2>

                <p className="text-sm text-slate-500">
                    Administrative control over locked organizational KPIs
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
                                Employee
                            </th>

                            <th className="p-3">
                                Manager
                            </th>

                            <th className="p-3">
                                Status
                            </th>

                            <th className="p-3">
                                Locked
                            </th>

                            <th className="p-3">
                                Governance Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {governedGoals.map(
                            (goal) => (

                                <tr
                                    key={goal.id}
                                    className="border-b"
                                >

                                    {/* Goal */}
                                    <td className="p-3">

                                        <div>

                                            <p className="font-medium">
                                                {goal.title}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">

                                                Enterprise KPI governance workflow

                                            </p>

                                        </div>

                                    </td>

                                    {/* Employee */}
                                    <td className="p-3">

                                        Employee User

                                    </td>

                                    {/* Manager */}
                                    <td className="p-3">
                                        {goal.manager_name || "Manager User"}
                                    </td>

                                    {/* Status */}
                                    <td className="p-3 capitalize">

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                                            {goal.status}

                                        </span>

                                    </td>

                                    {/* Locked */}
                                    <td className="p-3">

                                        {goal.is_locked ? (

                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">

                                                Locked

                                            </span>

                                        ) : (

                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">

                                                Reopened

                                            </span>

                                        )}

                                    </td>

                                    {/* Actions */}
                                    <td className="p-3">

                                        {goal.is_locked ? (

                                            <button
                                                onClick={() =>
                                                    handleReopen(
                                                        goal.id
                                                    )
                                                }
                                                className="rounded bg-black px-3 py-1 text-sm text-white"
                                            >
                                                Reopen Goal
                                            </button>

                                        ) : (

                                            <span className="text-sm text-slate-500">

                                                Active editing workflow

                                            </span>

                                        )}

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

                {governedGoals.length === 0 && (

                    <div className="py-10 text-center text-sm text-slate-500">

                        No approved organizational KPIs currently under governance.

                    </div>

                )}

            </div>

        </div>
    );
}