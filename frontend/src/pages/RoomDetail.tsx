import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Coffee,
  ConciergeBell,
  Maximize2,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { rooms } from "@/data/rooms";
import { site } from "@/config/site.js";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Lightbox } from "@/components/shared/Lightbox";
import { PillButton } from "@/components/motion/MagneticButton";
import { fieldThemes } from "@/components/shared/FormBits";
import { useCurrency, formatMoney } from "@/lib/currency";
import NotFound from "@/pages/NotFound";

const amenityIcons = [Waves, BedDouble, Bath, Coffee, Sparkles, ConciergeBell];

// Room detail: gallery with lightbox, amenity icons, sticky booking card.
export default function RoomDetail() {
  const { slug } = useParams();
  const room = rooms.find((r) => r.slug === slug);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 2), "yyyy-MM-dd"));
  const [guests, setGuests] = useState("2");

  const similar = useMemo(
    () => (room ? rooms.filter((r) => r.slug !== room.slug).slice(0, 3) : []),
    [room]
  );

  if (!room) return <NotFound />;

  const bookHref = `/booking?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
  const inputCls = fieldThemes.light.input + " [color-scheme:light]";

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-charcoal text-cream">
        <img
          src={room.gallery[0].src}
          alt={room.gallery[0].alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0.2) 45%, rgba(18,18,18,0.82) 100%)",
          }}
        />
        <div className="container-royal relative z-10 pb-14 pt-40">
          <FadeUp>
            <Link
              to="/rooms"
              data-testid="room-back-link"
              className="mb-8 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cream/70 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All rooms
            </Link>
            <p className="eyebrow flex items-center gap-4 text-gold-light">
              <span className="h-px w-10 bg-gold" /> {room.type} · {room.view}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="h-display mt-4 max-w-4xl">{room.name}</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-5 flex flex-wrap items-center gap-5 text-[0.65rem] uppercase tracking-[0.2em] text-cream/70">
              <span className="flex items-center gap-1.5"><Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} /> {room.size} m²</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" strokeWidth={1.5} /> Up to {room.capacity} guests</span>
              <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" strokeWidth={1.5} /> {room.bed}</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <section className="section-pad bg-ivory" data-testid="room-detail">
        <div className="container-royal grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FadeUp>
              <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
                {room.description}
              </p>
            </FadeUp>

            {/* Gallery */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {room.gallery.map((img, i) => (
                <FadeUp key={img.src} delay={i * 0.1} className={i === 0 ? "col-span-2" : ""}>
                  <button
                    type="button"
                    data-testid={`room-gallery-${i}`}
                    data-cursor-label="View"
                    onClick={() => setLightbox(i)}
                    className={`group block w-full overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                    aria-label={`Open image: ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </button>
                </FadeUp>
              ))}
            </div>

            {/* Amenities */}
            <FadeUp className="mt-14">
              <h2 className="eyebrow text-gold-deep">In the room</h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3">
                {room.amenities.map((a, i) => {
                  const Icon = amenityIcons[i % amenityIcons.length];
                  return (
                    <li key={a} className="flex items-center gap-3 text-sm text-ink/75">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-gold-deep">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      {a}
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:col-span-4">
            <FadeUp delay={0.15} className="lg:sticky lg:top-28">
              <div className="border border-line bg-white p-7 shadow-[0_24px_60px_-30px_rgba(26,26,26,0.25)]" data-testid="room-book-card">
                <p className="flex items-baseline justify-between">
                  <span className="eyebrow text-sand">From</span>
                  <span>
                    <span className="font-heading text-4xl text-ink">{formatMoney(room.price, useCurrency())}</span>
                    <span className="text-xs text-sand"> / night</span>
                  </span>
                </p>
                <div className="mt-6 space-y-5">
                  <label className="block">
                    <span className={fieldThemes.light.label}>Check-in</span>
                    <input type="date" value={checkIn} min={format(new Date(), "yyyy-MM-dd")} onChange={(e) => setCheckIn(e.target.value)} className={inputCls} data-testid="room-checkin" />
                  </label>
                  <label className="block">
                    <span className={fieldThemes.light.label}>Check-out</span>
                    <input type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className={inputCls} data-testid="room-checkout" />
                  </label>
                  <label className="block">
                    <span className={fieldThemes.light.label}>Guests</span>
                    <select value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls} data-testid="room-guests">
                      {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <PillButton href={bookHref} variant="dark" testId="room-reserve-button" className="mt-7 w-full justify-center" magnetic={false}>
                  Reserve this {room.type.toLowerCase()}
                </PillButton>
                <p className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.18em] text-sand">
                  Best rate when you book direct
                </p>
                <p className="mt-5 border-t border-line pt-5 text-center text-xs text-ink/60">
                  Prefer to talk?{" "}
                  <a href={`tel:${site.contact.phoneHref}`} className="text-gold-deep underline-offset-4 hover:underline">
                    {site.contact.phone}
                  </a>
                </p>
              </div>
            </FadeUp>
          </aside>
        </div>

        {/* Similar rooms */}
        <div className="container-royal mt-24 border-t border-line pt-16">
          <div className="flex items-end justify-between">
            <SectionHeader eyebrow="Continue browsing" lines={["Similar", <em key="s" className="italic text-gold-deep">stays</em>]} />
            <Link to="/rooms" className="group hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] md:inline-flex" data-testid="similar-view-all">
              <span className="link-draw">All rooms</span>
              <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {similar.map((r, i) => (
              <FadeUp key={r.slug} delay={i * 0.1}>
                <Link to={`/rooms/${r.slug}`} data-testid={`similar-room-${r.slug}`} data-cursor-label="View" className="group block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={r.image} alt={r.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]" />
                  </div>
                  <h3 className="h-card mt-4">{r.name}</h3>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-sand">
                    From {formatMoney(r.price, useCurrency())} · {r.size} m²
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        items={room.gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
        layoutPrefix={`room-${room.slug}`}
      />
    </>
  );
}
