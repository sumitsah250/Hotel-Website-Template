import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Check, MessageCircle } from "lucide-react";
import { site } from "@/config/site.js";
import { faqs } from "@/data/faqs";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { Field, fieldThemes } from "@/components/shared/FormBits";
import { Accordion } from "@/components/shared/Accordion";
import { EASE } from "@/lib/motion";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Contact: form (mocked), details, styled map embed, FAQ accordion.
export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ defaultValues: { subject: "A reservation" } });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        titleLines={["The concierge", <em key="c" className="italic text-gold-light">never sleeps</em>]}
        subcopy="Write, call or simply arrive by boat — the house answers at any hour."
        image="https://images.unsplash.com/photo-1588504633950-9dc518941e93?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="The private jetty resting over still water"
      />

      <section className="section-pad bg-ivory" data-testid="contact-main">
        <div className="container-royal grid gap-14 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Write to us" lines={["A letter to", <em key="w" className="italic text-gold-deep">the house</em>]} />
            {sent ? (
              <motion.div
                data-testid="contact-success"
                className="mt-10 flex items-center gap-4 border border-gold/40 bg-white p-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold text-gold-deep">
                  <Check className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="text-sm leading-relaxed text-ink/75">
                  Your letter is on the concierge's desk. Expect a reply within
                  the day (demo — nothing is sent).
                </p>
              </motion.div>
            ) : (
              <FadeUp delay={0.2} className="mt-10">
                <form onSubmit={handleSubmit(() => setSent(true))} noValidate className="grid gap-7 md:grid-cols-2">
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register("name", { required: "Required" })} className={fieldThemes.light.input} data-testid="contact-name" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} className={fieldThemes.light.input} data-testid="contact-email" autoComplete="email" />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Subject">
                      <select {...register("subject")} className={fieldThemes.light.input} data-testid="contact-subject">
                        {["A reservation", "Dining", "Spa & wellness", "Weddings & events", "Press", "Something else"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Message" error={errors.message?.message}>
                      <textarea {...register("message", { required: "A few words help us help you" })} rows={5} className={`${fieldThemes.light.input} resize-none`} data-testid="contact-message" placeholder="Dates, wishes, questions…" />
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" data-testid="contact-submit" className="btn-fill rounded-full bg-ink px-8 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cream transition-colors duration-500 hover:text-charcoal">
                      Send letter
                    </button>
                  </div>
                </form>
              </FadeUp>
            )}
          </div>

          {/* Details */}
          <aside className="lg:col-span-5">
            <FadeUp delay={0.25} className="border border-line bg-white p-8">
              <h2 className="eyebrow text-gold-deep">The house</h2>
              <address className="mt-5 space-y-4 text-sm not-italic leading-relaxed text-ink/70">
                <p>
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.zip} {site.contact.address.city}
                  <br />
                  {site.contact.address.region}, {site.contact.address.country}
                </p>
                <p>
                  <a href={`tel:${site.contact.phoneHref}`} className="block transition-colors hover:text-gold-deep" data-testid="contact-phone">
                    {site.contact.phone}
                  </a>
                  <a href={`mailto:${site.contact.email}`} className="block transition-colors hover:text-gold-deep" data-testid="contact-email-link">
                    {site.contact.email}
                  </a>
                </p>
              </address>
              <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[0.65rem] uppercase tracking-[0.18em]">
                {Object.entries(site.hours).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-sand capitalize">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                data-testid="contact-whatsapp"
                className="btn-fill mt-7 flex items-center justify-center gap-3 rounded-full border border-ink/25 px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:border-gold hover:text-charcoal"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp the concierge
              </a>
            </FadeUp>
          </aside>
        </div>

        {/* Map */}
        <div className="container-royal mt-20">
          <FadeUp>
            <div className="relative overflow-hidden border border-line" data-testid="contact-map">
              <iframe
                title={`Map — ${site.name}`}
                src={site.contact.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full grayscale-[0.85] contrast-[0.92] sepia-[0.18]"
              />
              <div className="pointer-events-none absolute left-5 top-5 bg-charcoal/90 px-5 py-3 text-cream backdrop-blur">
                <p className="eyebrow text-gold-light">{site.name}</p>
                <p className="mt-1 text-xs text-cream/70">{site.contact.address.city}, {site.contact.address.region}</p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* FAQ */}
        <div className="container-royal mt-24">
          <SectionHeader eyebrow="Good to know" lines={["Questions,", <em key="f" className="italic text-gold-deep">answered</em>]} className="max-w-2xl" />
          <FadeUp delay={0.2} className="mt-12">
            <Accordion items={faqs} testIdPrefix="contact-faq" />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
