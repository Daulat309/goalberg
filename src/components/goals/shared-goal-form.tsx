"use client";

import { useState } from "react";

import {
    createSharedGoal,
    assignSharedGoal,
} from "@/services/shared-goal.service";

import { toast } from "sonner";

const EMPLOYEES = [
  "5d05e6b8-76a9-4a01-854e-93587cbeea4d",
];

export default function SharedGoalForm() {

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [thrustArea, setThrustArea] =
        useState("");

    const [uomType, setUomType] =
        useState("numeric");

    const [targetValue, setTargetValue] =
        useState("");

    async function handleCreate() {

        const { data, error } =
            await createSharedGoal({
                title,

                description,

                thrust_area:
                    thrustArea,

                uom_type:
                    uomType,

                target_value:
                    Number(targetValue),
            });

        if (error || !data) {

            toast.error(
                error?.message ||
                "Failed to create shared goal"
            );

            return;
        }

        const assignments =
            EMPLOYEES.map(
                (employeeId) => ({
                    shared_goal_id:
                        data.id,

                    employee_id:
                        employeeId,

                    weightage: 10,
                })
            );

        await assignSharedGoal(
            assignments
        );

        toast.success(
            "Shared goal assigned successfully"
        );

        window.location.reload();
    }

    return (

        <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-4 text-xl font-semibold">
                Create Shared KPI
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <input
                    placeholder="Goal title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="rounded border p-3"
                />

                <input
                    placeholder="Thrust Area"
                    value={thrustArea}
                    onChange={(e) =>
                        setThrustArea(
                            e.target.value
                        )
                    }
                    className="rounded border p-3"
                />

                <select
                    value={uomType}
                    onChange={(e) =>
                        setUomType(
                            e.target.value
                        )
                    }
                    className="rounded border p-3"
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
                    placeholder="Target"
                    value={targetValue}
                    onChange={(e) =>
                        setTargetValue(
                            e.target.value
                        )
                    }
                    className="rounded border p-3"
                />

            </div>

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
                className="mt-4 w-full rounded border p-3"
            />

            <button
                onClick={handleCreate}
                className="mt-4 rounded bg-black px-4 py-2 text-white"
            >
                Create Shared Goal
            </button>

        </div>
    );
}