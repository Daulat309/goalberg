interface GoalsTableProps {
    goals: any[];

    onDelete: (id: string) => void;

    onEdit: (goal: any) => void;
}

export default function GoalsTable({
    goals,
    onDelete,
    onEdit,
}: GoalsTableProps) {
    return (
        <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
                My Goals
            </h2>

            <table className="w-full">
                <thead>
                    <tr className="border-b text-left">
                        <th className="p-2">Title</th>
                        <th className="p-2">Target</th>
                        <th className="p-2">
                            Weightage
                        </th>
                        <th className="p-2">Status</th>
                        <th className="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {goals.map((goal) => (
                        <tr
                            key={goal.id}
                            className="border-b"
                        >
                            <td className="p-2">
                                <div>
                                    <p>{goal.title}</p>

                                    {goal.rejection_comment && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {goal.rejection_comment}
                                        </p>
                                    )}
                                </div>
                            </td>

                            <td className="p-2">
                                {goal.target_value}
                            </td>

                            <td className="p-2">
                                {goal.weightage}%
                            </td>

                            <td className="p-2 capitalize">
                                {goal.status}
                            </td>

                            <td className="p-2">
                                {!goal.is_locked &&
                                    goal.status !== "submitted" && (
                                        <>
                                            <button
                                                onClick={() => onEdit(goal)}
                                                className="mr-3 text-blue-500"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(goal.id)
                                                }
                                                className="text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}
