"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/dashboard-shell";

import { managerNav } from "@/lib/constants/navigation";

import MetricCard from "@/components/analytics/metric-card";

import QoQChart from "@/components/analytics/qoq-chart";

import {
    getQuarterlyUpdates,
} from "@/services/goal.service";

export default function ManagerAnalyticsPage() {

    const [updates, setUpdates] =
        useState<any[]>([]);

    async function loadData() {

        const { data } =
            await getQuarterlyUpdates();

        setUpdates(data || []);
    }

    useEffect(() => {
        loadData();
    }, []);

    const avgPerformance =
        updates.length > 0
            ? Math.round(
                updates.reduce(
                    (acc, item) =>
                        acc +
                        (item.performance_score || 0),
                    0
                ) / updates.length
            )
            : 0;

    const completedGoals =
        updates.filter(
            (u) =>
                u.progress ===
                "completed"
        ).length;

    const onTrackGoals =
        updates.filter(
            (u) =>
                u.progress ===
                "on_track"
        ).length;

    const qoqData = [
        "Q1",
        "Q2",
        "Q3",
        "Q4",
    ].map((quarter) => {

        const quarterUpdates =
            updates.filter(
                (u) =>
                    u.quarter === quarter
            );

        const avg =
            quarterUpdates.length > 0
                ? Math.round(
                    quarterUpdates.reduce(
                        (acc, item) =>
                            acc +
                            (item.performance_score || 0),
                        0
                    ) /
                    quarterUpdates.length
                )
                : 0;

        return {
            quarter,
            value: avg,
        };
    });

    return (

        <DashboardShell navItems={managerNav}>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Team Performance Analytics
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Quarterly performance intelligence for managerial review.
                    </p>

                </div>

                <div className="grid grid-cols-3 gap-4">

                    <MetricCard
                        title="Avg KPI Score"
                        value={`${avgPerformance}%`}
                    />

                    <MetricCard
                        title="Completed Goals"
                        value={completedGoals}
                    />

                    <MetricCard
                        title="On Track Goals"
                        value={onTrackGoals}
                    />

                </div>

                <QoQChart
                    data={qoqData}
                />

            </div>

        </DashboardShell>
    );
}