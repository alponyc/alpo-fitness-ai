const MacroRing = ({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) => {
  const radius = 36;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={stroke}
        />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          className="transition-all duration-1000 ease-out"
        />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-sm font-bold">
          {value}{unit}
        </text>
      </svg>
      <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
};

export default MacroRing;
