"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/dashboard-shell";

import { managerNav } from "@/lib/constants/navigation";

import ApprovalTable from "@/components/goals/approval-table";

import RejectionDialog from "@/components/goals/rejection-dialog";

import {
    getSubmittedGoals,
    approveGoal,
    rejectGoal,
} from "@/services/goal.service";

import { toast } from "sonner";

export default function ManagerApprovalsPage() {

    const [goals, setGoals] = useState<
        any[]
    >([]);

    const [rejectingGoal, setRejectingGoal] =
        useState<any>(null);

    const [loadingGoalId, setLoadingGoalId] =
        useState<string | null>(null);

    async function loadGoals() {

        const { data, error } =
            await getSubmittedGoals();

        if (error) {
            toast.error(error.message);

            return;
        }

        setGoals(data || []);
    }

    async function handleApprove(
        goal: any
    ) {

        if (loadingGoalId) return;

        setLoadingGoalId(goal.id);

        const { error } =
            await approveGoal(goal);

        if (error) {

            toast.error(error.message);

            setLoadingGoalId(null);

            return;
        }

        toast.success(
            "Goal approved successfully"
        );

        await loadGoals();

        setLoadingGoalId(null);
    }

    async function handleReject(
        id: string,
        comment: string
    ) {

        const { error } =
            await rejectGoal(
                id,
                comment
            );

        if (error) {
            toast.error(error.message);

            return;
        }

        toast.success(
            "Goal rejected"
        );

        setRejectingGoal(null);

        await loadGoals();
    }

    useEffect(() => {
        loadGoals();
    }, []);

    return (
        <DashboardShell navItems={managerNav}>

            <ApprovalTable
                goals={goals}
                onApprove={handleApprove}
                onReject={setRejectingGoal}
            />

            <RejectionDialog
                goal={rejectingGoal}
                onSubmit={handleReject}
            />

        </DashboardShell>
    );
}