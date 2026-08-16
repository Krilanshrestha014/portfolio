import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DEFAULT_SECTIONS = [
  { id: "home", theme: "light" },
  { id: "about", theme: "dark" },
  { id: "work", theme: "light" },
  { id: "contact", theme: "light" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" }, // real route — not an in-page section
  { label: "About", id: "about" },
  { label: "Selected Work", id: "work" },
  { label: "Contact", id: "contact" },
];

const CONTACT_EMAIL = "krilanshrestha@gmail.com";

export default function Navbar({
  sections = DEFAULT_SECTIONS,
  logo = "KRILAN",
  forceTheme = null, // "light" | "dark" | null
  lightBg = "#F9F9F7", // main bg color
}) {
  const [navDark, setNavDark] = useState(forceTheme === "dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const chatWrapRef = useRef(null);
  const chatBtnRef = useRef(null);
  const rafRef = useRef(null);

  // adaptive navbar theme — samples a fixed point below the header against
  // whichever section currently occupies that point.
  // Skipped entirely when `forceTheme` is set (static pages like Krilan).
  useEffect(() => {
    if (forceTheme) {
      setNavDark(forceTheme === "dark");
      return;
    }

    const headerLine = 46; // roughly mid-header, matches the original
    let lastTheme = null;

    function tick() {
      let theme = "light";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= headerLine && r.bottom > headerLine) {
          theme = s.theme;
          break;
        }
      }
      if (theme !== lastTheme) {
        lastTheme = theme;
        setNavDark(theme === "dark");
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sections, forceTheme]);

  // magnetic "Let's chat" button
  useEffect(() => {
    const isTouch = window.matchMedia("(hover:none), (pointer:coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = chatWrapRef.current;
    const btn = chatBtnRef.current;
    if (!wrap || !btn || isTouch || reduceMotion) return;

    function onMove(e) {
      const r = wrap.getBoundingClientRect();
      const relX = e.clientX - r.left - r.width / 2;
      const relY = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${relX * 0.28}px, ${relY * 0.4}px)`;
    }
    function onLeave() {
      btn.style.transform = "translate(0,0)";
    }
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // lock body scroll while mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // if we land on "/" with a hash (came from another page via goToSection),
  // scroll to that section once it's mounted.
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.slice(1);
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [location.pathname, location.hash]);

  // section links: scroll in place on "/", otherwise navigate to "/#id"
  // and let the effect above pick up the scroll after mount.
  const goToSection = (id) => (e) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      window.location.hash = id;
    }
  };

  // Home: if already on home, scroll to top. Otherwise route to home.
  const goHome = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  // "Let's chat" — opens the user's email client instead of scrolling to #contact
  const closeMobileNav = () => setMobileOpen(false);

  return (
    <>
      {/* corner dots */}
      <span
        className="fixed top-[30px] left-[22px] w-[5px] h-[5px] rounded-full z-[499] transition-colors duration-700 ease-[cubic-bezier(.25,.46,.45,.94)]"
        style={{ background: navDark ? "rgba(245,242,234,0.35)" : "rgba(22,21,15,0.25)" }}
      />
      <span
        className="fixed top-[30px] right-[22px] w-[5px] h-[5px] rounded-full z-[499] transition-colors duration-700 ease-[cubic-bezier(.25,.46,.45,.94)]"
        style={{ background: navDark ? "rgba(245,242,234,0.35)" : "rgba(22,21,15,0.25)" }}
      />
      
      <header
        className="fixed top-0 left-0 right-0 z-[500] backdrop-blur-[10px] transition-colors duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] font-['Switzer',sans-serif] border-b"
        style={{
          backgroundColor: navDark ? "rgba(13,12,10,0.82)" : lightBg,
          color: navDark ? "#eceae1" : "#16150f",
          borderBottomColor: navDark ? "rgba(245,242,234,0.12)" : "#0F0F0F14",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-[auto_1fr_auto] items-center px-6 md:px-16 py-[26px]">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-[600] flex flex-col gap-[5px] w-[22px] py-1.5 justify-self-start"
          >
            <span
              className="block h-0.5 w-full bg-current transition-transform duration-[450ms] ease-[cubic-bezier(.16,.8,.24,1)]"
              style={{ transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-0.5 w-full bg-current transition-opacity duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-full bg-current transition-transform duration-[450ms] ease-[cubic-bezier(.16,.8,.24,1)]"
              style={{ transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
            />
          </button>

          <a
            href="/"
            onClick={goHome}
            className="font-bold text-sm tracking-[0.14em] text-current cursor-pointer hover:opacity-80 transition-opacity justify-self-center"
          >
            {logo}
          </a>

          {/* hidden on mobile — moved into the mobile nav overlay below */}
          <span ref={chatWrapRef} className="hidden md:inline-block justify-self-end">
            <a
              ref={chatBtnRef}
              href={`mailto:${CONTACT_EMAIL}`}
              data-cursor="Chat"
              className="inline-flex items-center gap-1.5 text-sm border-b border-[#c07a45] pb-0.5 text-[#c07a45] transition-opacity duration-300 group"
            >
              Let&apos;s chat{" "}
              <span className="inline-block transition-transform duration-[350ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </span>
        </div>
      </header>

      {/* mobile nav overlay */}
      <nav
        className={`fixed inset-0 z-[400] bg-[rgba(245,242,234,0.97)] backdrop-blur-[6px] px-6 md:px-16 pt-24 pb-10 flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="border-t border-[rgba(22,21,15,0.12)]">
          {NAV_LINKS.map((link, i) => {
            const isRoute = Boolean(link.href);
            return (
              <li key={link.href || link.id} className="border-b border-[rgba(22,21,15,0.12)]">
                <a
                  href={isRoute ? link.href : `#${link.id}`}
                  onClick={isRoute ? goHome : goToSection(link.id)}
                  className={`block font-bold text-[clamp(28px,5vw,40px)] tracking-[-0.02em] py-[18px] px-0.5 text-[#16150f] hover:text-[#c07a45] transition-colors ${
                    mobileOpen ? "animate-[navIn_0.7s_cubic-bezier(.16,.8,.24,1)_forwards]" : "opacity-0"
                  }`}
                  style={mobileOpen ? { animationDelay: `${0.12 + i * 0.08}s` } : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}

          {/* "Let's chat" — only reachable via hamburger on mobile (hidden in header on mobile above),
              opens the user's email client with the contact address pre-filled */}
          <li className="md:hidden border-b border-[rgba(22,21,15,0.12)]">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={closeMobileNav}
              className={`inline-flex items-center gap-2 font-bold text-[clamp(28px,5vw,40px)] tracking-[-0.02em] py-[18px] px-0.5 text-[#c07a45] transition-colors ${
                mobileOpen ? "animate-[navIn_0.7s_cubic-bezier(.16,.8,.24,1)_forwards]" : "opacity-0"
              }`}
              style={mobileOpen ? { animationDelay: `${0.12 + NAV_LINKS.length * 0.08}s` } : undefined}
            >
              Let&apos;s chat <span className="text-2xl">→</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* keyframes for the staggered mobile-link reveal (scoped, no config changes needed) */}
      <style>{`
        @keyframes navIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}