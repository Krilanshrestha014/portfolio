import uiTopScreens from "../../assets/Spark/topui.svg";
import uiBottomScreens from "../../assets/Spark/bottomui.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function UIDesign() {
  return (
    <section id="ui-design" className="scroll-mt-24 pb-14 sm:pb-16 md:pb-20">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        UI Design
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-5xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        A product-first experience built around discovery and purchase
      </p>

      <p className="mt-4 sm:mt-5 text-[12px] sm:text-[16px] text-[#777777] font-normal max-w-[1050px]">
        I designed the interface around how customers browse and evaluate
        candles online, bringing both businesses into one cohesive
        experience while keeping candles at the forefront. Each section was
        structured to guide users naturally from discovering a collection to
        exploring a product and completing a purchase.
      </p>

      <div className="mt-6 sm:mt-8">
        <ImageWithSkeleton
          src={uiTopScreens}
          alt="Homepage hero and Our Candles product grid screens"
          containerClassName="w-full rounded-xl sm:rounded-2xl"
          imgClassName="w-full h-auto"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>

      <div className="mt-4 sm:mt-6">
        <ImageWithSkeleton
          src={uiBottomScreens}
          alt="Category cards and scent-finder quiz modal screens"
          containerClassName="w-full rounded-xl sm:rounded-2xl"
          imgClassName="w-full h-auto"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default UIDesign;