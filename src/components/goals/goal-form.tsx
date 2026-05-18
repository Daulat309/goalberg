"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    goalSchema,
    GoalFormData,
} from "@/lib/validations/goal.schema";

import {
    createGoal,
    updateGoal,
    getGoalsByEmployee,
} from "@/services/goal.service";


import { toast } from "sonner";

export default function GoalForm({
    onSuccess,
    editingGoal,
}: {
    onSuccess: () => void;
    editingGoal?: any;
}) {
    const EMPLOYEE_ID =
        "5d05e6b8-76a9-4a01-854e-93587cbeea4d";
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(goalSchema),

        defaultValues: editingGoal,
    });

    async function onSubmit(
        data: GoalFormData
    ) {

        const newWeightage =
            Number(data.weightage);

        if (newWeightage < 10) {

            toast.error(
                "Minimum weightage is 10%"
            );

            return;
        }

        const {
            data: employeeGoals,
        } =
            await getGoalsByEmployee(
                EMPLOYEE_ID
            );

        const totalWeightage =
            (employeeGoals || [])
                .reduce(
                    (
                        sum,
                        currentGoal
                    ) => {

                        if (
                            editingGoal &&
                            currentGoal.id ===
                            editingGoal.id
                        ) {

                            return (
                                sum +
                                newWeightage
                            );
                        }

                        return (
                            sum +
                            Number(
                                currentGoal.weightage
                            )
                        );

                    },
                    editingGoal
                        ? 0
                        : newWeightage
                );

        if (totalWeightage > 100) {

            toast.error(
                `Total weightage exceeds 100% (${totalWeightage}%)`
            );

            return;
        }

        let response;

        if (editingGoal) {

            response =
                await updateGoal(
                    editingGoal.id,
                    data
                );

        } else {

            response =
                await createGoal(data);
        }

        if (response.error) {

            toast.error(
                response.error.message
            );

            return;
        }

        toast.success(
            editingGoal
                ? "Goal updated"
                : "Goal created"
        );

        reset();

        onSuccess();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-xl border bg-white p-6"
        >
            <h2 className="text-xl font-semibold">
                Create Goal
            </h2>

            <input
                {...register("title")}
                placeholder="Goal Title"
                className="w-full rounded border p-3"
            />

            <textarea
                {...register("description")}
                placeholder="Description"
                className="w-full rounded border p-3"
            />

            <input
                {...register("thrust_area")}
                placeholder="Thrust Area"
                className="w-full rounded border p-3"
            />

            <select
                {...register("uom_type")}
                className="w-full rounded border p-3"
            >
                <option value="numeric">
                    Numeric
                </option>

                <option value="percentage">
                    Percentage
                </option>

                <option value="timeline">
                    Timeline
                </option>

                <option value="zero_based">
                    Zero Based
                </option>
            </select>

            <input
                type="number"
                {...register("target_value")}
                placeholder="Target Value"
                className="w-full rounded border p-3"
            />

            <div>
                <input
                    type="number"
                    {...register("weightage")}
                    placeholder="Weightage"
                    className="w-full rounded border p-3"
                />

                {errors.weightage && (
                    <p className="mt-1 text-sm text-red-500">
                        {String(errors.weightage.message)}
                    </p>
                )}
            </div>

            <button
                className="rounded bg-black px-4 py-2 text-white"
            >
                Create Goal
            </button>
        </form>
    );
}