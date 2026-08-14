import { memo } from "react";

/**
 * GrainOverlay
 * ------------
 * A full-bleed, non-interactive film-grain texture layered over a section
 * so flat color fills don't read as sterile vector gradients. Built from a
 * single tiled SVG `feTurbulence` filter rather than a raster PNG, so it
 * stays crisp at any viewport size with zero network requests.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <GrainOverlay opacity={0.045} />
 *     ...content...
 *   </section>
 *
 * Notes:
 * - Renders with `pointer-events-none` and `aria-hidden` since it's purely
 *   decorative and must never intercept clicks or be announced by AT.
 * - `position: absolute; inset: 0` by default — the parent must be
 *   `position: relative` (or similar) for it to fill correctly.
 */
const GrainOverlay = memo(function GrainOverlay({
  opacity = 0.05,
  blendMode = "overlay",
  baseFrequency = 0.85,
  animate = false,
  className = "",
  style = {},
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode,
        ...style,
      }}
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={2}
            stitchTiles="stitch"
            seed={7}
            result="noise"
          >
            {animate && (
              <animate
                attributeName="seed"
                values="1;25;50;75;1"
                dur="1.8s"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
});

export default GrainOverlay;