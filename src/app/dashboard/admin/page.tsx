import DashboardShell from "@/components/layout/dashboard-shell";
import { adminNav } from "@/lib/constants/navigation";

export default function AdminDashboard() {
    return (
        <DashboardShell navItems={adminNav}>
            <div>
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>
            </div>
        </DashboardShell>
    );
}
