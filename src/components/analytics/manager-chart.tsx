"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function ManagerChart({
    data,
}: {
    data: any[];
}) {

    return (

        <div className="h-[350px] rounded-xl border bg-white p-6">

            <h2 className="mb-4 text-xl font-semibold">
                Manager Effectiveness
            </h2>

            <div className="h-[320px] w-full">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <XAxis dataKey="manager" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="total" />

                    </BarChart>

                </ResponsiveContainer>
            </div>

        </div>
    );
}