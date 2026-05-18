"use client";

import { signOut } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
    const router = useRouter();

    async function handleLogout() {
        await signOut();

        toast.success("Logged out");

        router.push("/select-role");
    }

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <h2 className="text-lg font-semibold">
                Dashboard
            </h2>

            <button
                onClick={handleLogout}
                className="rounded-lg border px-4 py-2 text-sm"
            >
                Logout
            </button>
        </header>
    );
}