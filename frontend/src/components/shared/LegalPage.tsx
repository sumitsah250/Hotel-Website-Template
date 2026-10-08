import { site } from "@/config/site.js";
import { FadeUp } from "@/components/motion/FadeUp";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

// Shared legal page layout (Privacy / Terms).
export function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  return (
    <section className="bg-ivory pb-28 pt-40 md:pt-48" data-testid="legal-page">
      <div className="container-royal max-w-3xl">
        <FadeUp>
          <p className="eyebrow flex items-center gap-4 text-gold-deep">
            <span className="h-px w-10 bg-gold" /> {eyebrow}
          </p>
          <h1 className="h-section mt-5">{title}</h1>
          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-sand">
            {site.legalName} · Last revised {updated}
          </p>
          <p className="mt-8 text-base leading-relaxed text-ink/75">{intro}</p>
        </FadeUp>
        <div className="mt-12 space-y-12">
          {sections.map((s, i) => (
            <FadeUp key={s.heading} delay={0.05}>
              <h2 className="font-heading text-2xl">
                <span className="mr-3 text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 border-l border-line pl-6">
                {s.body.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-ink/65">{p}</p>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="mt-16 border-t border-line pt-8">
          <p className="text-xs leading-relaxed text-sand">
            Questions about this document: <a href={`mailto:${site.contact.email}`} className="text-gold-deep underline-offset-4 hover:underline">{site.contact.email}</a> · {site.contact.phone}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
