"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/dashboard-shell";

import { adminNav } from "@/lib/constants/navigation";

import MetricCard from "@/components/analytics/metric-card";

import StatusChart from "@/components/analytics/status-chart";

import ThrustChart from "@/components/analytics/thrust-chart";

import QoQChart from "@/components/analytics/qoq-chart";

import PlannedVsActualChart from "@/components/analytics/planned-vs-actual-chart";

import CompletionCard from "@/components/analytics/completion-card";

import ManagerChart from "@/components/analytics/manager-chart";

import {
  getAnalyticsGoals,
  getAllQuarterlyPlans,
  getAllQuarterlyUpdates,
  getAllCheckins,
} from "@/services/goal.service";

import { exportGoalsCSV } from "@/lib/helpers/export-csv";

import {
  getStatusDistribution,
  getThrustDistribution,
  getQuarterlyTrend,
  getPlannedVsActual,
  getCompletionDashboard,
  getManagerCheckinStats,
  getOrganizationScore,
} from "@/lib/helpers/analytics";

export default function AdminAnalyticsPage() {

  const [goals, setGoals] =
    useState<any[]>([]);

  const [plans, setPlans] =
    useState<any[]>([]);

  const [updates, setUpdates] =
    useState<any[]>([]);

  const [checkins, setCheckins] =
    useState<any[]>([]);

  async function loadData() {

    const {
      data: goalsData,
    } = await getAnalyticsGoals();

    const {
      data: plansData,
    } =
      await getAllQuarterlyPlans();

    const {
      data: updatesData,
    } =
      await getAllQuarterlyUpdates();

    const {
      data: checkinsData,
    } =
      await getAllCheckins();

    setGoals(goalsData || []);

    setPlans(plansData || []);

    setUpdates(updatesData || []);

    setCheckins(checkinsData || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  const statusData =
    getStatusDistribution(goals);

  const thrustData =
    getThrustDistribution(goals);

  const qoqData =
    getQuarterlyTrend(updates);

  const plannedVsActualData =
    getPlannedVsActual(
      plans,
      updates
    );

  const completionData =
    getCompletionDashboard(
      plans,
      updates
    );

  const managerData =
    getManagerCheckinStats(
      checkins
    );

  const organizationScore =
    getOrganizationScore(
      plans,
      updates
    );

  return (

    <DashboardShell navItems={adminNav}>

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Executive Analytics
            </h1>

            <p className="max-w-3xl text-slate-500">
              Real-time executive insights into organizational KPI achievement,
              quarterly check-in completion, goal distribution, and manager effectiveness.
            </p>

          </div>

          <button
            onClick={() =>
              exportGoalsCSV(goals)
            }
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Export CSV
          </button>

        </div>

        <div className="grid grid-cols-5 gap-4">

          <MetricCard
            title="Total Goals"
            value={goals.length}
          />

          <MetricCard
            title="Approved Goals"
            value={
              goals.filter(
                (g) =>
                  g.status ===
                  "approved"
              ).length
            }
          />

          <MetricCard
            title="Pending Reviews"
            value={
              goals.filter(
                (g) =>
                  g.status ===
                  "submitted"
              ).length
            }
          />

          <MetricCard
            title="Rejected Goals"
            value={
              goals.filter(
                (g) =>
                  g.status ===
                  "rejected"
              ).length
            }
          />

          <MetricCard
            title="Org KPI Score"
            value={`${organizationScore}%`}
          />

        </div>

        <div className="grid grid-cols-3 gap-6">

          <CompletionCard
            completed={
              completionData.completed
            }
            total={
              completionData.total
            }
            rate={
              completionData.completionRate
            }
          />

          <StatusChart
            data={statusData}
          />

          <ThrustChart
            data={thrustData}
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <QoQChart
            data={qoqData}
          />

          <ManagerChart
            data={managerData}
          />

        </div>

        <PlannedVsActualChart
          data={
            plannedVsActualData
          }
        />

      </div>

    </DashboardShell>
  );
}