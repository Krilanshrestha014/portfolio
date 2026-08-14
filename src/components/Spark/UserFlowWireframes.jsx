import userFlowImage from "../../assets/Manna/userflow.svg";

function UserFlowWireframes() {
  return (
    <section id="user-flow" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        User Flow &amp; Wireframes
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Structuring the journey before designing the interface
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[16px] text-[#777777] font-normal leading-relaxed max-w-5xl">
        I mapped the ordering flow and translated it into low-fidelity
        wireframes to identify unnecessary steps, establish content
        hierarchy, and validate the structure before moving into
        high-fidelity UI.
      </p>

      {/* Flow diagram — wide by nature, so it scrolls horizontally on
          small screens instead of squashing the boxes/arrows illegible */}
      <div className="mt-8 sm:mt-10 md:mt-12 w-full rounded-2xl sm:rounded-3xl border border-[#E5E5E5] bg-white p-3 sm:p-5 md:p-6 overflow-x-auto">
        <img
          src={userFlowImage}
          alt="User flow diagram from home page through checkout and delivery"
          className="h-auto min-w-[640px] w-full sm:min-w-0 object-contain"
        />
      </div>
    </section>
  );
}

export default UserFlowWireframes;