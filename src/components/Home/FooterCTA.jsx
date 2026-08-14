import React, { useEffect, useRef, useState } from "react";

/**
 * Footer CTA block — "Let's build something worth remembering."
 * Faithful React + Tailwind port of the original .footer-top / .footer-cta /
 * .footer-links markup, including the scroll-triggered fade-up reveal.
 *
 * Meant to sit at the top of the <Footer /> component, but works standalone
 * too — it renders its own reveal animation independent of anything else.
 *
 * Requires the "Switzer" font (Fontshare) loaded once in your document head:
 *   <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,700&display=swap" rel="stylesheet" />
 */

const LINKEDIN_ICON_PATH =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z";

export default function FooterCTA({
  email = "krilanshrestha@gmail.com",
  resumeHref = "/resume.pdf",
  linkedinHref = "https://www.linkedin.com/in/krilan-bata-shrestha-415590293/",
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-wrap items-end justify-between gap-8 pb-9 font-['Switzer',sans-serif] transition-all duration-[900ms] ease-[cubic-bezier(.16,.8,.24,1)] ${
        inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-7 blur-[6px]"
      }`}
    >
      <div className="max-w-[520px]">
        <h3 className="font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(1.9rem,4.2vw,3rem)] text-[#16150f]">
          <a
            href={`mailto:${email}`}
            data-cursor="Email"
            className="border-b border-transparent hover:border-[#16150f] hover:text-[#c07a45] transition-colors duration-[350ms]"
          >
            Let&apos;s build something
            <br />
            worth remembering.
          </a>
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <a
          href={`mailto:${email}`}
          data-cursor="Email"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium px-[18px] py-[11px] rounded-full border border-[rgba(22,21,15,0.12)] text-[#16150f] hover:border-[#16150f] hover:bg-[#16150f] hover:text-[#f5f2ea] transition-colors duration-300"
        >
          Email
        </a>
        <a
          href={resumeHref}
          download
          data-cursor="Download"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium px-[18px] py-[11px] rounded-full border border-[rgba(22,21,15,0.12)] text-[#16150f] hover:border-[#16150f] hover:bg-[#16150f] hover:text-[#f5f2ea] transition-colors duration-300"
        >
          Resume
        </a>
        <a
          href="#work"
          data-cursor="View"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium px-[18px] py-[11px] rounded-full border border-[rgba(22,21,15,0.12)] text-[#16150f] hover:border-[#16150f] hover:bg-[#16150f] hover:text-[#f5f2ea] transition-colors duration-300"
        >
          Projects
        </a>
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-cursor="Open"
          className="group inline-flex items-center justify-center aspect-square p-[11px] rounded-full border border-[rgba(22,21,15,0.12)] hover:border-[#16150f] hover:bg-[#16150f] transition-colors duration-300"
        >
          <svg
            className="w-4 h-4 fill-[#16150f] group-hover:fill-[#f5f2ea] transition-colors duration-300"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={LINKEDIN_ICON_PATH} />
          </svg>
        </a>
      </div>
    </div>
  );
}