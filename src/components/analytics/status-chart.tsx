"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatusChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="h-[350px] rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Goal Status Distribution
      </h2>

      <div className="h-[320px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}