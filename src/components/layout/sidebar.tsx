"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
    items: {
        title: string;
        href: string;
        icon: any;
    }[];
}

export default function Sidebar({
    items,
}: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r bg-white h-screen p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    Goalberg
                </h1>
            </div>

            <nav className="space-y-2">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                pathname === item.href
                                    ? "bg-black text-white"
                                    : "hover:bg-slate-100"
                            )}
                        >
                            <Icon size={18} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}