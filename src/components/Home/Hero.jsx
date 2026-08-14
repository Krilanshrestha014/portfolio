import { forwardRef, useEffect, useState } from "react";
import MagneticWrap from "../Reusable/MagneticWrap";
import MagneticText from "../Reusable/MagneticText";
import CursorSpotlight from "../Reusable/CursorSpotlight";
import GrainOverlay from "../Reusable/GrainOverlay";
import { useCursor } from "../../context/CursorContext";

/** `ref` is forwarded to the <section> so the page can track its bounds for the nav theme. */
const Hero = forwardRef(function Hero(_props, ref) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { hoverCursor, hoverText } = useCursor();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-[100svh] flex flex-col justify-center items-start text-left pt-[120px] pb-[60px] relative overflow-hidden"
    >
      {/* background glow that tracks the pointer across the hero */}
      <CursorSpotlight />
      {/* filmic texture so the flat color field doesn't read as a vector fill */}
      <GrainOverlay opacity={0.045} />

      {/* eyebrow tag — mirrors the small persistent badge pattern on reference sites */}
      <div
        className="absolute top-8 left-6 sm:left-10 md:left-16 z-10 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-700"
        style={{
          color: "var(--muted-2)",
          opacity: heroLoaded ? 1 : 0,
          transform: heroLoaded ? "translateY(0)" : "translateY(-8px)",
          transitionDelay: "200ms",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--ink)" }} />
      </div>

      <div className="max-w-[900px] w-full mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* big kinetic name — each character rises into place in a cascading wave,
            the entrance layer running independently of the cursor-proximity float
            so the reveal never gets clobbered by the rAF-driven hover transform */}
        <h1 className="font-bold text-[clamp(3rem,8vw,6.4rem)] tracking-tight leading-[0.95]">
          <span className="block">
            <MagneticText text="Krilan Bata" revealed={heroLoaded} revealDelay={0} />
          </span>
          <span className="block">
            <MagneticText text="Shrestha." revealed={heroLoaded} revealDelay={160} />
          </span>
        </h1>

        {/* role subtitle — directly under the name, echoing the reference's "role since year" line */}
        <div
          className="flex items-center gap-3 mt-5 transition-all duration-700"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "1000ms",
          }}
        >
          <span className="h-px w-8" style={{ background: "var(--line)" }} />
          <p {...hoverText()} className="text-[clamp(16px,1.6vw,19px)] font-medium tracking-tight">
            UI / UX Designer
          </p>
        </div>

        <p
          className="text-[15px] mt-2.5 leading-relaxed max-w-[360px] transition-all duration-700"
          style={{
            color: "var(--muted)",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "1140ms",
          }}
        >
          Creating digital experiences where simplicity meets purpose.
        </p>

        <div
          className="flex flex-wrap gap-3.5 mt-[38px] transition-all duration-700"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "1280ms",
          }}
        >
          <MagneticWrap>
            <a
              href="#work"
              data-magnet-target
              {...hoverCursor("View")}
              className="inline-flex items-center gap-1.5 px-6 py-[15px] text-sm font-medium transition-all duration-500 hover:rounded-xl"
              style={{ background: "var(--ink)", color: "var(--cream)" }}
            >
              View Work
            </a>
          </MagneticWrap>
          <MagneticWrap>
            <a
              href="#contact"
              data-magnet-target
              {...hoverCursor("Chat")}
              className="inline-flex items-center gap-1.5 px-6 py-[15px] text-sm font-medium border transition-all duration-500 hover:rounded-xl hover:border-[var(--ink)]"
              style={{ borderColor: "var(--line)" }}
            >
              Let's Chat
            </a>
          </MagneticWrap>
        </div>
      </div>

     

      {/* bottom bar — location left, animated scroll cue right, replacing the static dot */}
      <div
        className="absolute bottom-10 sm:bottom-14 left-0 right-0 px-6 sm:px-10 md:px-16 flex items-center justify-between text-[13px] z-10 transition-all duration-700"
        style={{
          color: "var(--muted-2)",
          opacity: heroLoaded ? 1 : 0,
          transitionDelay: "1550ms",
        }}
      >

        <div className="flex items-center gap-2.5">
          <span className="uppercase tracking-[0.14em] text-[11px] font-medium">Scroll</span>
          <span className="relative h-6 w-px overflow-hidden" style={{ background: "var(--line)" }}>
            <span
              className="absolute left-0 top-0 w-full h-1/2"
              style={{
                background: "var(--ink)",
                animation: "scrollcue 1.6s ease-in-out infinite",
              }}
            />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollcue {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
});

export default Hero;