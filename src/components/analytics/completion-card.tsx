interface CompletionCardProps {
    completed: number;

    total: number;

    rate: number;
}

export default function CompletionCard({
    completed,
    total,
    rate,
}: CompletionCardProps) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        Quarterly Check-in Completion
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        {rate}%
                    </h2>

                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">

                    {completed}/{total}

                </div>

            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                    className="h-full rounded-full bg-black transition-all"
                    style={{
                        width: `${rate}%`,
                    }}
                />

            </div>

            <p className="mt-3 text-sm text-slate-500">

                Completed quarterly KPI submissions across the organization.

            </p>

        </div>
    );
}