import DashboardShell from "@/components/layout/dashboard-shell";

import { employeeNav } from "@/lib/constants/navigation";

export default function EmployeeDashboard() {
    return (
        <DashboardShell navItems={employeeNav}>
            <div>
                <h1 className="text-3xl font-bold">
                    Employee Dashboard
                </h1>
            </div>
        </DashboardShell>
    );
}
