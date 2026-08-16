import outcomeImage from "../../assets/Yatra/Outcome.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function OutcomeReflection() {
  return (
    <section id="outcome" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Outcome &amp; Reflection
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-5xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        From an AI-generated concept to a structured product experience
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-2xl">
        The redesign created a clearer discovery journey, stronger content
        hierarchy, and a consistent visual system for the platform. 95% of
        the product design completed with developer-ready screens and
        reusable components.
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 rounded-2xl overflow-hidden">
        <ImageWithSkeleton
          src={outcomeImage}
          alt="Laptop mockup showing the final Discover Nepal Your Way homepage"
          containerClassName="w-full"
          imgClassName="w-full h-auto object-cover"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default OutcomeReflection;