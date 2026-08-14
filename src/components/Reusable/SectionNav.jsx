import { memo, useEffect, useRef, useState } from "react";

const SectionNav = memo(function SectionNav({
  sections = [],
  scrollOffset = 96,
  className = "",
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const clickLockRef = useRef(false);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore intersection updates triggered by our own click-scroll,
        // so a click doesn't get immediately overridden mid-scroll.
        if (clickLockRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${scrollOffset}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, scrollOffset]);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    clickLockRef.current = true;

    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top, behavior: "smooth" });

    // Release the lock once the smooth scroll has settled.
    window.clearTimeout(handleClick._t);
    handleClick._t = window.setTimeout(() => {
      clickLockRef.current = false;
    }, 700);
  };

  return (
    <nav
      aria-label="Case study sections"
      className={`flex flex-col gap-4 ${className}`}
    >
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={handleClick(id)}
            aria-current={isActive ? "true" : undefined}
            className={`text-[14px] leading-none transition-colors duration-300 ${
              isActive
                ? "font-medium text-black"
                : "text-[#00000047] hover:text-neutral-500"
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
});

export default SectionNav;