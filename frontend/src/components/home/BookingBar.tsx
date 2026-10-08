import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

// Floating glass booking bar — overlaps the hero bottom edge.
export function BookingBar() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 2), "yyyy-MM-dd"));
  const [guests, setGuests] = useState("2");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/booking?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const fieldLabel = "eyebrow text-gold-light/80";
  const fieldInput =
    "w-full bg-transparent pt-1 text-sm text-cream placeholder:text-cream/40 focus:outline-none [color-scheme:dark]";

  return (
    <div className="container-royal relative z-20 -mt-20 md:-mt-16" data-testid="booking-bar">
      <FadeUp delay={0.15}>
        <form
          onSubmit={submit}
          className="grid overflow-hidden border border-gold/25 bg-charcoal/90 shadow-2xl backdrop-blur-xl md:grid-cols-[1fr_1fr_1fr_auto]"
          aria-label="Check availability"
        >
          <label className="block border-b border-line-light px-6 py-4 transition-colors focus-within:bg-white/5 md:border-b-0 md:border-r">
            <span className={fieldLabel}>Check-in</span>
            <input
              type="date"
              required
              value={checkIn}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setCheckIn(e.target.value)}
              className={fieldInput}
              data-testid="booking-checkin"
              aria-label="Check-in date"
            />
          </label>
          <label className="block border-b border-line-light px-6 py-4 transition-colors focus-within:bg-white/5 md:border-b-0 md:border-r">
            <span className={fieldLabel}>Check-out</span>
            <input
              type="date"
              required
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className={fieldInput}
              data-testid="booking-checkout"
              aria-label="Check-out date"
            />
          </label>
          <label className="relative block border-b border-line-light px-6 py-4 transition-colors focus-within:bg-white/5 md:border-b-0 md:border-r">
            <span className={fieldLabel}>Guests</span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={`${fieldInput} appearance-none pr-6`}
              data-testid="booking-guests"
              aria-label="Number of guests"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="bg-charcoal">
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-5 right-5 h-4 w-4 text-gold" strokeWidth={1.5} />
          </label>
          <button
            type="submit"
            data-testid="booking-submit"
            className="group flex items-center justify-center gap-3 bg-gold px-8 py-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors duration-500 hover:bg-gold-light md:py-0"
          >
            Check availability
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </form>
      </FadeUp>
    </div>
  );
}
