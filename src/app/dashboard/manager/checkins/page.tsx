"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/dashboard-shell";

import { managerNav } from "@/lib/constants/navigation";

import ManagerCheckinsTable from "@/components/goals/manager-checkins-table";

import {
    getQuarterlyUpdates,
} from "@/services/goal.service";

export default function ManagerCheckinsPage() {

    const [updates, setUpdates] =
        useState<any[]>([]);

    async function loadUpdates() {

        const { data } =
            await getQuarterlyUpdates();

        setUpdates(data || []);
    }

    useEffect(() => {
        loadUpdates();
    }, []);

    return (

        <DashboardShell navItems={managerNav}>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Quarterly Check-ins
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Review employee quarterly achievements and provide structured managerial feedback.
                    </p>

                </div>

                <ManagerCheckinsTable
                    updates={updates}
                    onRefresh={loadUpdates}
                />

            </div>

        </DashboardShell>
    );
}