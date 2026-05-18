import DashboardShell from "@/components/layout/dashboard-shell";
import { managerNav } from "@/lib/constants/navigation";

export default function ManagerDashboard() {
    return (
        <DashboardShell navItems={managerNav}>
            <div>
                <h1 className="text-3xl font-bold">
                    Manager Dashboard
                </h1>
            </div>
        </DashboardShell>
    );
}
