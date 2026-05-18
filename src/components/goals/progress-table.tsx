interface ProgressTableProps {
  updates: any[];
}

export default function ProgressTable({
  updates,
}: ProgressTableProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Quarterly Progress
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">
              Quarter
            </th>

            <th className="p-2">
              Planned
            </th>

            <th className="p-2">
              Actual
            </th>

            <th className="p-2">
              Progress
            </th>
          </tr>
        </thead>

        <tbody>
          {updates.map((update) => (
            <tr
              key={update.id}
              className="border-b"
            >
              <td className="p-2">
                {update.quarter}
              </td>

              <td className="p-2">
                {
                  update.planned_value
                }
              </td>

              <td className="p-2">
                {
                  update.actual_value
                }
              </td>

              <td className="p-2 capitalize">
                {update.progress}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}