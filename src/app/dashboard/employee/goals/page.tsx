"use client";

import { useEffect, useState } from "react";
import SubmissionPanel from "@/components/goals/submission-panel";
import DashboardShell from "@/components/layout/dashboard-shell";

import { employeeNav } from "@/lib/constants/navigation";

import GoalForm from "@/components/goals/goal-form";

import GoalsTable from "@/components/goals/goals-table";
import SharedGoalsTable from "@/components/goals/shared-goals-table";

import { getEmployeeSharedGoals } from "@/services/shared-goal.service";
import {
    getGoals,
    deleteGoal,
} from "@/services/goal.service";


export default function GoalsPage() {
    const [goals, setGoals] = useState<any[]>([]);
    const [sharedGoals, setSharedGoals] =
        useState<any[]>([]);
    const employeeId =
        "5d05e6b8-76a9-4a01-854e-93587cbeea4d";

    const hasWorkflowStarted =
        goals.some(
            (goal) =>
                goal.status === "submitted" ||
                goal.status === "approved" ||
                goal.status === "rejected"
        );
    const [editingGoal, setEditingGoal] =
        useState<any>(null);
    async function loadGoals() {

        const { data } =
            await getGoals();

        const {
            data: sharedData,
        } =
            await getEmployeeSharedGoals(
                employeeId
            );

        setGoals(data || []);

        setSharedGoals(
            sharedData || []
        );
    }

    async function handleDelete(id: string) {
        await deleteGoal(id);

        loadGoals();
    }

    useEffect(() => {
        loadGoals();
    }, []);

    return (
        <DashboardShell navItems={employeeNav}>
            <div className="space-y-6">
                {(!hasWorkflowStarted ||
                    editingGoal) && (
                        <GoalForm
                            onSuccess={() => {
                                loadGoals();
                                setEditingGoal(null);
                            }}
                            editingGoal={editingGoal}
                        />
                    )}

                <GoalsTable
                    goals={goals}
                    onDelete={handleDelete}
                    onEdit={setEditingGoal}
                />
                <SharedGoalsTable
                    goals={sharedGoals}
                />
            </div>
            <SubmissionPanel
                goals={goals}
                employeeId={employeeId}
                onSuccess={loadGoals}
            />

        </DashboardShell>
    );
}