interface Props {
    metrics: any;
}

export default function CompletionDashboard({
    metrics,
}: Props) {

    return (

        <div className="grid grid-cols-4 gap-4">

            <div className="rounded-xl border bg-white p-6">

                <p className="text-sm text-slate-500">
                    Total Check-ins
                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {metrics.totalUpdates}

                </h2>

            </div>

            <div className="rounded-xl border bg-white p-6">

                <p className="text-sm text-slate-500">
                    Completed
                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {metrics.completed}

                </h2>

            </div>

            <div className="rounded-xl border bg-white p-6">

                <p className="text-sm text-slate-500">
                    Pending
                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {metrics.pending}

                </h2>

            </div>

            <div className="rounded-xl border bg-white p-6">

                <p className="text-sm text-slate-500">
                    Completion Rate
                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {metrics.completionRate}%

                </h2>

            </div>

        </div>
    );
}