"use client";

import { toast } from "sonner";

import { validateGoalLimits } from "@/lib/helpers/goal-validation";

import { submitGoals } from "@/services/goal.service";

export default function SubmissionPanel({
    goals,
    employeeId,
    onSuccess,
}: {
    goals: any[];
    employeeId: string;
    onSuccess: () => void;
}) {
    async function handleSubmit() {
        const validation =
            validateGoalLimits(goals);

        if (!validation.valid) {
            toast.error(
                validation.message
            );

            return;
        }

        const { error } =
            await submitGoals(employeeId);

        if (error) {
            toast.error(error.message);

            return;
        }

        toast.success(
            "Goals submitted successfully"
        );

        onSuccess();
    }

    const totalWeightage = goals.reduce(
        (sum, goal) =>
            sum + goal.weightage,
        0
    );

    // ===== WORKFLOW STATE LOGIC =====

    const hasDraftGoals = goals.some(
        (goal) => goal.status === "draft"
    );

    const hasRejectedGoals = goals.some(
        (goal) =>
            goal.status === "rejected"
    );

    const shouldShowSubmission =
        hasDraftGoals || hasRejectedGoals;

    // Hide panel completely
    if (!shouldShowSubmission) {
        return null;
    }

    return (
        <div className="rounded-xl border bg-white p-6">
            <h2 className="text-xl font-semibold">
                Submission Summary
            </h2>

            <div className="mt-4 space-y-2">
                <p>
                    Total Goals: {goals.length}
                </p>

                <p>
                    Total Weightage:{" "}
                    {totalWeightage}%
                </p>
            </div>

            <button
                onClick={handleSubmit}
                className="mt-4 rounded bg-black px-4 py-2 text-white"
            >
                {hasRejectedGoals
                    ? "Resubmit Goal Sheet"
                    : "Submit Goal Sheet"}
            </button>
        </div>
    );
}