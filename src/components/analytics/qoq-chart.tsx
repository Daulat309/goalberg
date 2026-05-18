"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function QoQChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="h-[350px] rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Quarterly Achievement Trend
      </h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="quarter" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}