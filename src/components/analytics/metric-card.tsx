interface MetricCardProps {
  title: string;

  value: string | number;
}

export default function MetricCard({
  title,
  value,
}: MetricCardProps) {

  return (

    <div className="rounded-xl border bg-white p-6">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold tracking-tight">
        {value}
      </h2>

    </div>
  );
}