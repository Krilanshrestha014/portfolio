import researchImage from "../../assets/Spark/research.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function TheResearch() {
  return (
    <section id="research" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Discovery & Research
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-5xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Understanding the business before opening Figma
      </p>

      <p className="mt-4 sm:mt-5 text-[12px] sm:text-[16px] text-[#777777] font-normal max-w-[1050px]">
        Stakeholder conversations revealed that candles drive the most
        revenue and carry the strongest brand identity. Competitor research
        confirmed that lifestyle imagery and clear product grouping are the
        two biggest trust signals in premium eCommerce.
      </p>

      <div className="mt-6 sm:mt-8">
        <ImageWithSkeleton
          src={researchImage}
          alt="Video call screenshot showing stakeholder discussion with Pranish, Krilan, and the Spark brand logo"
          containerClassName="w-full rounded-xl sm:rounded-2xl"
          imgClassName="w-full h-auto"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default TheResearch;