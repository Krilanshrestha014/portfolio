// src/components/user/Reusable/MagneticText.jsx
import { useEffect, useMemo, useRef } from "react";

/**
 * Splits `text` into per-character spans that lift/shift as the cursor
 * passes nearby — a lightweight "reactive headline" effect. Falls back
 * to plain text on touch devices.
 */
export default function MagneticText({ text, className = "", radius = 90, lift = 14 }) {
  const containerRef = useRef(null);
  const charRefs = useRef([]);
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover:none), (pointer:coarse)").matches;
    if (isTouch || !containerRef.current) return;

    let raf;
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      charRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
        const t = Math.max(0, 1 - dist / radius);
        el.style.transform = `translateY(${-lift * t}px) scale(${1 + 0.12 * t})`;
        el.style.opacity = `${0.75 + 0.25 * t}`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [radius, lift]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((ch, i) => (
        <span
          key={i}
          ref={(el) => (charRefs.current[i] = el)}
          className="inline-block will-change-transform transition-[opacity] duration-150 ease-out"
          style={{ transformOrigin: "50% 100%" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}