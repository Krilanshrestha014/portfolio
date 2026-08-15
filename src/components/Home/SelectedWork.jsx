import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * "Selected Work" — calebwu.ca-faithful card stack.
 *
 * Visual model (from calebwu.ca source):
 *   ┌──────────────────────────────┐  z:10  scale:1.00  overlay:0.00  ← active
 *   │  ┌────────────────────────┐  │  z:9   scale:0.88  overlay:0.15
 *   │  │  ┌──────────────────┐  │  │  z:8   scale:0.78  overlay:0.30
 *
 * Each card below the active one is translateY-offset and scaled down,
 * with an increasingly opaque black overlay to create a depth illusion.
 *
 * Interaction:
 *   • Scroll/drag INSIDE the stack  → advances or reverses the deck.
 *   • Scroll/drag OUTSIDE the stack → normal page scroll.
 *   • The departing top card flies out upward (scale 0.85, rotate 8deg)
 *     then is placed at the back, matching the calebwu animation exactly.
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
    date: "2026",
  },
  {
    title: "Yatrasanghi",
    desc: "Re-designing an AI-generated interface for a clearer travel discovery journey.",
    tags: ["UI Design", "Discovery Platform", "Figma"],
    accent: "#4d5fd6",
    glow1: "rgba(76,90,220,0.5)",
    glow2: "rgba(45,30,140,0.32)",
    link: "/yatrasanghi",
    date: "2025 - 26",
  },
  {
    title: "Manna Bakery",
    desc: "Re-designing a mobile ordering experience for a faster, simpler bakery journey.",
    tags: ["UI Design", "Web App", "Figma"],
    accent: "#3f9c78",
    glow1: "rgba(63,156,120,0.45)",
    glow2: "rgba(20,90,70,0.28)",
    link: "/manna-bakery",
    date: "2025",
  },
];

/* ── Stack appearance constants (match calebwu.ca HTML exactly) ── */
// Each entry = [translateY%, scale, overlay-opacity] for card at depth 0,1,2,…
const DEPTH_CONFIG = [
  { ty: "0vh", scale: 1, overlay: 0 },    // active (front)
  { ty: "5vh", scale: 0.94, overlay: 0.15 }, // 1 behind
  { ty: "9vh", scale: 0.88, overlay: 0.30 }, // 2 behind
];

/* ── Easing constant used by calebwu.ca ── */
const EASE = "cubic-bezier(0.62, 0.61, 0.02, 1)";

/* ─── Magnetic custom cursor ─── */
function useMagneticCursor(containerRef) {
  const dotRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const curr = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const [label, setLabel] = useState(null);
  const [active, setActive] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      const hovered = e.target.closest("[data-cursor]");
      setLabel(hovered ? hovered.getAttribute("data-cursor") : null);
    };
    const onEnter = () => setActive(true);
    const onLeave = () => { setActive(false); setLabel(null); };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const tick = () => {
      curr.current.x += (target.current.x - curr.current.x) * 0.18;
      curr.current.y += (target.current.y - curr.current.y) * 0.18;
      if (dotRef.current)
        dotRef.current.style.transform =
          `translate3d(${curr.current.x}px,${curr.current.y}px,0) translate(-50%,-50%)`;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, finePointer]);

  if (!finePointer) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center whitespace-nowrap rounded-full bg-[#f5f2ea] text-[#16150f] shadow-[0_10px_26px_rgba(0,0,0,0.28)] transition-[width,height,opacity,padding] duration-300 ease-[cubic-bezier(.16,.8,.24,1)]"
      style={{
        opacity: active ? 1 : 0,
        width: label ? "auto" : "10px",
        height: label ? "34px" : "10px",
        padding: label ? "0 16px" : 0,
      }}
    >
      <span className={`text-[12px] font-medium tracking-[-0.01em] transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>
        {label}
      </span>
    </div>
  );
}

/* ─── Single card shell ─── */
function CardShell({ project, depthIndex, isLeaving, dragDy, isFront, children }) {
  /*
   * depthIndex 0 = front/active, 1 = one behind, 2 = two behind.
   * isLeaving  = card is flying out (up + rotate).
   * dragDy     = live drag offset (only applied to front card).
   */
  const cfg = DEPTH_CONFIG[Math.min(depthIndex, DEPTH_CONFIG.length - 1)];

  let transform, opacity, zIndex, transition;

  if (isLeaving) {
    // Fly out: same as calebwu's exit keyframe — translateY(-64vh) scale(0.85) rotate(8deg)
    transform = "translateY(-64vh) scale(0.85) rotate(8deg)";
    opacity = 0;
    zIndex = 11;
    transition = `transform 700ms ${EASE} 0ms, opacity 700ms ${EASE} 300ms`;
  } else {
    const dragOffset = isFront && dragDy !== 0 ? `${dragDy}px` : cfg.ty;
    const dragScale = isFront && dragDy !== 0
      ? Math.max(0.96, 1 - Math.abs(dragDy) / 1200)
      : cfg.scale;

    transform = `translateY(${dragOffset}) scale(${dragScale})`;
    opacity = depthIndex < DEPTH_CONFIG.length ? 1 : 0;
    zIndex = 10 - depthIndex;
    transition = isFront && dragDy !== 0
      ? "none"
      : `transform 700ms ${EASE} ${depthIndex * 150}ms, opacity 700ms ${EASE} ${depthIndex * 150}ms`;
  }

  return (
    <div
      className="will-change-transform overflow-hidden min-w-0 flex-1 flex flex-row justify-center absolute w-full"
      style={{ zIndex, opacity, transform, transition, pointerEvents: isFront ? "auto" : "none" }}
    >
      {/* Card body */}
      <div
        className="relative w-full rounded-2xl lg:rounded-xl overflow-hidden aspect-[4/5] sm:aspect-[16/9] md:aspect-[2/1]"
        style={{ maxHeight: "60svh", minHeight: "22rem", maxWidth: "68rem" }}
      >
        {children}

        {/* Dark overlay — deepens for cards further back */}
        <div
          className="absolute inset-0 bg-black pointer-events-none rounded-xl"
          style={{
            opacity: cfg.overlay,
            transition: `opacity 700ms ${EASE} ${depthIndex * 150}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Front card content ─── */
function CardContent({ project }) {
  return (
    <div
      data-cursor="Swipe"
      className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 text-[#eceae1] select-none"
      style={{
        background: `radial-gradient(120% 90% at 28% 12%, ${project.glow1}, transparent 60%),
                     radial-gradient(90% 70% at 76% 88%, ${project.glow2}, transparent 65%),
                     #0a0908`,
        cursor: "none",
      }}
    >
      {/* top row */}
      <div className="flex justify-between text-xs tracking-[0.08em] text-[rgba(245,242,234,0.55)]">
        <span>{String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}</span>
        <span style={{ color: project.accent }}>{project.date}</span>
      </div>

      {/* bottom content */}
      <div>
        <div className="flex items-center gap-2.5 mb-3.5">
          <svg className="w-5 h-5 flex-shrink-0 text-[#f5f2ea]" viewBox="0 0 24 24" fill="none">
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
              data-cursor="Click to Open"
              className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium bg-[#f5f2ea] text-[#16150f] rounded-none hover:rounded-xl transition-[border-radius,box-shadow] duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
              style={{ cursor: "none" }}
            >
              Case Study
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium bg-[#f5f2ea] text-[#16150f] opacity-45 pointer-events-none">
              Case Study
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export default function SelectedWork() {
  // `order` = array of project indices in stack order, front first.
  const [order, setOrder] = useState(PROJECTS.map((_, i) => i));
  const [leavingIdx, setLeavingIdx] = useState(null); // which order-position is flying out
  const [current, setCurrent] = useState(0);    // 0-based page counter for pagination
  const [headerIn, setHeaderIn] = useState(false);
  const [paginateIn, setPaginateIn] = useState(false);

  // drag state
  const [dragDy, setDragDy] = useState(0);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const isInsideStack = useRef(false);

  const pinRef = useRef(null);
  const stackRef = useRef(null);
  const headerRef = useRef(null);
  const animating = useRef(false);

  const customCursor = useMagneticCursor(pinRef);

  /* ── Header & pagination reveal ── */
  useEffect(() => {
    const observe = (el, cb, threshold = 0.2) => {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { cb(); io.unobserve(e.target); } }),
        { threshold }
      );
      if (el) io.observe(el);
      return () => io.disconnect();
    };
    const u1 = observe(headerRef.current, () => setHeaderIn(true));
    const u2 = observe(stackRef.current, () => setPaginateIn(true), 0.1);
    return () => { u1(); u2(); };
  }, []);

  /* ── Advance: move front card to back ── */
  const advance = useCallback(() => {
    if (animating.current || PROJECTS.length < 2) return;
    animating.current = true;
    setLeavingIdx(0); // front card leaves
    setCurrent((c) => (c + 1) % PROJECTS.length);
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.push(next.shift()); // rotate: move front to back
        return next;
      });
      setLeavingIdx(null);
      animating.current = false;
    }, 700);
  }, []);

  /* ── Reverse: move back card to front ── */
  const reverse = useCallback(() => {
    if (animating.current || PROJECTS.length < 2) return;
    animating.current = true;
    setCurrent((c) => (c - 1 + PROJECTS.length) % PROJECTS.length);
    setOrder((prev) => {
      const next = [...prev];
      next.unshift(next.pop()); // rotate backwards
      return next;
    });
    setTimeout(() => { animating.current = false; }, 700);
  }, []);

  /* ── Track inside/outside ── */
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const onEnter = () => { isInsideStack.current = true; };
    const onLeave = () => { isInsideStack.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Wheel inside stack → advance/reverse; vertical outside → scroll ── */
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    let cooldown = false;

    const onWheel = (e) => {
      if (!isInsideStack.current) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Only capture when scroll is predominantly vertical (natural page-scroll direction)
      // OR when it's horizontal (trackpad side-swipe).
      // We capture both and advance the deck; suppress scroll.
      if (absY > 8 || absX > 8) {
        e.preventDefault();
        if (cooldown) return;
        cooldown = true;
        setTimeout(() => { cooldown = false; }, 750);

        const delta = absY >= absX ? e.deltaY : e.deltaX;
        if (delta > 0) advance();
        else reverse();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance, reverse]);

  /* ── Touch / pointer drag on stack ── */
  const onPointerDown = (e) => {
    if (animating.current) return;
    dragging.current = true;
    startY.current = e.clientY;
    startX.current = e.clientX;
    setDragDy(0);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dy = e.clientY - startY.current;
    const dx = e.clientX - startX.current;
    // Visually follow the stronger drag direction
    setDragDy(Math.abs(dx) > Math.abs(dy) ? dx : dy);
  };

  const onPointerUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    const THRESHOLD = 50;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (dy < -THRESHOLD || dx < -THRESHOLD) advance();
    else if (dy > THRESHOLD || dx > THRESHOLD) reverse();

    setDragDy(0);
  };

  const onPointerCancel = () => { dragging.current = false; setDragDy(0); };

  /* ── Jump to specific project via pill nav ── */
  const jumpTo = (targetProjectIdx) => {
    if (animating.current) return;
    const frontProjectIdx = order[0];
    if (frontProjectIdx === targetProjectIdx) return;

    // How many forward steps to bring targetProjectIdx to front
    const stepsForward = order.indexOf(targetProjectIdx);

    let step = 0;
    const doStep = () => {
      if (step >= stepsForward) return;
      step++;
      advance();
      setTimeout(doStep, 760);
    };
    doStep();
  };

  return (
    <section id="work" className="bg-[#ffffff] pt-[60px] pb-[110px] font-['Switzer',sans-serif]">
      {customCursor}

      <div ref={pinRef} className="relative flex flex-col items-center justify-center [@media(pointer:fine)]:cursor-none">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`mb-16 text-center transition-all duration-[900ms] ease-[cubic-bezier(.16,.8,.24,1)] ${headerIn ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-7 blur-[6px]"
              }`}
          >
            <h2 className="font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,4.4vw,3rem)] text-[#16150f]">
              Selected Work
            </h2>
          </div>  

          {/* ── Card stack ── */}
          <div
            ref={stackRef}
            className="relative flex flex-row justify-center items-center w-full [touch-action:none]"
            style={{ height: "clamp(350px, 60svh, 480px)" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            {/*
             * Render cards from back to front so z-index stacking works visually.
             * order[0] = front, order[last] = back.
             */}
            {[...order].reverse().map((projectIdx, reversedDepth) => {
              const depth = (order.length - 1) - reversedDepth; // 0=front
              const isLeaving = leavingIdx === 0 && depth === 0;
              const isFront = depth === 0;

              return (
                <CardShell
                  key={projectIdx}
                  project={PROJECTS[projectIdx]}
                  depthIndex={depth}
                  isLeaving={isLeaving}
                  dragDy={isFront ? dragDy : 0}
                  isFront={isFront}
                >
                  <CardContent project={PROJECTS[projectIdx]} />
                </CardShell>
              );
            })}
          </div>



          {/* ── Pill pagination — "1 of N" + overlapping avatar dots ── */}
          <div
            className={`relative z-[20] flex justify-center transition-all duration-700 ease-[cubic-bezier(.16,.8,.24,1)] ${paginateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: paginateIn ? "200ms" : "0ms", marginTop: "calc(1.5rem + 10vh)" }}
          >
            <div className="inline-flex items-center gap-3.5 pl-5 pr-3 py-2.5 rounded-full bg-[#f5f2ea] border border-[rgba(22,21,15,0.12)] shadow-[0_12px_30px_rgba(22,21,15,0.06)]">
              <span className="text-[13px] text-[#8f8c81] whitespace-nowrap">
                {current + 1} of {PROJECTS.length}
              </span>

              {/* Overlapping avatar circles with tooltip labels — exact calebwu.ca pattern */}
              <div className="flex items-center group/pill pr-1">
                {PROJECTS.map((p, i) => {
                  const isCurrent = i === order[0];
                  return (
                    <button
                      key={p.title}
                      type="button"
                      data-cursor={isCurrent ? null : "Switch"}
                      onClick={() => jumpTo(i)}
                      aria-label={`Go to ${p.title}`}
                      className="group/thumb relative transition-[margin] duration-[450ms] ease-[cubic-bezier(.62,.61,.02,1)] cursor-pointer"
                      style={{
                        zIndex: isCurrent ? 5 : PROJECTS.length - i,
                        marginLeft: i === 0 ? 0 : "-0.75rem",
                      }}
                    >
                      {/* Tooltip */}
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 translate-y-[6px] scale-[0.96] origin-bottom opacity-0 transition-all duration-300 ease-out group-hover/thumb:-translate-y-0 group-hover/thumb:opacity-100 group-hover/thumb:scale-100 pointer-events-none z-50 whitespace-nowrap">
                        <span className="block bg-[#16150f] text-[#f5f2ea] text-[11px] rounded-md px-2.5 py-1.5 shadow-md">
                          {p.title}
                        </span>
                      </span>

                      {/* Avatar circle */}
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-[#f5f2ea] flex items-center justify-center text-white text-[11px] font-semibold overflow-hidden transition-transform duration-300 ease-[cubic-bezier(.16,.8,.24,1)] ${isCurrent ? "scale-[1.18] -translate-y-0.5 shadow-[0_6px_16px_rgba(22,21,15,0.25)]" : ""
                          }`}
                        style={{ background: p.accent }}
                      >
                        {p.title.charAt(0)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>



      </div>
    </section>
  );
}