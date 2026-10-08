import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { experiences } from "@/data/experiences";
import { useCurrency, convertPriceText } from "@/lib/currency";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Field, fieldThemes } from "@/components/shared/FormBits";
import { EASE } from "@/lib/motion";

interface InquiryForm {
  name: string;
  email: string;
  experience: string;
  date: string;
  message: string;
}

// Experiences, events & weddings: package grid + inquiry form (mocked).
export default function Experiences() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryForm>({ defaultValues: { experience: experiences[0].title } });

  return (
    <>
      <PageHero
        eyebrow="Experiences"
        titleLines={["Days made", <em key="e" className="italic text-gold-light">of salt &amp; citrus</em>]}
        subcopy="Boat days, harvest mornings, pasta ateliers — and a terrace that has hosted a hundred yeses."
        image="https://images.unsplash.com/photo-1770563864411-488559bf7a56?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="A wooden gozzo floating near colourful harbour buildings"
      />

      {/* Packages */}
      <section className="section-pad bg-ivory" data-testid="experiences-grid">
        <div className="container-royal">
          <SectionHeader
            eyebrow="The concierge's list"
            lines={["Choose your", <em key="c" className="italic text-gold-deep">pace</em>]}
            className="max-w-2xl"
          />
          <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <FadeUp key={exp.slug} delay={(i % 3) * 0.1}>
                <a href="#enquire" data-testid={`experience-${exp.slug}`} data-cursor-label="Enquire" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute left-4 top-4 bg-charcoal/85 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.25em] text-gold-light backdrop-blur">
                      {exp.category}
                    </span>
                  </div>
                  <h2 className="h-card mt-5 group-hover:text-gold-deep transition-colors duration-300">{exp.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{exp.description}</p>
                  <p className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[0.65rem] uppercase tracking-[0.18em]">
                    <span className="text-sand">{exp.duration}</span>
                    <span className="flex items-center gap-1.5 text-gold-deep">
                      {convertPriceText(exp.priceNote, useCurrency())} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </p>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Weddings feature */}
      <section className="section-pad bg-charcoal text-cream" data-testid="weddings-feature">
        <div className="container-royal grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              dark
              eyebrow="Weddings & events"
              lines={["The terrace,", <em key="w" className="italic text-gold-light">dressed for you</em>]}
            />
            <FadeUp delay={0.2} className="mt-7 max-w-md space-y-5 text-sm leading-relaxed text-cream/65">
              <p>
                Up to eighty guests on the cliff terrace, dinner in the grand
                salon, dancing in the garden under the lemon trees. Our
                celebrations atelier takes on twelve weddings a year — never more.
              </p>
              <p>
                Whole-estate hire is available in the quiet season for retreats,
                launches and occasions that deserve a horizon.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-7">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400"
              alt="Fine dining setup prepared for a celebration"
              speed={8}
              className="aspect-[16/10] w-full"
            />
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="section-pad bg-ivory" id="enquire" data-testid="experiences-enquire">
        <div className="container-royal grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Enquiries"
              lines={["Tell us about", <em key="f" className="italic text-gold-deep">your day</em>]}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/65">
                A few lines are enough. The concierge replies personally within
                a day — usually with three ideas you had not considered.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-7">
            {sent ? (
              <motion.div
                data-testid="inquiry-success"
                className="flex items-center gap-4 border border-gold/40 bg-white p-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold text-gold-deep">
                  <Check className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="text-sm leading-relaxed text-ink/75">
                  Received, with pleasure. The concierge will write back within
                  the day (demo — nothing is sent).
                </p>
              </motion.div>
            ) : (
              <FadeUp delay={0.25}>
                <form onSubmit={handleSubmit(() => setSent(true))} noValidate className="grid gap-7 border border-line bg-white p-7 md:grid-cols-2 md:p-10">
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register("name", { required: "Required" })} className={fieldThemes.light.input} data-testid="inquiry-name" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} className={fieldThemes.light.input} data-testid="inquiry-email" autoComplete="email" />
                  </Field>
                  <Field label="Experience">
                    <select {...register("experience")} className={fieldThemes.light.input} data-testid="inquiry-experience">
                      {experiences.map((e) => (
                        <option key={e.slug} value={e.title}>{e.title}</option>
                      ))}
                      <option value="Something else">Something else entirely</option>
                    </select>
                  </Field>
                  <Field label="Preferred date (optional)">
                    <input type="date" {...register("date")} className={fieldThemes.light.input} data-testid="inquiry-date" />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Your plans">
                      <textarea {...register("message")} rows={4} className={`${fieldThemes.light.input} resize-none`} data-testid="inquiry-message" placeholder="Guests, dates, the occasion…" />
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" data-testid="inquiry-submit" className="btn-fill rounded-full bg-ink px-8 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cream transition-colors duration-500 hover:text-charcoal">
                      Send enquiry
                    </button>
                  </div>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
