"use client";
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
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar items={navItems} />

            <div className="flex-1">
                <Navbar />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}