import researchImage from "../../assets/Yatra/Research.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function ResearchStrategy() {
  return (
    <section id="research" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Discovery &amp; Research
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-5xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Studying the Current Experience for Insights &amp; Inspiration
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[16px] text-[#777777] font-normal leading-relaxed max-w-5xl">
        I audited the existing mobile experience and benchmarked both
        food-ordering apps and discovery platforms to identify proven
        usability patterns, navigation structures, and checkout conventions
        for Manna Bakery.
      </p>

      {/* Framed research board — soft rounded card instead of a bare
          full-bleed image, matching the boxed screenshot/annotation
          style from the reference */}
      <div className="mt-8 sm:mt-10 md:mt-12 w-full rounded-2xl sm:rounded-3xl bg-[#F5F5F5] p-3 sm:p-5 md:p-6">
        <ImageWithSkeleton
          src={researchImage}
          alt="Destination discovery and recommendation screens"
          containerClassName="w-full rounded-xl sm:rounded-2xl"
          imgClassName="w-full h-auto object-cover"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default ResearchStrategy;