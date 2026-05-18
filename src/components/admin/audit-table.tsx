interface Props {
    logs: any[];
}

export default function AuditTable({
    logs,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold">
                    Governance Audit Trail
                </h2>

                <p className="text-sm text-slate-500">
                    System-wide governance and workflow activity logs.
                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="border-b bg-slate-50 text-left">

                            <th className="p-3">
                                Entity
                            </th>

                            <th className="p-3">
                                Action
                            </th>

                            <th className="p-3">
                                Performed By
                            </th>

                            <th className="p-3">
                                Details
                            </th>

                            <th className="p-3">
                                Timestamp
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {logs.map((log) => (

                            <tr
                                key={log.id}
                                className="border-b"
                            >

                                <td className="p-3 capitalize">

                                    {
                                        log.entity_type
                                    }

                                </td>

                                <td className="p-3">

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">

                                        {log.action}

                                    </span>

                                </td>

                                <td className="p-3">

                                    {
                                        log.performed_by
                                    }

                                </td>

                                <td className="p-3 text-sm text-slate-600">

                                    {
                                        log.details
                                    }

                                </td>

                                <td className="p-3 text-sm text-slate-500">

                                    {
                                        new Date(
                                            log.created_at
                                        ).toLocaleString()
                                    }

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}