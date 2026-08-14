// src/components/user/Reusable/MagneticWrap.jsx
import { useEffect, useRef, useState } from "react";

/** Nudges its child button toward the cursor, with an elastic release on leave. */
export default function MagneticWrap({ children, className = "", strength = 0.32 }) {
  const wrapRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [pointerFine, setPointerFine] = useState(true);
  const rafRef = useRef(null);

  useEffect(() => {
    setPointerFine(window.matchMedia("(hover:hover) and (pointer:fine)").matches);
  }, []);

  useEffect(() => {
    const tick = () => {
      const btn = wrapRef.current?.querySelector("[data-magnet-target]");
      if (btn) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.2;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.2;
        btn.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseMove = (e) => {
    if (!pointerFine || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    targetRef.current = {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * (strength + 0.1),
    };
  };
  const onMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  return (
    <span ref={wrapRef} className={`inline-block ${className}`} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </span>
  );
}