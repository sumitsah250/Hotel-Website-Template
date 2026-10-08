import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { rooms } from "@/data/rooms";
import { site } from "@/config/site.js";
import { EASE } from "@/lib/motion";
import { Field, fieldThemes } from "@/components/shared/FormBits";
import { useCurrency, formatMoney } from "@/lib/currency";
import { PillButton } from "@/components/motion/MagneticButton";

const steps = ["Dates", "Suite", "Details", "Summary", "Confirmed"] as const;

interface GuestForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
}

// Multi-step booking flow — MOCKED: no payment, nothing leaves the browser.
export default function Booking() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState(params.get("checkIn") ?? format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(params.get("checkOut") ?? format(addDays(new Date(), 2), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(params.get("guests") ?? "2");
  const [roomSlug, setRoomSlug] = useState(params.get("room") ?? "");
  const [dateError, setDateError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [reference, setReference] = useState("");
  const [placing, setPlacing] = useState(false);

  const cur = useCurrency();
  const room = rooms.find((r) => r.slug === roomSlug);
  const euro = (n: number) => formatMoney(n, cur);
  const nights = useMemo(() => {
    try {
      return Math.max(0, differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn)));
    } catch {
      return 0;
    }
  }, [checkIn, checkOut]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<GuestForm>({ defaultValues: { firstName: "", lastName: "", email: "", phone: "", requests: "" } });

  const nextFromDates = () => {
    if (!checkIn || !checkOut || nights < 1) {
      setDateError("Please choose a check-out date after your check-in.");
      return;
    }
    setDateError("");
    setStep(1);
  };

  const nextFromRoom = () => {
    if (!room) {
      setRoomError("Please choose a suite to continue.");
      return;
    }
    setRoomError("");
    setStep(2);
  };

  const placeBooking = () => {
    setPlacing(true);
    window.setTimeout(() => {
      setReference(`RS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      setPlacing(false);
      setStep(4);
    }, 1200);
  };

  const subtotal = room ? room.price * nights : 0;
  const taxes = Math.round(subtotal * 0.12);
  const stepContentCls = "will-change-transform";

  return (
    <section className="min-h-[100svh] bg-ivory pb-28 pt-36 md:pt-44" data-testid="booking-page">
      <div className="container-royal max-w-4xl">
        <p className="eyebrow flex items-center gap-4 text-gold-deep">
          <span className="h-px w-10 bg-gold" /> Reservations
        </p>
        <h1 className="h-section mt-5">
          Reserve your <em className="italic text-gold-deep">stay</em>
        </h1>

        {/* Progress */}
        <ol className="mt-12 flex items-center gap-2 md:gap-4" data-testid="booking-progress">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2 md:gap-4">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[0.65rem] tabular-nums transition-colors duration-500 ${
                  i < step
                    ? "border-gold bg-gold text-charcoal"
                    : i === step
                      ? "border-ink text-ink"
                      : "border-line text-sand"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : i + 1}
              </span>
              <span
                className={`hidden text-[0.62rem] uppercase tracking-[0.2em] md:block ${
                  i <= step ? "text-ink" : "text-sand"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="relative h-px flex-1 overflow-hidden bg-line">
                  <motion.span
                    className="absolute inset-0 origin-left bg-gold"
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Dates ─────────────────────────── */}
            {step === 0 && (
              <motion.div key="s0" className={stepContentCls} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: EASE }}>
                <div className="grid gap-8 border border-line bg-white p-7 md:grid-cols-3 md:p-10">
                  <Field label="Check-in">
                    <input type="date" value={checkIn} min={format(new Date(), "yyyy-MM-dd")} onChange={(e) => setCheckIn(e.target.value)} className={fieldThemes.light.input} data-testid="step-checkin" />
                  </Field>
                  <Field label="Check-out">
                    <input type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className={fieldThemes.light.input} data-testid="step-checkout" />
                  </Field>
                  <Field label="Guests">
                    <div className="relative">
                      <select value={guests} onChange={(e) => setGuests(e.target.value)} className={`${fieldThemes.light.input} appearance-none pr-8`} data-testid="step-guests">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute bottom-3.5 right-1 h-4 w-4 text-gold-deep" strokeWidth={1.5} />
                    </div>
                  </Field>
                </div>
                {dateError && <p role="alert" className="mt-4 text-sm text-gold-deep" data-testid="dates-error">{dateError}</p>}
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-sand">{nights > 0 ? `${nights} ${nights === 1 ? "night" : "nights"}` : "Select your dates"}</p>
                  <PillButton onClick={nextFromDates} variant="dark" testId="dates-next">
                    Choose suite <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </PillButton>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Room ──────────────────────────── */}
            {step === 1 && (
              <motion.div key="s1" className={stepContentCls} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: EASE }}>
                <div className="grid gap-4 md:grid-cols-2" role="radiogroup" aria-label="Choose a room">
                  {rooms
                    .filter((r) => r.capacity >= Number(guests))
                    .map((r) => (
                      <button
                        key={r.slug}
                        type="button"
                        role="radio"
                        aria-checked={roomSlug === r.slug}
                        data-testid={`pick-room-${r.slug}`}
                        onClick={() => setRoomSlug(r.slug)}
                        className={`group flex items-center gap-4 border p-4 text-left transition-colors duration-300 ${
                          roomSlug === r.slug ? "border-gold bg-white shadow-lg" : "border-line bg-white/50 hover:border-gold/60"
                        }`}
                      >
                        <img src={r.image} alt={r.imageAlt} loading="lazy" className="h-20 w-24 shrink-0 object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-heading text-lg">{r.name}</span>
                          <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.18em] text-sand">
                            {r.size} m² · up to {r.capacity}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block font-heading text-lg text-gold-deep">{euro(r.price)}</span>
                          <span className="block text-[0.6rem] uppercase tracking-[0.15em] text-sand">/ night</span>
                        </span>
                      </button>
                    ))}
                </div>
                {roomError && <p role="alert" className="mt-4 text-sm text-gold-deep" data-testid="room-error">{roomError}</p>}
                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-sand transition-colors hover:text-ink" data-testid="room-back">
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Dates
                  </button>
                  <PillButton onClick={nextFromRoom} variant="dark" testId="room-next">
                    Your details <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </PillButton>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Guest details ─────────────────── */}
            {step === 2 && (
              <motion.form key="s2" className={stepContentCls} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: EASE }} onSubmit={handleSubmit(() => setStep(3))} noValidate>
                <div className="grid gap-8 border border-line bg-white p-7 md:grid-cols-2 md:p-10">
                  <Field label="First name" error={errors.firstName?.message}>
                    <input {...register("firstName", { required: "Required" })} className={fieldThemes.light.input} data-testid="guest-first-name" autoComplete="given-name" />
                  </Field>
                  <Field label="Last name" error={errors.lastName?.message}>
                    <input {...register("lastName", { required: "Required" })} className={fieldThemes.light.input} data-testid="guest-last-name" autoComplete="family-name" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} className={fieldThemes.light.input} data-testid="guest-email" autoComplete="email" />
                  </Field>
                  <Field label="Phone (optional)" error={errors.phone?.message}>
                    <input type="tel" {...register("phone")} className={fieldThemes.light.input} data-testid="guest-phone" autoComplete="tel" />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Special requests (optional)">
                      <textarea {...register("requests")} rows={3} className={`${fieldThemes.light.input} resize-none`} data-testid="guest-requests" placeholder="Anniversaries, allergies, arrival by boat…" />
                    </Field>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-sand transition-colors hover:text-ink" data-testid="details-back">
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Suite
                  </button>
                  <PillButton type="submit" variant="dark" testId="details-next">
                    Review summary <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </PillButton>
                </div>
              </motion.form>
            )}

            {/* ── Step 4: Summary ───────────────────────── */}
            {step === 3 && room && (
              <motion.div key="s3" className={stepContentCls} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: EASE }}>
                <div className="border border-line bg-white p-7 md:p-10" data-testid="booking-summary">
                  <div className="flex flex-wrap items-center gap-5 border-b border-line pb-6">
                    <img src={room.image} alt={room.imageAlt} className="h-20 w-28 object-cover" />
                    <div>
                      <p className="eyebrow text-gold-deep">{room.type}</p>
                      <p className="h-card mt-1">{room.name}</p>
                    </div>
                  </div>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between"><dt className="text-sand">Dates</dt><dd>{format(parseISO(checkIn), "d MMM yyyy")} → {format(parseISO(checkOut), "d MMM yyyy")}</dd></div>
                    <div className="flex justify-between"><dt className="text-sand">Guests</dt><dd>{guests}</dd></div>
                    <div className="flex justify-between"><dt className="text-sand">Lead guest</dt><dd>{getValues("firstName")} {getValues("lastName")}</dd></div>
                    <div className="flex justify-between"><dt className="text-sand">{nights} {nights === 1 ? "night" : "nights"} × {euro(room.price)}</dt><dd>{euro(subtotal)}</dd></div>
                    <div className="flex justify-between"><dt className="text-sand">Taxes &amp; city levy (12%)</dt><dd>{euro(taxes)}</dd></div>
                  </dl>
                  <div className="mt-6 flex items-baseline justify-between border-t border-line pt-6">
                    <span className="eyebrow text-sand">Total</span>
                    <span className="font-heading text-4xl text-ink" data-testid="summary-total">{euro(subtotal + taxes)}</span>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-sand">
                    Demonstration booking — no payment is taken and nothing is charged. Flexible cancellation until 7 days before arrival.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-sand transition-colors hover:text-ink" data-testid="summary-back">
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Details
                  </button>
                  <PillButton onClick={placeBooking} variant="gold" testId="confirm-booking" className={placing ? "pointer-events-none opacity-70" : ""}>
                    {placing ? "Reserving…" : "Confirm reservation"}
                  </PillButton>
                </div>
              </motion.div>
            )}

            {/* ── Step 5: Confirmation ──────────────────── */}
            {step === 4 && room && (
              <motion.div key="s4" className="text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} data-testid="booking-confirmation">
                <motion.span
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold text-gold-deep"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                >
                  <Check className="h-8 w-8" strokeWidth={1.5} />
                </motion.span>
                <h2 className="h-section mt-8">The cliff is <em className="italic text-gold-deep">expecting you</em></h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/65">
                  Reference <span className="font-semibold text-ink" data-testid="booking-reference">{reference}</span> —{" "}
                  {room.name}, {nights} {nights === 1 ? "night" : "nights"} from{" "}
                  {format(parseISO(checkIn), "d MMM yyyy")}. A confirmation letter is on its way to{" "}
                  <span className="text-ink">{getValues("email")}</span> (demo — no email is actually sent).
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <PillButton to="/" variant="dark" testId="confirmation-home">Back to the lobby</PillButton>
                  <PillButton to="/rooms" variant="outline-dark" testId="confirmation-rooms">Browse suites</PillButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step < 4 && (
          <p className="mt-10 text-center text-[0.62rem] uppercase tracking-[0.2em] text-sand">
            Questions? {site.contact.phone} · {site.contact.email}
          </p>
        )}
      </div>
    </section>
  );
}
