import { forwardRef, useEffect, useRef, useState } from "react";
import Reveal from "../Reusable/Reveal";
import { useCursor } from "../../context/CursorContext";

const ABOUT_WORDS =
  "I'm a UI/UX Designer creating digital experiences where user needs, business goals, and thoughtful design come together. I believe simplicity creates meaningful experiences.".split(
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
      className="relative pt-0 pb-[163px]"
      style={{ background: "#ffffff", color: "#0d0c0a" }}
      onMouseEnter={() => setCursor((c) => ({ ...c, onDark: false }))}
      onMouseLeave={() => setCursor((c) => ({ ...c, onDark: false }))}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 md:px-16">

        <div className="max-w-[900px] mx-auto text-center">
          <p
            ref={aboutTextRef}
            className="font-medium leading-[1.42] tracking-tight text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px]"
          >
            {ABOUT_WORDS.map((w, i) => (
              <span
                key={i}
                className={`about-word-light ${aboutLit ? "lit" : ""}`}
                style={{ transitionDelay: aboutLit ? `${i * 40}ms` : "0ms" }}
              >
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <style>{`
        .about-word-light {
          color: rgba(13, 12, 10, 0.32);
          transition: color 0.5s ease;
        }
        .about-word-light.lit {
          color: #0d0c0a;
        }
      `}</style>
    </section>
  );
});

export default About;