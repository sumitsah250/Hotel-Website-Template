// Slow infinite editorial marquee — duplicate track, CSS-driven.
interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={`overflow-hidden border-y border-line py-6 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-heading text-2xl md:text-3xl italic text-ink/70 whitespace-nowrap">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
