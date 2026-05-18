import Link from "next/link";

export default function SelectRolePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-4xl font-bold">Goalberg</h1>

            <div className="flex gap-4">
                <Link
                    href="/login?role=admin"
                    className="rounded-lg border px-6 py-3"
                >
                    Admin
                </Link>

                <Link
                    href="/login?role=manager"
                    className="rounded-lg border px-6 py-3"
                >
                    Manager
                </Link>

                <Link
                    href="/login?role=employee"
                    className="rounded-lg border px-6 py-3"
                >
                    Employee
                </Link>
            </div>
        </main>
    );
}
