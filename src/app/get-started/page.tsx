"use client";

import { useRouter } from "next/navigation";

export default function GetStartedPage() {

    const router = useRouter();

    return (

        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-white">

            <h1 className="mb-3 text-5xl font-bold">
                Choose Your Role
            </h1>

            <p className="mb-10 text-slate-400">
                Explore Goalberg workflows
            </p>

            <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">

                <button
                    onClick={() =>
                        router.push(
                            "/dashboard/employee/goals"
                        )
                    }
                    className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-left transition hover:border-blue-500 hover:bg-slate-800"
                >
                    <h2 className="text-2xl font-semibold">
                        Employee
                    </h2>

                    <p className="mt-3 text-sm text-slate-400">
                        Create goals, track quarterly achievements, and manage KPIs.
                    </p>
                </button>

                <button
                    onClick={() =>
                        router.push(
                            "/dashboard/manager/approvals"
                        )
                    }
                    className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-left transition hover:border-purple-500 hover:bg-slate-800"
                >
                    <h2 className="text-2xl font-semibold">
                        Manager
                    </h2>

                    <p className="mt-3 text-sm text-slate-400">
                        Approve goals, review progress, and monitor team performance.
                    </p>
                </button>

                <button
                    onClick={() =>
                        router.push(
                            "/dashboard/admin/analytics"
                        )
                    }
                    className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-left transition hover:border-emerald-500 hover:bg-slate-800"
                >
                    <h2 className="text-2xl font-semibold">
                        Admin / HR
                    </h2>

                    <p className="mt-3 text-sm text-slate-400">
                        Monitor governance, analytics, and enterprise KPI tracking.
                    </p>
                </button>

            </div>

        </main>
    );
}