import researchImage from "../../assets/Yatra/research.svg";

function ResearchStrategy() {
  const steps = ["Discover", "Explore", "Understand", "Plan"];

  return (
    <section id="research" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        Research &amp; Strategy
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Understanding how people discover and choose destinations
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-2xl">
        I audited the existing product and studied travel platforms like
        Airbnb and TripAdvisor to understand how they balance inspiration,
        information, and decision-making. Users needed a journey that moved
        naturally from:
      </p>

      {/* Step pills */}
      <div className="mt-6 sm:mt-7 flex items-center flex-wrap gap-2 sm:gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:gap-3">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[#E5E5E5] text-[12px] sm:text-[13px] text-[#0000006B] font-medium">
              {step}
            </span>
            {i < steps.length - 1 && (
              <span className="w-3 sm:w-4 h-px bg-[#D5D5D5]" />
            )}
          </div>
        ))}
      </div>

      {/* Combined image */}
      <div className="mt-8 sm:mt-10 md:mt-12 w-full">
        <img
          src={researchImage}
          alt="Destination discovery and recommendation screens"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

export default ResearchStrategy;