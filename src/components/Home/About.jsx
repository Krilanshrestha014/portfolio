import { forwardRef, useEffect, useRef, useState } from "react";
import Reveal from "../Reusable/Reveal";
import { useCursor } from "../../context/CursorContext";

const ABOUT_WORDS =
  "I'm Krilan Bata Shrestha, a UI/UX Designer creating digital experiences where user needs, business goals, and thoughtful design come together. I believe simplicity creates meaningful experiences.".split(
    /\s+/
  );

/** `ref` is forwarded to the <section> so the page can track its bounds for the nav theme. */
const About = forwardRef(function About(_props, ref) {
  const aboutTextRef = useRef(null);
  const [aboutLit, setAboutLit] = useState(false);
  const { setCursor } = useCursor();

  /* about paragraph word-by-word reveal on scroll into view */
  useEffect(() => {
    const el = aboutTextRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutLit(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-[100px] sm:py-[120px]"
      style={{ background: "var(--dark)", color: "var(--on-dark)" }}
      onMouseEnter={() => setCursor((c) => ({ ...c, onDark: true }))}
      onMouseLeave={() => setCursor((c) => ({ ...c, onDark: false }))}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t" style={{ borderColor: "var(--line-dark)" }}>
          <Reveal className="stat">
            <span className="block font-bold text-[clamp(2.4rem,4.6vw,3.4rem)]" style={{ color: "var(--cream)" }}>
              4
            </span>
            <span className="block mt-2.5 text-[13px]" style={{ color: "var(--muted)" }}>
              Years of experience
            </span>
          </Reveal>
          <Reveal delay={80} className="stat">
            <span className="block font-bold text-[clamp(2.4rem,4.6vw,3.4rem)]" style={{ color: "var(--cream)" }}>
              5+
            </span>
            <span className="block mt-2.5 text-[13px]" style={{ color: "var(--muted)" }}>
              Projects shipped
            </span>
          </Reveal>
          <Reveal delay={160} className="stat">
            <span className="block font-bold text-[clamp(2.4rem,4.6vw,3.4rem)]" style={{ color: "var(--cream)" }}>
              5+
            </span>
            <span className="block mt-2.5 text-[13px]" style={{ color: "var(--muted)" }}>
              Happy clients
            </span>
          </Reveal>
        </div>

        <div className="mt-[90px] sm:mt-[130px] max-w-[900px]">
          <Reveal
            as="div"
            className="flex items-center gap-3 text-[12px] tracking-[0.18em] mb-[34px]"
            style={{ color: "var(--muted)" }}
          >
            <span className="w-[22px] h-px" style={{ background: "var(--muted)" }} /> ABOUT
          </Reveal>
          <p
            ref={aboutTextRef}
            className="font-medium leading-[1.42] tracking-tight text-[clamp(1.5rem,3.4vw,2.4rem)]"
          >
            {ABOUT_WORDS.map((w, i) => (
              <span
                key={i}
                className={`about-word ${aboutLit ? "lit" : ""}`}
                style={{ transitionDelay: aboutLit ? `${i * 40}ms` : "0ms" }}
              >
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
});

export default About;