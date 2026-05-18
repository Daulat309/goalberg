"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    function handleLogin() {

        const cleanEmail =
            email.trim().toLowerCase();

        const cleanPassword =
            password.trim();

        if (
            cleanEmail ===
            "employee@goalberg.com" &&
            cleanPassword ===
            "Employee@123"
        ) {

            router.push(
                "/dashboard/employee/goals"
            );

            return;
        }

        if (
            cleanEmail ===
            "manager@goalberg.com" &&
            cleanPassword ===
            "Manager@123"
        ) {

            router.push(
                "/dashboard/manager/approvals"
            );

            return;
        }

        if (
            cleanEmail ===
            "admin@goalberg.com" &&
            cleanPassword ===
            "Admin@123"
        ) {

            router.push(
                "/dashboard/admin/analytics"
            );

            return;
        }

        toast.error(
            "Invalid credentials"
        );
    }

    return (

        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">

            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

                <h1 className="text-center text-4xl font-bold text-white">
                    Goalberg
                </h1>

                <p className="mt-3 text-center text-slate-400">
                    Enterprise Login Portal
                </p>

                <div className="mt-8 space-y-5">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:scale-[1.02]"
                    >
                        Login
                    </button>

                </div>

                <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">

                    <p className="font-medium text-white">
                        Demo Credentials
                    </p>

                    <div className="mt-3 space-y-4 text-sm">

                        <div>
                            <p className="font-medium text-white">
                                Employee
                            </p>

                            <p>
                                Email:
                                employee@goalberg.com
                            </p>

                            <p>
                                Password:
                                Employee@123
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-white">
                                Manager
                            </p>

                            <p>
                                Email:
                                manager@goalberg.com
                            </p>

                            <p>
                                Password:
                                Manager@123
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-white">
                                Admin
                            </p>

                            <p>
                                Email:
                                admin@goalberg.com
                            </p>

                            <p>
                                Password:
                                Admin@123
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}
