"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/dashboard-shell";

import { employeeNav } from "@/lib/constants/navigation";

import ProgressForm from "@/components/goals/progress-form";

import ProgressTable from "@/components/goals/progress-table";

import {
  getGoals,
  getQuarterlyUpdates,
} from "@/services/goal.service";

export default function CheckinsPage() {

  const [goals, setGoals] = useState<
    any[]
  >([]);

  const [updates, setUpdates] =
    useState<any[]>([]);

  const [selectedGoal, setSelectedGoal] =
    useState("");

  async function loadGoals() {

    const { data } =
      await getGoals();

    const approvedGoals =
      data?.filter(
        (goal) =>
          goal.status ===
          "approved"
      ) || [];

    setGoals(approvedGoals);

    if (approvedGoals.length) {
      setSelectedGoal(
        approvedGoals[0].id
      );
    }
  }

  async function loadUpdates(
    goalId: string
  ) {

    const { data } =
      await getQuarterlyUpdates(
        goalId
      );

    setUpdates(data || []);
  }

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    if (selectedGoal) {
      loadUpdates(selectedGoal);
    }
  }, [selectedGoal]);

  const selectedGoalData =
    goals.find(
      (goal) =>
        goal.id === selectedGoal
    );

  function formatAnnualTarget() {

    if (!selectedGoalData)
      return "";

    switch (
    selectedGoalData.uom_type
    ) {

      case "percentage":
        return `${selectedGoalData.target_value}%`;

      case "timeline":
        return `${selectedGoalData.target_value} hours`;

      case "zero_based":
        return `${selectedGoalData.target_value} completion`;

      default:
        return selectedGoalData.target_value;
    }
  }

  return (
    <DashboardShell navItems={employeeNav}>
      <div className="space-y-6">

        <div className="rounded-xl border bg-white p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Select Goal
          </h2>

          <select
            value={selectedGoal}
            onChange={(e) =>
              setSelectedGoal(
                e.target.value
              )
            }
            className="w-full rounded border p-3"
          >
            {goals.map((goal) => (
              <option
                key={goal.id}
                value={goal.id}
              >
                {goal.title}
              </option>
            ))}
          </select>

          {selectedGoalData && (

            <div className="mt-4 rounded-lg bg-slate-100 p-4">

              <p>
                <span className="font-medium">
                  Thrust Area:
                </span>
                {" "}
                {
                  selectedGoalData.thrust_area
                }
              </p>

              <p className="mt-1">
                <span className="font-medium">
                  UoM Type:
                </span>
                {" "}
                <span className="capitalize">
                  {selectedGoalData.uom_type.replace(
                    "_",
                    " "
                  )}
                </span>
              </p>

              <p className="mt-1">
                <span className="font-medium">
                  Annual Target:
                </span>
                {" "}
                {formatAnnualTarget()}
              </p>

            </div>
          )}
        </div>

        {selectedGoal && (
          <>
            <ProgressForm
              goalId={selectedGoal}
              onSuccess={() =>
                loadUpdates(
                  selectedGoal
                )
              }
            />

            <ProgressTable
              updates={updates}
            />
          </>
        )}

      </div>
    </DashboardShell>
  );
}