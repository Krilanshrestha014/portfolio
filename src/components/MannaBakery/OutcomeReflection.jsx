import outcomeTop from "../../assets/Manna/top.svg";
import outcomeBottom from "../../assets/Manna/bottom.svg";

function OutcomeReflection() {
  return (
    <section id="outcome" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Outcome &amp; Reflection
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        A simpler and more consistent mobile ordering experience
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-5xl">
        The redesign improved product discoverability, reduced unnecessary
        complexity in checkout, and created a more consistent mobile
        experience across the key ordering screens. This project taught me
        how to identify real usability problems, simplify user flows, and to
        turn design decisions into practical product improvements.
      </p>

      {/* Two images, stacked top and bottom — each already contains a
          pair of screens side by side */}
      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-4 sm:gap-5 md:gap-6">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <img
            src={outcomeTop}
            alt="Home and product detail screen mockups held in hand"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <img
            src={outcomeBottom}
            alt="Cart and checkout screen mockups held in hand"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default OutcomeReflection;