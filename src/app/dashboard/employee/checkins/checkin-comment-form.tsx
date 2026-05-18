"use client";

import { useState } from "react";

import { createCheckin } from "@/services/goal.service";

import { toast } from "sonner";

export default function CheckinCommentForm({
  employeeId,
  managerId,
}: {
  employeeId: string;

  managerId: string;
}) {
  const [quarter, setQuarter] =
    useState("Q1");

  const [comment, setComment] =
    useState("");

  async function handleSubmit() {
    const { error } =
      await createCheckin({
        employee_id:
          employeeId,

        manager_id:
          managerId,

        quarter,

        comment,
      });

    if (error) {
      toast.error(error.message);

      return;
    }

    toast.success(
      "Check-in comment added"
    );

    setComment("");
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Manager Check-in
      </h2>

      <select
        value={quarter}
        onChange={(e) =>
          setQuarter(e.target.value)
        }
        className="mb-3 w-full rounded border p-3"
      >
        <option value="Q1">
          Q1
        </option>

        <option value="Q2">
          Q2
        </option>

        <option value="Q3">
          Q3
        </option>

        <option value="Q4">
          Q4
        </option>
      </select>

      <textarea
        placeholder="Manager feedback"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        className="mb-3 w-full rounded border p-3"
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Save Comment
      </button>
    </div>
  );
}