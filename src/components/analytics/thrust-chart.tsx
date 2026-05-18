"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ThrustChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="h-[350px] rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Thrust Area Distribution
      </h2>

      <div className="h-[320px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}