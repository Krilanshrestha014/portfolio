function TheChallenge() {
  const challenges = [
    {
      number: "01",
      title: "No Shared Identity",
      description:
        "Both businesses existed independently with different visual languages, making it hard to present them as one coherent brand.",
    },
    {
      number: "02",
      title: "Competing for attention",
      description:
        "Without a clear hierarchy, candles and clothing could easily compete, leaving users unsure what the site was actually about.",
    },
    {
      number: "03",
      title: "Complex purchase journey",
      description:
        "Combining two product categories within a single checkout experience required careful navigation design to reduce friction at every step.",
    },
  ];

  return (
    <section id="problem" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        The Problem
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        The Challenge
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-6 sm:gap-8 max-w-4xl">
        {challenges.map(({ number, title, description }) => (
          <div key={number} className="flex flex-col">
            <p className="text-[12px] sm:text-[13px] text-[#000000] font-medium">
              [{number}]
            </p>

            <p className="mt-2 text-[15px] sm:text-[16px] md:text-[17px] font-medium text-[#000000]">
              {title}
            </p>

            <p className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] md:text-[14px] text-[#777777] font-normal leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TheChallenge;