import yatraLogo from "../../assets/Yatra/yatra.svg";

function YatraOverview() {
  return (
    <section id="overview" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Project Overview
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Turning an AI-generated concept into a structured travel experience
      </p>

      <p className="mt-4 sm:mt-5 text-[12px] sm:text-[16px] text-[#777777] font-normal max-w-[1050px]">
        Yatrasanghi is a travel discovery platform designed to help users
        explore local destinations, experiences, and hidden places across
        Nepal. I led the UI/UX redesign, focusing on content hierarchy,
        visual consistency, and developer collaboration.
      </p>

      <div className="mt-6 sm:mt-8 bg-neutral-100 rounded-md flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <img
          src={yatraLogo}
          alt="Yatrasanghi logo"
          className="h-[100px] sm:h-[120px] md:h-[140px] lg:h-[280px] w-auto max-w-full"
        />
      </div>
    </section>
  );
}

export default YatraOverview;