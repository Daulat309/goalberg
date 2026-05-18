"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function PlannedVsActualChart({
    data,
}: {
    data: any[];
}) {

    return (

        <div className="h-[400px] rounded-xl border bg-white p-6">

            <h2 className="mb-4 text-xl font-semibold">
                Planned vs Actual Achievement
            </h2>

            <div className="h-[320px] w-full">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <XAxis dataKey="quarter" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="planned"
                            name="Planned"
                        />

                        <Bar
                            dataKey="actual"
                            name="Actual"
                        />

                    </BarChart>

                </ResponsiveContainer>
            </div>

        </div>
    );
}