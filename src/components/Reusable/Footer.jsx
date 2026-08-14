import React from "react";
import FooterCTA from "../Home/FooterCta";

/**
 * Site footer — faithful React + Tailwind port of the original <footer id="contact">.
 * Composes <FooterCTA /> (the "Let's build something worth remembering" block)
 * with the bottom copyright row, exactly as in the original markup.
 *
 * Requires the "Switzer" font (Fontshare) loaded once in your document head:
 *   <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,700&display=swap" rel="stylesheet" />
 */

export default function Footer({
  name = "Krilan Bata Shrestha",
  role = "UI / UX Designer",
  logo = "KRILAN",
  year = new Date().getFullYear(),
  email = "krilanshrestha@gmail.com",
  resumeHref = "/resume.pdf",
  linkedinHref = "https://www.linkedin.com/in/krilan-bata-shrestha-415590293/",
}) {
  return (
    <footer id="contact" className="bg-[#f5f2ea] pt-[60px] pb-11 font-['Switzer',sans-serif]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-16">
        <FooterCTA email={email} resumeHref={resumeHref} linkedinHref={linkedinHref} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-[26px] border-t border-[rgba(22,21,15,0.12)] text-[12.5px] text-[#6f6c62]">
          <span>
            © {year} {name}
          </span>
          <span className="font-bold tracking-[0.14em] text-[#16150f]">{logo}</span>
          <span>{role}</span>
        </div>
      </div>
    </footer>
  );
}