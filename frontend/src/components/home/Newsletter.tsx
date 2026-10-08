import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/config/site.js";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { EASE } from "@/lib/motion";

interface FormValues {
  email: string;
}

// Newsletter signup — MOCKED client-side, no data leaves the browser.
export function Newsletter() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = () => setDone(true);

  return (
    <section
      data-testid="newsletter"
      className="section-pad border-t border-line-light bg-charcoal text-cream"
      aria-labelledby="newsletter-title"
    >
      <div className="container-royal mx-auto max-w-3xl text-center">
        <FadeUp>
          <p className="eyebrow flex items-center justify-center gap-4 text-gold-light">
            <span className="h-px w-10 bg-gold" /> Newsletter <span className="h-px w-10 bg-gold" />
          </p>
        </FadeUp>
        <RevealText
          as="h2"
          className="h-section mt-5"
          lines={[site.newsletter.title]}
        />
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/60">
            {site.newsletter.body}
          </p>
        </FadeUp>

        <FadeUp delay={0.3} className="mt-10">
          {done ? (
            <motion.p
              data-testid="newsletter-success"
              className="mx-auto flex max-w-md items-center justify-center gap-3 border border-gold/40 px-6 py-4 text-sm text-gold-light"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Check className="h-4 w-4" strokeWidth={1.5} />
              Thank you — the first letter arrives with the new moon.
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex max-w-md items-center gap-3 border-b border-cream/25 pb-3 transition-colors focus-within:border-gold"
              noValidate
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                data-testid="newsletter-email"
                className="w-full bg-transparent text-sm text-cream placeholder:text-cream/35 focus:outline-none"
                {...register("email", {
                  required: "An email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <button
                type="submit"
                data-testid="newsletter-submit"
                aria-label="Subscribe"
                className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 text-gold transition-colors duration-500 hover:bg-gold hover:text-charcoal"
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </button>
            </form>
          )}
          {errors.email && (
            <p data-testid="newsletter-error" className="mt-3 text-xs text-gold-light">
              {errors.email.message}
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
