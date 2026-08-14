// src/components/Reusable/CursorSpotlight.jsx
import { useEffect, useRef } from "react";

/**
 * Drop this inside any relatively-positioned section to give its
 * background a restrained, colored glow that follows the pointer.
 * Uses two hues — a warm primary for the halo/core, a cooler
 * secondary for the tracing ring — for a subtle duotone effect
 * rather than a flat single-color spotlight. Edges are masked so
 * it fades into the section instead of clipping at its bounds.
 */
export default function CursorSpotlight({
  primary = "var(--glow-primary, 199, 138, 74)", // warm amber — RGB triplet
  secondary = "var(--glow-secondary, 108, 140, 168)", // cool slate blue — RGB triplet
  haloSize = 620,
  coreSize = 200,
  ringSize = 140,
  haloOpacity = 0.1,
  coreOpacity = 0.07,
  ringOpacity = 0.16,
  blend = "normal", // "screen" reads well on dark sections, "multiply" on light ones
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let tx = 0,
      ty = 0,
      hx = 0,
      hy = 0, // halo — slow, trailing
      kx = 0,
      ky = 0, // core — medium
      rx = 0,
      ry = 0, // ring — fastest, most precise
      raf;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const onEnter = () => el.style.setProperty("--spot-opacity", "1");
    const onLeave = () => el.style.setProperty("--spot-opacity", "0");

    section.style.position = section.style.position || "relative";
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    const loop = () => {
      hx += (tx - hx) * 0.055;
      hy += (ty - hy) * 0.055;
      kx += (tx - kx) * 0.11;
      ky += (ty - ky) * 0.11;
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      el.style.setProperty("--halo-x", `${hx}px`);
      el.style.setProperty("--halo-y", `${hy}px`);
      el.style.setProperty("--core-x", `${kx}px`);
      el.style.setProperty("--core-y", `${ky}px`);
      el.style.setProperty("--ring-x", `${rx}px`);
      el.style.setProperty("--ring-y", `${ry}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ringStop = (ringSize * 0.42) | 0;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-0 transition-opacity duration-700 ease-out ${className}`}
      style={{
        opacity: "var(--spot-opacity, 0)",
        mixBlendMode: blend,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        background: `
          radial-gradient(${ringSize}px circle at var(--ring-x, 50%) var(--ring-y, 50%),
            transparent ${ringStop - 18}px,
            rgba(${secondary}, ${ringOpacity}) ${ringStop}px,
            transparent ${ringStop + 2}px
          ),
          radial-gradient(${coreSize}px circle at var(--core-x, 50%) var(--core-y, 50%), rgba(${primary}, ${coreOpacity}), transparent 65%),
          radial-gradient(${haloSize}px circle at var(--halo-x, 50%) var(--halo-y, 50%), rgba(${primary}, ${haloOpacity}), transparent 72%)
        `,
      }}
    />
  );
}