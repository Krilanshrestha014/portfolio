// src/components/user/Reusable/CustomCursor.jsx

import { useCursor } from "../../context/CursorContext";


export default function CustomCursor() {
  const { cursor, isTouch } = useCursor();
  if (isTouch) return null;

  const { x, y, hovering, label, onDark, variant, stretch, angle } = cursor;
  const isTextVariant = variant === "text" && hovering;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%,-50%) rotate(${angle}deg) scale(${stretch}, ${
          2 - stretch
        }) rotate(${-angle}deg)`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center mix-blend-difference border transition-[width,height,background-color] duration-200 ease-out ${
          hovering && !isTextVariant
            ? "w-[76px] h-[76px] bg-[var(--ink)] border-transparent"
            : isTextVariant
            ? "w-[10px] h-[10px] bg-[var(--ink)] border-transparent"
            : "w-[32px] h-[32px] bg-transparent"
        } ${
          !hovering
            ? onDark
              ? "border-[rgba(245,242,234,0.6)]"
              : "border-[rgba(22,21,15,0.55)]"
            : "border-transparent"
        }`}
      >
        <span
          className="text-[11px] font-semibold tracking-wide text-[var(--cream)] whitespace-nowrap transition-opacity duration-200"
          style={{ opacity: hovering && !isTextVariant && label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}