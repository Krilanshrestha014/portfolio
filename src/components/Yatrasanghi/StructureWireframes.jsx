import structureImage from "../../assets/Yatra/structure.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function StructureWireframes() {
  return (
    <section id="structure" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Structure &amp; Wireframes
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Giving the experience a clearer direction
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-3xl">
        I reorganized the information architecture and mapped the primary user
        flow before designing the interface. Low-fidelity wireframes helped
        establish content hierarchy and navigation before moving into
        high-fidelity UI.
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 w-full">
        <ImageWithSkeleton
          src={structureImage}
          alt="Destination discovery and recommendation screens"
          containerClassName="w-full"
          imgClassName="w-full h-auto object-cover"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default StructureWireframes;