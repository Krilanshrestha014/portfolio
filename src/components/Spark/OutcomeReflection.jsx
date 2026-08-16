import outcomeShowcase from "../../assets/Spark/outcome.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function OutcomeReflection() {
  return (
    <section id="outcome" className="scroll-mt-24 pb-14 sm:pb-16 md:pb-20">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Outcome &amp; Reflection
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-5xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Clear, shoppable, and ready to grow
      </p>

      <p className="mt-4 sm:mt-5 text-[12px] sm:text-[16px] text-[#777777] font-normal max-w-[1050px]">
        The final design unified both businesses into a cohesive eCommerce
        experience while keeping handcrafted candles at the center of the
        shopping journey. This project taught me how information
        architecture, visual hierarchy, and product presentation can balance
        multiple business goals while keeping the user experience simple and
        intuitive.
      </p>

      <div className="mt-6 sm:mt-8">
        <ImageWithSkeleton
          src={outcomeShowcase}
          alt="Spark homepage hero showcasing the Wear the Tradition campaign with navigation and product bundle callout"
          containerClassName="w-full rounded-xl sm:rounded-2xl"
          imgClassName="w-full h-auto"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default OutcomeReflection;