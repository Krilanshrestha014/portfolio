import { forwardRef, useEffect, useState } from "react";
import MagneticWrap from "../Reusable/MagneticWrap";
import MagneticText from "../Reusable/MagneticText";
import CursorSpotlight from "../Reusable/CursorSpotlight";
import GrainOverlay from "../Reusable/GrainOverlay";
import { useCursor } from "../../context/CursorContext";

/** `ref` is forwarded to the <section> so the page can track its bounds for the nav theme. */
const Hero = forwardRef(function Hero(_props, ref) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { hoverCursor } = useCursor();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-[65svh] md:min-h-[100svh] flex flex-col justify-center items-center text-center pt-[100px] pb-[40px] md:pt-[120px] md:pb-[60px] relative overflow-hidden"
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

      <div className="max-w-[900px] w-full mx-auto px-6 sm:px-10 md:px-16 relative z-10 flex flex-col items-center">
        {/* big kinetic name — each character rises into place in a cascading wave,
            the entrance layer running independently of the cursor-proximity float
            so the reveal never gets clobbered by the rAF-driven hover transform */}
        <h1 className="font-bold text-[clamp(2.2rem,10vw,128px)] tracking-tight leading-[0.95] whitespace-nowrap">
          <MagneticText text="Krilan Bata Shrestha" revealed={heroLoaded} revealDelay={0} />
        </h1>

        <p
          className="text-[15px] mt-5 leading-relaxed max-w-auto transition-all duration-700"
          style={{
            color: "#777777",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "1140ms",
          }}
        >
          Creating digital experiences where simplicity meets purpose.
        </p>

        <div
          className="flex justify-center mt-[38px] transition-all duration-700"
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
        </div>
      </div>
    </section>
  );
});

export default Hero;