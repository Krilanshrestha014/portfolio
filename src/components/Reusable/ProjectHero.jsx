import { memo } from "react";

const ProjectHero = memo(function ProjectHero({
  title,
  subtitle,
  meta = [],
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  className = "",
}) {
  return (
    <section
      className={`w-full bg-[#ffffff]  mt-10 ${className}`}
    >
      <div className="px-6 sm:px-14 md:px-16 pt-20 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
        {/* Title */}
        <p className="font-medium lg:text-6xl text-2xl  leading-[1.15] tracking-tight text-black max-w-[1200px]">
          {title}
          {subtitle && (
            <>
              <br />
              {subtitle}
            </>
          )}
        </p>

        {/* Meta row: Role / Team / Duration */}
        {meta.length > 0 && (
          <div className="flex flex-wrap gap-x-20 gap-y-4 mt-14">
            {meta.map(({ label, value }) => (
              <div key={label} className="min-w-[90px]">
                <div className="text-[12px] font-medium uppercase tracking-wide text-[#0000003D]">
                  {label}
                </div>
                <div className="text-[16px] text-[#777777] mt-1.5">
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#00000014] mx-20" />

      {/* Description + CTA */}
      <div className="px-8 sm:px-14 md:px-20 py-10 sm:py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {description && (
          <p className="text-[16px] leading-relaxed text-[#777777] max-w-[520px]">
            {description}
          </p>
        )}

        {ctaLabel && (
          <a
            href={ctaHref}
            onClick={onCtaClick}
            target={ctaHref?.startsWith("http") ? "_blank" : undefined}
            rel={ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center shrink-0 px-6 py-3 text-[13px] font-medium rounded-sm bg-neutral-900 text-white transition-colors duration-300 hover:bg-neutral-700"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
});

export default ProjectHero;