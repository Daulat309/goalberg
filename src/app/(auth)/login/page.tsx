"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/services/auth.service";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const supabase = createClient();

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const { data, error } = await signIn(email, password);

        if (error) {
            toast.error(error.message);
            return;
        }

        const authUser = data.user;

        const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("auth_id", authUser.id)
            .single();

        if (profileError || !profile) {
            toast.error("User profile not found");
            return;
        }

        toast.success("Login successful");

        if (profile.role === "admin") {
            router.push("/dashboard/admin");
        } else if (profile.role === "manager") {
            router.push("/dashboard/manager");
        } else {
            router.push("/dashboard/employee");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-xl border p-8 space-y-4">
                <h1 className="text-3xl font-bold">
                    Goalberg Login
                </h1>

                <input
                    className="w-full rounded border p-3"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full rounded border p-3"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full rounded bg-black text-white p-3"
                >
                    Login
                </button>
            </div>
        </main>
    );
}
