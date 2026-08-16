import uiDesignImage from "../../assets/Manna/design.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function UIDesign() {
  return (
    <section id="ui-design" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">UI Design</p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        A cleaner interface built around quick ordering
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-5xl">
        I designed the mobile experience around clear product discovery,
        accessible actions, consistent components, and a simplified
        checkout, using visual hierarchy and familiar eCommerce patterns to
        reduce cognitive load.
      </p>

      {/* Editor screenshot — already has its own dark chrome, so no card
          background here, just a rounded frame. Scrolls horizontally on
          small screens so the row of screens stays legible instead of
          shrinking to illegible thumbnails. */}
      <div className="mt-8 sm:mt-10 md:mt-12 w-full rounded-2xl sm:rounded-3xl overflow-x-auto overflow-y-hidden border border-[#E5E5E5]">
        <ImageWithSkeleton
          src={uiDesignImage}
          alt="Figma workspace showing the Manna Bakery mobile UI screens from home through delivery"
          containerClassName="rounded-lg"
          imgClassName="h-auto min-w-[720px] w-full sm:min-w-0 object-contain block"
          minHeightClassName="min-h-[220px] sm:min-h-[320px] md:min-h-[400px]"
        />
      </div>
    </section>
  );
}

export default UIDesign;