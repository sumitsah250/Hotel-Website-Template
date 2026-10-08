import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { menus, venues } from "@/data/menus";
import { useCurrency, formatMenuPrice } from "@/lib/currency";
import { site } from "@/config/site.js";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Field, fieldThemes } from "@/components/shared/FormBits";
import { PillButton } from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion";

interface ReservationForm {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
}

// Dining: venue stories, animated menu tabs, reservation form (mocked).
export default function Dining() {
  const [tab, setTab] = useState(menus[0].id);
  const cur = useCurrency();
  const [reserved, setReserved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationForm>({ defaultValues: { time: "19:30", guests: "2" } });

  const active = menus.find((m) => m.id === tab) ?? menus[0];

  return (
    <>
      <PageHero
        eyebrow="Dining"
        titleLines={["The table is", <em key="d" className="italic text-gold-light">the house's heart</em>]}
        subcopy="One candlelit dining room, one low-lit bar, and a menu written each morning at the harbour market."
        image="https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="The chef pouring sauce over a plated dish at Lume"
      />

      {/* Venues */}
      <section className="section-pad bg-ivory" data-testid="dining-venues">
        <div className="container-royal space-y-24">
          {venues.map((v, i) => (
            <div key={v.name} className="grid items-center gap-12 lg:grid-cols-12">
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <ParallaxImage src={v.image} alt={v.alt} speed={7} className="aspect-[16/10] w-full" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <FadeUp>
                  <p className="eyebrow text-gold-deep">{v.kind}</p>
                  <h2 className="h-section mt-3">{v.name}</h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">{v.description}</p>
                  <p className="mt-6 border-t border-line pt-4 text-[0.65rem] uppercase tracking-[0.2em] text-sand">
                    {v.hours}
                  </p>
                </FadeUp>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menus with animated tabs */}
      <section className="section-pad bg-charcoal text-cream" id="menus" data-testid="dining-menus">
        <div className="container-royal">
          <SectionHeader
            dark
            eyebrow="Taste"
            lines={["This week's", <em key="m" className="italic text-gold-light">menus</em>]}
            className="mx-auto max-w-2xl text-center [&_p]:justify-center"
          />

          <div className="mt-12 flex flex-wrap justify-center gap-x-2 gap-y-1" role="tablist" aria-label="Menus">
            {menus.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={tab === m.id}
                data-testid={`menu-tab-${m.id}`}
                onClick={() => setTab(m.id)}
                className={`relative px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  tab === m.id ? "text-gold-light" : "text-cream/50 hover:text-cream"
                }`}
              >
                {m.label}
                {tab === m.id && (
                  <motion.span
                    layoutId="menu-tab-underline"
                    className="absolute inset-x-4 bottom-0 h-px bg-gold"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-4 max-w-3xl">
            <p className="text-center text-[0.65rem] uppercase tracking-[0.25em] text-cream/40">{active.note}</p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-10 divide-y divide-line-light"
              >
                {active.items.map((item) => (
                  <li key={item.name} className="flex items-baseline gap-4 py-5">
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl">{item.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-cream/55">{item.description}</p>
                    </div>
                    <span aria-hidden="true" className="mx-2 flex-1 border-b border-dotted border-cream/20" />
                    <span className="shrink-0 font-heading text-lg text-gold-light">
                      {item.price === "—" ? "" : formatMenuPrice(item.price, cur)}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Reservation form */}
      <section className="section-pad bg-ivory" id="reserve" data-testid="dining-reserve">
        <div className="container-royal grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Reservations"
              lines={["Reserve", <em key="t" className="italic text-gold-deep">a table</em>]}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/65">
                Twelve tables at Lume, six seats at the chef's counter. The bar
                never takes bookings — it simply keeps your chair warm.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-7">
            {reserved ? (
              <motion.div
                data-testid="reservation-success"
                className="flex items-center gap-4 border border-gold/40 bg-white p-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold text-gold-deep">
                  <Check className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="text-sm leading-relaxed text-ink/75">
                  Your table request is with the maître d'. We confirm every
                  reservation personally within the hour (demo — nothing is sent).
                </p>
              </motion.div>
            ) : (
              <FadeUp delay={0.25}>
                <form
                  onSubmit={handleSubmit(() => setReserved(true))}
                  noValidate
                  className="grid gap-7 border border-line bg-white p-7 md:grid-cols-2 md:p-10"
                >
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register("name", { required: "Required" })} className={fieldThemes.light.input} data-testid="reservation-name" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} className={fieldThemes.light.input} data-testid="reservation-email" autoComplete="email" />
                  </Field>
                  <Field label="Date" error={errors.date?.message}>
                    <input type="date" {...register("date", { required: "Required" })} className={fieldThemes.light.input} data-testid="reservation-date" />
                  </Field>
                  <Field label="Time">
                    <select {...register("time")} className={fieldThemes.light.input} data-testid="reservation-time">
                      {["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Guests">
                    <select {...register("guests")} className={fieldThemes.light.input} data-testid="reservation-guests">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="flex items-end">
                    <PillButton type="submit" variant="dark" testId="reservation-submit" magnetic={false}>
                      Request table
                    </PillButton>
                  </div>
                </form>
              </FadeUp>
            )}
            <p className="mt-5 text-xs text-sand">
              Parties above eight: <a href={`tel:${site.contact.phoneHref}`} className="text-gold-deep underline-offset-4 hover:underline">{site.contact.phone}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
