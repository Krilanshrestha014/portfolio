import Slot1 from "../../assets/Manna/Slot1.svg";
import Slot2 from "../../assets/Manna/Slot2.svg";
import Slot3 from "../../assets/Manna/Slot3.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function TheChallenge() {
  const challenges = [
    {
      number: "01",
      title: "Difficult product discovery",
      description:
        "The existing app made it hard to easily browse and compare products, often forcing users to switch between search and scroll through listings.",
      image: Slot1,
    },
    {
      number: "02",
      title: "Cluttered ordering journey",
      description:
        "The order flow required unnecessary steps and unclear form fields, creating multiple points where users could get confused or drop off.",
      image: Slot2,
    },
    {
      number: "03",
      title: "Inconsistent mobile experience",
      description:
        "The interface lacked a consistent layout and visual hierarchy, which made it harder for users to trust the product and complete their purchase confidently.",
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
            <div className="mt-6 sm:mt-8 border border-[#E5E5E5] rounded-2xl overflow-hidden bg-white">
              <ImageWithSkeleton
                src={image}
                alt={`${title} preview`}
                containerClassName="w-full"
                imgClassName="w-full h-auto object-contain"
                minHeightClassName="min-h-[220px] sm:min-h-[300px] md:min-h-[360px]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TheChallenge;