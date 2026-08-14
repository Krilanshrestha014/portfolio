import { useEffect, useRef, useState } from "react";

/**
 * "Related Case Studies" section — single-card carousel with dot pagination,
 * a reveal-on-scroll header, and hands-off auto-advance.
 *
 * Reusable: pass `projects` (and optionally `title`) from the parent page.
 * Each case study page should pass its own list, excluding the project
 * currently being viewed.
 *
 * Visual language is carried over from SelectedWork.jsx: same dark
 * radial-gradient card, same Switzer font, same Case Study / Details button
 * pair, the same "next card peek" strip beneath the card, and the same
 * header reveal-on-scroll treatment — but simplified to a single visible
 * card with a lightweight dot pager instead of the pinned scroll stack.
 */

export const DEFAULT_RELATED_PROJECTS = [
  {
    title: "Yatrasanghi",
    desc: "Re-designing an AI-generated interface for a clearer travel discovery journey.",
    tags: ["UI Design", "Discovery Platform", "Figma"],
    accent: "#4d5fd6",
    glow1: "rgba(76,90,220,0.5)",
    glow2: "rgba(45,30,140,0.32)",
    link: "/yatrasanghi",
  },
  {
    title: "Manna Bakery",
    desc: "Re-designing a mobile ordering experience for a faster, simpler bakery journey.",
    tags: ["UI Design", "Web App", "Figma"],
    accent: "#3f9c78",
    glow1: "rgba(63,156,120,0.45)",
    glow2: "rgba(20,90,70,0.28)",
    link: null,
  },
];

const AUTO_SLIDE_MS = 4000;

export default function RelatedCaseStudies({
  projects = DEFAULT_RELATED_PROJECTS,
  title = "Related Case Studies",
}) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [headerIn, setHeaderIn] = useState(false);
  const [paused, setPaused] = useState(false);

  const headerRef = useRef(null);
  const timerRef = useRef(null);

  // guard against an empty list after exclusion, and keep `current` in range
  // if `projects` changes length between renders (e.g. navigating pages)
  useEffect(() => {
    if (current >= projects.length) setCurrent(0);
  }, [projects, current]);

  if (!projects || projects.length === 0) return null;

  const project = projects[current];
  const nextProject = projects[(current + 1) % projects.length];

  // header reveal-on-scroll, same pattern as SelectedWork.jsx
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderIn(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const changeTo = (i, reduceMotion) => {
    const idx = (i + projects.length) % projects.length;
    if (reduceMotion) {
      setCurrent(idx);
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 220);
  };

  const goTo = (i) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    changeTo(i, reduceMotion);
  };

  // auto-slide, pauses on hover/focus and respects reduced-motion
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || paused || projects.length <= 1) return;

    timerRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % projects.length);
        setTransitioning(false);
      }, 220);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timerRef.current);
  }, [paused, projects.length]);

  return (
    <section className="bg-[#ffffff]  pb-[80px] font-['Switzer',sans-serif]">
      <style>{`
        @keyframes dotFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div className="w-full mx-auto px-6 md:px-16">
        <div
          ref={headerRef}
          className={`mb-10 transition-all duration-[900ms] ease-[cubic-bezier(.16,.8,.24,1)] ${
            headerIn ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-7 blur-[6px]"
          }`}
        >
          <p className="font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,4.4vw,3rem)] text-[#16150f]">
            {title}
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className={`relative z-[2] h-[clamp(360px,50vw,520px)] rounded-[28px] overflow-hidden p-9 md:p-10 flex flex-col justify-between text-[#eceae1] transition-[background,opacity,transform] duration-500 ease-[cubic-bezier(.16,.8,.24,1)] ${
              transitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
            }`}
            style={{
              background: `radial-gradient(120% 90% at 28% 12%, ${project.glow1}, transparent 60%), radial-gradient(90% 70% at 76% 88%, ${project.glow2}, transparent 65%), #0a0908`,
            }}
          >
            {/* faint signature ring, echoes the sparkle glyph on SelectedWork cards */}
            <div
              className="absolute left-9 top-16 md:left-10 md:top-20 w-[110px] h-[110px] rounded-full border pointer-events-none"
              style={{ borderColor: `${project.accent}33` }}
            />

            <div className="flex justify-end text-xs tracking-[0.08em] text-[rgba(245,242,234,0.55)]">
              {projects.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous project"
                    className="grid place-items-center w-8 h-8 rounded-full border border-[rgba(245,242,234,0.15)] hover:bg-[rgba(245,242,234,0.08)] transition-colors mr-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(current + 1)}
                    aria-label="Next project"
                    className="grid place-items-center w-8 h-8 rounded-full border border-[rgba(245,242,234,0.15)] hover:bg-[rgba(245,242,234,0.08)] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div>
              <h3 className="font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#f5f2ea] mb-3.5">
                {project.title}
              </h3>

              <p className="text-sm leading-[1.55] text-[rgba(245,242,234,0.65)] max-w-[440px] mb-6">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3.5 py-[7px] rounded-full border border-[rgba(245,242,234,0.12)] text-[rgba(245,242,234,0.75)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2.5">
                {project.link ? (
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium bg-[#f5f2ea] text-[#16150f] rounded-none hover:rounded-xl transition-[border-radius,box-shadow] duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                  >
                    Case Study
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium bg-[#f5f2ea] text-[#16150f] opacity-45 pointer-events-none"
                  >
                    Case Study
                  </span>
                )}
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium bg-[rgba(245,242,234,0.08)] text-[#eceae1] border border-[rgba(245,242,234,0.12)] hover:bg-[rgba(245,242,234,0.16)] rounded-none hover:rounded-xl transition-all duration-300"
                >
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* next-card peek strip, separated from the card by a visible gap */}
          {projects.length > 1 && (
            <div className="mt-3 mx-3.5 h-[26px] rounded-b-[22px] overflow-hidden">
              <div
                className="h-full w-full transition-colors duration-700 ease-[cubic-bezier(.25,.46,.45,.94)]"
                style={{ background: nextProject.accent, opacity: 0.9 }}
              />
            </div>
          )}

          {/* dot pager */}
          {projects.length > 1 && (
            <div className="flex justify-center mt-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-[#16150f]">
                {projects.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${p.title}`}
                    aria-current={i === current}
                    className={`relative h-1.5 rounded-full overflow-hidden transition-[width,background-color] duration-300 ease-[cubic-bezier(.16,.8,.24,1)] ${
                      i === current ? "w-6 bg-[rgba(245,242,234,0.25)]" : "w-1.5 bg-[rgba(245,242,234,0.35)]"
                    }`}
                  >
                    {i === current && (
                      <span
                        key={`${current}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-[#f5f2ea] rounded-full"
                        style={{
                          animation: paused ? "none" : `dotFill ${AUTO_SLIDE_MS}ms linear forwards`,
                          width: paused ? "100%" : undefined,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}