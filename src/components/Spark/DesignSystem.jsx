import designSystemImage from "../../assets/Spark/designsystem.svg";

function DesignSystem() {
  return (
    <section id="design-system" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Design System
      </p>


      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        A consistent visual language built to scale
      </p>

      <p className="mt-4 sm:mt-5 text-[12px] sm:text-[16px] text-[#777777] font-normal max-w-[1050px]">
        Before any screens, I built a lightweight system covering colour,
        type, buttons, cards, and form elements. It gave the developer
        everything to build without constant check-ins and let the client
        expand the catalogue without breaking visual coherence.
      </p>

      <div className="mt-6 sm:mt-8">
        <img
          src={designSystemImage}
          alt="Design system overview showing UI kit inventory, typography, colour palette, and buttons"
          className="w-full h-auto rounded-xl sm:rounded-2xl"
        />
      </div>
    </section>
  );
}

export default DesignSystem;