"use client";

import { useEffect, useState }
    from "react";

import DashboardShell
    from "@/components/layout/dashboard-shell";

import { adminNav }
    from "@/lib/constants/navigation";

import AuditTable
    from "@/components/admin/audit-table";

import {
    getAuditLogs,
}
    from "@/services/audit.service";

export default function AuditPage() {

    const [logs, setLogs] =
        useState<any[]>([]);

    async function loadLogs() {

        const { data } =
            await getAuditLogs();

        setLogs(data || []);
    }

    useEffect(() => {
        loadLogs();
    }, []);

    return (

        <DashboardShell navItems={adminNav}>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Audit Trail
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Enterprise governance and system activity monitoring.
                    </p>

                </div>

                <AuditTable logs={logs} />

            </div>

        </DashboardShell>
    );
}