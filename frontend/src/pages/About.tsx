import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { timeline, values, team, awards } from "@/data/about";
import { site } from "@/config/site.js";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Counter } from "@/components/motion/Counter";

// About: story timeline with scroll-drawn line, values, team, awards.
export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <>
      <PageHero
        eyebrow={`Since ${site.established}`}
        titleLines={["A family house,", <em key="a" className="italic text-gold-light">open to the world</em>]}
        subcopy="Three generations of one family, one cliff, and a single unbroken rule: nothing hurried."
        image="https://images.unsplash.com/photo-1742844552193-2fd3425cd26d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="Sunlight washing through the grand lobby"
      />

      {/* Timeline */}
      <section className="section-pad bg-ivory" data-testid="about-timeline">
        <div className="container-royal">
          <SectionHeader
            eyebrow="The story"
            lines={["Seven decades", <em key="t" className="italic text-gold-deep">on one cliff</em>]}
            className="max-w-2xl"
          />
          <div ref={timelineRef} className="relative mx-auto mt-16 max-w-3xl">
            {/* scroll-drawn line */}
            <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2" />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gold md:left-1/2"
              style={{ scaleY: scrollYProgress }}
            />
            <div className="space-y-16">
              {timeline.map((entry, i) => (
                <FadeUp key={entry.year} delay={0.05}>
                  <div
                    className={`relative grid gap-3 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                      i % 2 === 1 ? "md:text-left" : "md:text-right"
                    }`}
                    data-testid={`timeline-${entry.year}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-4 top-2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-gold bg-ivory md:left-1/2"
                    />
                    <div className={i % 2 === 1 ? "md:order-2" : ""}>
                      <span className="font-heading text-4xl text-gold-deep md:text-5xl">{entry.year}</span>
                    </div>
                    <div className={i % 2 === 1 ? "md:order-1" : ""}>
                      <h3 className="h-card">{entry.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">{entry.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-charcoal text-cream" data-testid="about-values">
        <div className="container-royal">
          <SectionHeader
            dark
            eyebrow="What we believe"
            lines={["House", <em key="v" className="italic text-gold-light">principles</em>]}
            className="max-w-2xl"
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08} className="bg-charcoal">
                <div className="group h-full p-8 transition-colors duration-500 hover:bg-[#181818]">
                  <span className="font-heading text-3xl italic text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 font-heading text-xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/55">{v.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-ivory" data-testid="about-team">
        <div className="container-royal">
          <SectionHeader
            eyebrow="The red coats"
            lines={["The people", <em key="p" className="italic text-gold-deep">of the house</em>]}
            className="max-w-2xl"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.1} className={i === 1 ? "md:mt-12" : ""}>
                <div className="group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="h-card mt-5">{member.name}</h3>
                  <p className="eyebrow mt-2 text-sand">{member.role}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Awards + image */}
      <section className="section-pad border-t border-line bg-ivory" data-testid="about-awards">
        <div className="container-royal grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1735045634800-957fd0dad45e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
              alt="The chequered hall with glowing lanterns"
              speed={8}
              className="aspect-[4/5] w-full"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeader eyebrow="Recognition" lines={["Quietly", <em key="aw" className="italic text-gold-deep">decorated</em>]} />
            <FadeUp delay={0.2} className="mt-10 divide-y divide-line border-y border-line">
              {awards.map((a) => (
                <div key={a.title} className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-5" data-testid={`award-${a.year}-${a.title.slice(0, 8)}`}>
                  <span className="font-heading text-lg italic text-gold-deep">{a.year}</span>
                  <span className="text-sm text-ink">{a.title}</span>
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-sand">{a.org}</span>
                </div>
              ))}
            </FadeUp>
            <FadeUp delay={0.3} className="mt-10 flex items-center gap-10">
              <div>
                <Counter value={17} className="font-heading text-4xl text-ink" />
                <p className="eyebrow mt-2 text-sand">International awards</p>
              </div>
              <div className="h-12 w-px bg-line" />
              <div>
                <Counter value={98} suffix="%" className="font-heading text-4xl text-ink" />
                <p className="eyebrow mt-2 text-sand">Guests who return</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
