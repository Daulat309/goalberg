"use client";

import { useEffect, useState } from "react";

import { QUARTERS } from "@/lib/constants/quarters";
import { computeKPIScore }
  from "@/lib/helpers/kpi-score";
import {
  createQuarterlyUpdate,
  getQuarterPlan,
  getQuarterlySubmission,
} from "@/services/goal.service";

import { toast } from "sonner";

import { computeProgress } from "@/lib/helpers/progress";

export default function ProgressForm({
  goalId,
  onSuccess,
}: {
  goalId: string;

  onSuccess: () => void;
}) {

  const [quarter, setQuarter] =
    useState("Q1");

  const [actual, setActual] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [plannedTarget, setPlannedTarget] =
    useState<any>(null);

  const [alreadySubmitted, setAlreadySubmitted] =
    useState(false);

  async function loadPlan() {

    const { data, error } =
      await getQuarterPlan(
        goalId,
        quarter
      );

    if (error) {

      console.error(error);

      setPlannedTarget(null);

      return;
    }

    setPlannedTarget(data);
  }

  async function checkSubmission() {

    setAlreadySubmitted(false);

    const { data, error } =
      await getQuarterlySubmission(
        goalId,
        quarter
      );

    if (error) {

      console.error(error);

      return;
    }

    setAlreadySubmitted(!!data);
  }

  useEffect(() => {

    async function loadData() {

      await loadPlan();

      await checkSubmission();
    }

    if (goalId && quarter) {
      loadData();
    }

  }, [goalId, quarter]);

  async function handleSubmit() {

    if (alreadySubmitted) {

      toast.error(
        "Quarterly check-in already submitted"
      );

      return;
    }

    if (!plannedTarget) {

      toast.error(
        "Quarter plan not found"
      );

      return;
    }

    const planned =
      plannedTarget.planned_value || 0;

    const actualValue =
      Number(actual);

    const progress =
      computeProgress(
        actualValue,
        planned,
        plannedTarget.uom_type || "numeric"
      );

    const performanceScore =
      computeKPIScore(
        actualValue,
        planned,
        plannedTarget.uom_type
      );

    const { error } =
      await createQuarterlyUpdate({
        goal_id: goalId,

        quarter,

        actual_value:
          actualValue,

        performance_score:
          performanceScore,
        progress,

        employee_comment:
          comment,
      });

    if (error) {

      toast.error(error.message);

      return;
    }

    toast.success(
      "Quarterly update saved"
    );

    setAlreadySubmitted(true);

    setActual("");

    setComment("");

    onSuccess();
  }

  function formatTarget() {

    if (!plannedTarget) {
      return "No quarterly plan found";
    }

    switch (
    plannedTarget.uom_type
    ) {

      case "percentage":

        return `${plannedTarget.planned_value}%`;

      case "timeline":

        return `${plannedTarget.planned_value} hours`;

      case "zero_based":

        return `${plannedTarget.planned_value} completion`;

      default:

        return plannedTarget.planned_value;
    }
  }

  return (

    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-4 text-xl font-semibold">
        Quarterly Check-in
      </h2>

      <select
        value={quarter}
        onChange={(e) =>
          setQuarter(e.target.value)
        }
        className="mb-3 w-full rounded border p-3"
      >

        {QUARTERS.map((q) => (

          <option
            key={q}
            value={q}
          >
            {q}
          </option>

        ))}

      </select>

      <div className="mb-4 rounded-xl border bg-slate-50 p-4">

        <p className="text-sm text-slate-500">
          Auto-generated quarterly target
        </p>

        <p className="mt-2 text-2xl font-bold">
          {formatTarget()}
        </p>

        {plannedTarget?.uom_type && (

          <div className="mt-3 inline-flex rounded-full bg-slate-200 px-3 py-1 text-sm">

            KPI Type:
            {" "}

            <span className="ml-1 font-medium capitalize">

              {
                plannedTarget.uom_type.replace(
                  "_",
                  " "
                )
              }

            </span>

          </div>

        )}

      </div>

      <input
        type="number"
        placeholder="Actual Achievement"
        value={actual}
        onChange={(e) =>
          setActual(e.target.value)
        }
        disabled={alreadySubmitted}
        className="mb-3 w-full rounded border p-3 disabled:bg-slate-100"
      />

      <textarea
        placeholder="Progress comment"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        disabled={alreadySubmitted}
        className="mb-3 w-full rounded border p-3 disabled:bg-slate-100"
      />

      {alreadySubmitted && (

        <div className="mb-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">

          Quarterly check-in already submitted for this goal and quarter.

        </div>

      )}

      <button
        onClick={handleSubmit}
        disabled={alreadySubmitted}
        className={`rounded px-4 py-2 text-white ${alreadySubmitted
          ? "cursor-not-allowed bg-slate-400"
          : "bg-black"
          }`}
      >
        Save Update
      </button>

    </div>
  );
}