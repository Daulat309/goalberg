"use client";

import {
    LayoutDashboard,
    Target,
    ClipboardCheck,
    BarChart3,
    Users,
    Shield,
} from "lucide-react";

export const employeeNav = [
    {
        title: "Dashboard",
        href: "/dashboard/employee",
        icon: LayoutDashboard,
    },
    {
        title: "Goals",
        href: "/dashboard/employee/goals",
        icon: Target,
    },
    {
        title: "Check-ins",
        href: "/dashboard/employee/checkins",
        icon: ClipboardCheck,
    },
];

export const managerNav = [
    {
        title: "Dashboard",
        href: "/dashboard/manager",
        icon: LayoutDashboard,
    },
    {
        title: "Approvals",
        href: "/dashboard/manager/approvals",
        icon: ClipboardCheck,
    },
    {
        title: "Check-ins",
        href: "/dashboard/manager/checkins",
        icon: ClipboardCheck,
    },
    {
        title: "Analytics",
        href: "/dashboard/manager/analytics",
        icon: BarChart3,
    },
];

export const adminNav = [
    {
        title: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
    },
    {
        title: "Analytics",
        href: "/dashboard/admin/analytics",
        icon: BarChart3,
    },
    {
        title: "Audit Logs",
        href: "/dashboard/admin/audit",
        icon: Shield,
    },
    {
        title: "Governance",
        href: "/dashboard/admin/governance",
        icon: Shield,
    },
    {
        title: "Shared Goals",
        href: "/dashboard/admin/shared-goals",
        icon: Target,
    },
];