// src/context/CursorContext.jsx
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const CursorContext = createContext(null);

/**
 * Wrap the page in <CursorProvider> once. Tracks pointer position with
 * velocity-aware smoothing (so the cursor blob can stretch/skew along
 * its direction of travel) and exposes `hoverCursor` / `hoverText` so
 * any section can opt into the custom cursor without re-implementing
 * the tracking math.
 */
export function CursorProvider({ children }) {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    hovering: false,
    label: "",
    onDark: false,
    variant: "default",
    stretch: 1,
    angle: 0,
  });
  const [isTouch, setIsTouch] = useState(true);
  const raw = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover:none), (pointer:coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cx = 0,
      cy = 0,
      raf;

    const move = (e) => {
      raw.current.mx = e.clientX;
      raw.current.my = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const loop = () => {
      const { mx, my } = raw.current;
      const ease = prefersReduced ? 1 : 0.18;
      const prevX = cx,
        prevY = cy;
      cx += (mx - cx) * ease;
      cy += (my - cy) * ease;

      const dx = cx - prevX;
      const dy = cy - prevY;
      const speed = Math.min(Math.hypot(dx, dy) / 12, 1); // 0..1
      const angle = speed > 0.02 ? (Math.atan2(dy, dx) * 180) / Math.PI : undefined;

      setCursor((c) => ({
        ...c,
        x: cx,
        y: cy,
        stretch: prefersReduced ? 1 : 1 + speed * 0.55,
        angle: angle ?? c.angle,
      }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  /** Standard round cursor with a text label (e.g. "View", "Drag"). */
  const hoverCursor = useCallback(
    (label, onDark = false, variant = "default") => ({
      onMouseEnter: () => setCursor((c) => ({ ...c, hovering: true, label, onDark, variant })),
      onMouseLeave: () => setCursor((c) => ({ ...c, hovering: false, label: "" })),
    }),
    []
  );

  /** Slim variant for hovering over body copy — grows the dot only, no label. */
  const hoverText = useCallback(
    (onDark = false) => ({
      onMouseEnter: () => setCursor((c) => ({ ...c, hovering: true, label: "", onDark, variant: "text" })),
      onMouseLeave: () => setCursor((c) => ({ ...c, hovering: false, variant: "default" })),
    }),
    []
  );

  return (
    <CursorContext.Provider value={{ cursor, setCursor, isTouch, hoverCursor, hoverText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within a <CursorProvider>");
  return ctx;
}