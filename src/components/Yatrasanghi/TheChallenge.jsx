import Slot1 from "../../assets/Yatra/Slot1.svg";
import Slot2 from "../../assets/Yatra/Slot2.svg";
import Slot3 from "../../assets/Yatra/Slot3.svg";

function TheChallenge() {
  const challenges = [
    {
      number: "01",
      title: "Unclear discovery journey",
      description:
        "The initial design did not clearly guide users from discovering a destination to exploring its experiences and planning a trip.",
      image: Slot1,
    },
    {
      number: "02",
      title: "Information overload",
      description:
        "Large amounts of travel information were presented without clear prioritization, making the content difficult to scan and understand.",
      image: Slot2,
    },
    {
      number: "03",
      title: "Inconsistent interface",
      description:
        "The re-generated screens lacked consistency in layouts, typography, components, and interaction patterns, making the product feel fragmented.",
      image: Slot3,
    },
  ];

  return (
    <section id="problem" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">The Problem</p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        The Challenge
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-10 sm:gap-14 w-full">
        {challenges.map(({ number, title, description, image }) => (
          <div key={number} className="flex flex-col">
            <p className="text-[12px] sm:text-[13px] text-[#000000] font-medium">
              [{number}]
            </p>

            <p className="mt-2 text-[15px] sm:text-[16px] md:text-[17px] font-medium text-[#000000]">
              {title}
            </p>

            <p className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] md:text-[14px] text-[#777777] font-normal leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Preview image */}
            <div className="mt-6 sm:mt-8  rounded-2xl overflow-hidden bg-white">
              <img
                src={image}
                alt={`${title} preview`}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TheChallenge;