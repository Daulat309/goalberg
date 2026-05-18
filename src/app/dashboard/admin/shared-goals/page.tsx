"use client";

import DashboardShell from "@/components/layout/dashboard-shell";

import { adminNav } from "@/lib/constants/navigation";

import SharedGoalForm from "@/components/goals/shared-goal-form";

export default function SharedGoalsPage() {

    return (

        <DashboardShell navItems={adminNav}>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Shared Goals
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Create and distribute departmental KPIs across the organization.
                    </p>

                </div>

                <SharedGoalForm />

            </div>

        </DashboardShell>
    );
}