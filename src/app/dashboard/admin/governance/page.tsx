"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/dashboard-shell";

import { adminNav } from "@/lib/constants/navigation";

import AdminGovernanceTable from "@/components/goals/admin-governance-table";

import { getAnalyticsGoals } from "@/services/goal.service";

export default function GovernancePage() {

    const [goals, setGoals] =
        useState<any[]>([]);

    async function loadGoals() {

        const { data } =
            await getAnalyticsGoals();

        setGoals(data || []);
    }

    useEffect(() => {
        loadGoals();
    }, []);

    return (

        <DashboardShell navItems={adminNav}>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Governance Console
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Administrative override controls for organizational goals and approvals.
                    </p>

                </div>

                <AdminGovernanceTable
                    goals={goals}
                    onRefresh={loadGoals}
                />

            </div>

        </DashboardShell>
    );
}