"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  return (

    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 text-white">

      <h1 className="text-7xl font-bold tracking-tight">
        Goalberg
      </h1>

      <p className="mt-5 max-w-2xl text-center text-lg text-slate-300">

        Enterprise Goal Setting &
        Performance Tracking Platform

      </p>

      <button
        onClick={() =>
          router.push("/login")
        }
        className="mt-10 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
      >
        Get Started
      </button>

    </main>
  );
}