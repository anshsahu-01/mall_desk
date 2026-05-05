"use client";

export function ImpactMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/32 p-5 backdrop-blur-md">
      <p className="mb-2 font-[family:var(--font-display)] text-4xl leading-none tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">{label}</p>
    </div>
  );
}
