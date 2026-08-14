import collaborationImage from "../../assets/Yatra/Collaboration.svg";

function CollaborationDevelopment() {
  return (
    <section id="collaboration" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Collaboration &amp; Development
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-5xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Designing with implementation in mind
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-2xl">
        I worked closely with developers to discuss technical constraints,
        review implementation, and refine designs where needed. This helped
        bridge the gap between the Figma concept and the actual product.
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 rounded-2xl overflow-hidden">
        <img
          src={collaborationImage}
          alt="Figma collaboration board with developer annotations"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

export default CollaborationDevelopment;