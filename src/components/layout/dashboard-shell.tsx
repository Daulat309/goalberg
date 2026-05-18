"use client";

import { useRouter } from "next/navigation";

import Sidebar from "./sidebar";
import Navbar from "./navbar";

interface DashboardShellProps {
    navItems: any[];
    children: React.ReactNode;
}

export default function DashboardShell({
    navItems,
    children,
}: DashboardShellProps) {

    const router = useRouter();

    return (

        <div className="flex min-h-screen bg-slate-50">

            <Sidebar items={navItems} />

            <div className="flex-1">

                <Navbar />

                <div className="flex items-center justify-end gap-2 border-b bg-white px-6 py-3">

                    <span className="text-sm text-slate-500">
                        Switch Journey
                    </span>

                    <button
                        onClick={() =>
                            router.push(
                                "/dashboard/employee/goals"
                            )
                        }
                        className="rounded-lg bg-slate-200 px-3 py-1 text-sm transition hover:bg-slate-300"
                    >
                        Employee
                    </button>

                    <button
                        onClick={() =>
                            router.push(
                                "/dashboard/manager/approvals"
                            )
                        }
                        className="rounded-lg bg-slate-200 px-3 py-1 text-sm transition hover:bg-slate-300"
                    >
                        Manager
                    </button>

                    <button
                        onClick={() =>
                            router.push(
                                "/dashboard/admin/analytics"
                            )
                        }
                        className="rounded-lg bg-slate-200 px-3 py-1 text-sm transition hover:bg-slate-300"
                    >
                        Admin
                    </button>

                </div>

                <main className="p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}