import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * "Selected Work" section — pinned, scroll-driven project card stack.
 * Faithful React + Tailwind port of the original HTML/CSS/vanilla-JS section.
 *
 * Requirements in the host project:
 *  1. GSAP is loaded via CDN at runtime (same as the original — no npm install
 *     needed). If you'd rather use npm, `npm i gsap` and swap the dynamic
 *     <script> loader below for `import gsap from "gsap"` etc.
 *  2. The "Switzer" font from Fontshare, loaded once in your document head:
 *     <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,700&display=swap" rel="stylesheet" />
 *  3. Tailwind CSS configured in the project (no plugin/config changes needed —
 *     everything below uses core utilities + Tailwind's arbitrary-value syntax).
 */

const PROJECTS = [
  {
    title: "Spark by Supriya",
    desc: "eCommerce site for a dual-brand candle and clothing store - candles take the lead.",
    tags: ["UI Design", "eCommerce", "Figma"],
    accent: "#c88a4d",
    glow1: "rgba(198,124,58,0.5)",
    glow2: "rgba(120,60,20,0.28)",
    link: "/spark",
  },
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
    link: "/manna-bakery",
  },
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

export default function SelectedWork() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [headerIn, setHeaderIn] = useState(false);

  const pinRef = useRef(null);
  const headerRef = useRef(null);
  const triggerRef = useRef(null);
  const currentRef = useRef(0);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // header reveal-on-scroll (mirrors the original .reveal / IntersectionObserver)
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

  const changeCard = useCallback((idx, reduceMotion) => {
    if (reduceMotion) {
      setCurrent(idx);
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 220);
  }, []);

  // pinned scroll-driven stage, same GSAP/ScrollTrigger mechanics as the original
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    let cancelled = false;

    (async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js");
      } catch {
        return; // fail quietly — section still works without pinned scroll
      }
      if (cancelled) return;

      const { gsap, ScrollTrigger, ScrollToPlugin } = window;
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      triggerRef.current = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: () => "+=" + (PROJECTS.length - 1) * window.innerHeight * 0.9,
        pin: true,
        scrub: 0.8,
        onUpdate(self) {
          const idx = Math.round(self.progress * (PROJECTS.length - 1));
          if (idx !== currentRef.current) changeCard(idx, false);
        },
      });
    })();

    return () => {
      cancelled = true;
      if (triggerRef.current) triggerRef.current.kill();
    };
  }, [changeCard]);

  const jumpTo = (i) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (triggerRef.current && !reduceMotion && window.gsap) {
      const frac = PROJECTS.length > 1 ? i / (PROJECTS.length - 1) : 0;
      const target =
        triggerRef.current.start + frac * (triggerRef.current.end - triggerRef.current.start);
      window.gsap.to(window, { scrollTo: target, duration: 0.9, ease: "power2.inOut" });
    } else {
      changeCard(i, reduceMotion);
    }
  };

  const project = PROJECTS[current];
  const nextProject = PROJECTS[(current + 1) % PROJECTS.length];

  return (
    <section id="work" className="bg-[#f5f2ea] pt-[130px] pb-[110px] font-['Switzer',sans-serif]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-16">
        <div
          ref={headerRef}
          className={`mb-14 transition-all duration-[900ms] ease-[cubic-bezier(.16,.8,.24,1)] ${
            headerIn ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-7 blur-[6px]"
          }`}
        >
          <h2 className="font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,4.4vw,3rem)] text-[#16150f]">
            Selected Work
          </h2>
        </div>
      </div>

      <div ref={pinRef} className="relative h-[100svh] flex flex-col items-center justify-center">
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-16">
          <div className="relative h-[clamp(380px,52vw,540px)]">
            {/* thin peek strip of the next card */}
            <div
              className="absolute left-3.5 right-3.5 -bottom-[22px] h-[34px] rounded-b-[28px] z-0 transition-colors duration-1000 ease-[cubic-bezier(.25,.46,.45,.94)]"
              style={{ background: nextProject.accent }}
            />

            {/* main card */}
            <div
              data-cursor="Open"
              className={`absolute inset-0 z-[2] rounded-[28px] overflow-hidden p-9 md:p-10 flex flex-col justify-between text-[#eceae1] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,.8,.24,1)] ${
                transitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
              style={{
                background: `radial-gradient(120% 90% at 28% 12%, ${project.glow1}, transparent 60%), radial-gradient(90% 70% at 76% 88%, ${project.glow2}, transparent 65%), #0a0908`,
              }}
            >
              <div className="flex justify-between text-xs tracking-[0.08em] text-[rgba(245,242,234,0.55)]">
                <span>{project.index}</span>
                <span className="text-[#c07a45]">{project.year}</span>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-[#f5f2ea]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L14 9.5L21 12L14 14.5L12 22L10 14.5L3 12L10 9.5L12 2Z" fill="currentColor" />
                  </svg>
                  <h3 className="font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#f5f2ea]">
                    {project.title}
                  </h3>
                </div>

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
                      data-cursor="Open"
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
                    data-cursor="Explore"
                    className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium bg-[rgba(245,242,234,0.08)] text-[#eceae1] border border-[rgba(245,242,234,0.12)] hover:bg-[rgba(245,242,234,0.16)] rounded-none hover:rounded-xl transition-all duration-300"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* pill pagination with colored project avatars */}
          <div className="flex justify-center mt-14">
            <div className="inline-flex items-center gap-3.5 pl-5 pr-3 py-2.5 rounded-full bg-[#f5f2ea] border border-[rgba(22,21,15,0.12)] shadow-[0_12px_30px_rgba(22,21,15,0.06)]">
              <span className="text-[13px] text-[#8f8c81] whitespace-nowrap">
                {current + 1} of {PROJECTS.length}
              </span>
              <div className="flex items-center">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to ${p.title}`}
                    style={{ background: p.accent, zIndex: i === current ? 5 : PROJECTS.length - i }}
                    className={`w-[30px] h-[30px] rounded-full border-2 border-[#f5f2ea] -ml-2 first:ml-0 flex items-center justify-center text-white text-[11px] font-semibold cursor-pointer relative transition-transform duration-300 ease-[cubic-bezier(.16,.8,.24,1)] ${
                      i === current
                        ? "scale-[1.18] -translate-y-0.5 shadow-[0_6px_16px_rgba(22,21,15,0.25)]"
                        : ""
                    }`}
                  >
                    {p.title.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}