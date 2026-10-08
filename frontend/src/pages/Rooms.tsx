import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Maximize2, Users } from "lucide-react";
import { rooms, roomTypes, capacities, priceBands, type Room } from "@/data/rooms";
import { useCurrency, formatMoney } from "@/lib/currency";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeader } from "@/components/shared/SectionHeader";

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <FadeUp delay={(index % 2) * 0.12}>
      <Link
        to={`/rooms/${room.slug}`}
        data-testid={`rooms-card-${room.slug}`}
        data-cursor-label="View"
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
          <img
            src={room.image}
            alt={room.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          {room.tag && (
            <span className="absolute left-4 top-4 bg-charcoal/85 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.25em] text-gold-light backdrop-blur">
              {room.tag}
            </span>
          )}
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-cream text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </div>
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-sand">{room.type}</p>
            <h2 className="h-card mt-2">{room.name}</h2>
            <p className="mt-3 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.18em] text-sand">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="h-3 w-3" strokeWidth={1.5} /> {room.size} m²
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3 w-3" strokeWidth={1.5} /> {room.capacity} guests
              </span>
            </p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block text-[0.58rem] uppercase tracking-[0.2em] text-sand">From</span>
            <span className="font-heading text-xl text-gold-deep">{formatMoney(room.price, useCurrency())}</span>
          </p>
        </div>
      </Link>
    </FadeUp>
  );
}

const selectCls =
  "appearance-none border border-line bg-transparent py-2.5 pl-4 pr-9 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink focus:border-gold focus:outline-none";

// Rooms & Suites listing: type pills + capacity & price selects, animated grid.
export default function Rooms() {
  const [type, setType] = useState<(typeof roomTypes)[number]>("All");
  const [capacity, setCapacity] = useState("Any");
  const [band, setBand] = useState(0);

  const filtered = useMemo(
    () =>
      rooms.filter((r) => {
        if (type !== "All" && r.type !== type) return false;
        if (capacity !== "Any" && r.capacity < Number(capacity)) return false;
        const b = priceBands[band];
        return r.price >= b.min && r.price < b.max;
      }),
    [type, capacity, band]
  );

  return (
    <>
      <PageHero
        eyebrow="Stay"
        titleLines={["Rooms,", <em key="r" className="italic text-gold-light">suites &amp; residences</em>]}
        subcopy="Forty-two keys, no two alike — every one with plaster walls, linen sheets and a window worth framing."
        image="https://images.unsplash.com/photo-1776763018972-588e27bf6511?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="A king suite in soft evening lamplight"
      />

      <section className="section-pad bg-ivory" data-testid="rooms-listing">
        <div className="container-royal">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-line py-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by room type">
              {roomTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  data-testid={`filter-type-${t.toLowerCase()}`}
                  onClick={() => setType(t)}
                  className={`rounded-full border px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    type === t
                      ? "border-gold bg-gold text-charcoal"
                      : "border-line text-ink/60 hover:border-gold hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative">
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className={selectCls}
                data-testid="filter-capacity"
                aria-label="Filter by capacity"
              >
                {capacities.map((c) => (
                  <option key={c} value={c}>
                    {c === "Any" ? "Any party size" : `${c}+ guests`}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold-deep" strokeWidth={1.5} />
            </div>
            <div className="relative">
              <select
                value={band}
                onChange={(e) => setBand(Number(e.target.value))}
                className={selectCls}
                data-testid="filter-price"
                aria-label="Filter by price"
              >
                {priceBands.map((b, i) => (
                  <option key={b.label} value={i}>
                    {b.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold-deep" strokeWidth={1.5} />
            </div>
            <p className="ml-auto text-[0.65rem] uppercase tracking-[0.2em] text-sand" data-testid="rooms-count">
              {filtered.length} of {rooms.length} stays
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {filtered.map((room, i) => (
                <RoomCard key={room.slug} room={room} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-14 border border-line p-14 text-center" data-testid="rooms-empty">
              <p className="font-heading text-2xl italic text-ink/70">No rooms match that combination</p>
              <button
                type="button"
                data-testid="filters-reset"
                onClick={() => {
                  setType("All");
                  setCapacity("Any");
                  setBand(0);
                }}
                className="mt-6 border border-ink/30 px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:text-gold-deep"
              >
                Clear filters
              </button>
            </div>
          )}

          <FadeUp className="mt-20 border-t border-line pt-10 text-center">
            <SectionHeader
              eyebrow="Undecided?"
              lines={["Let us choose", <em key="u" className="italic text-gold-deep">for you</em>]}
              className="mx-auto max-w-xl [&_h2]:text-center [&_p]:justify-center"
            />
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/65">
              Call the reservations desk and describe your mornings — we will match
              you to the right room in one conversation.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
