import userFlowImage from "../../assets/Spark/userflow.svg";
import ImageWithSkeleton from "../Reusable/ImageWithSkeleton";

function UserFlowWireframes() {
  return (
    <section id="user-flow" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">
        User Flow &amp; Wireframes
      </p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Mapping the full journey before committing to any interface      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[16px] text-[#777777] font-normal leading-relaxed max-w-3xl">
        I mapped the primary shopping flow and built low-fidelity wireframes to validate layout and content hierarchy before any visual work. Catching issues here, especially in the mobile cart and filtering saved significant time later.
      </p>

      <div className="mt-6 sm:mt-8">
        <ImageWithSkeleton
          src={userFlowImage}
          alt="User flow diagram from home page through checkout and delivery"
          containerClassName="w-full rounded-xl sm:rounded-2xl"
          imgClassName="w-full h-auto"
          minHeightClassName="min-h-[240px] sm:min-h-[360px] md:min-h-[460px]"
        />
      </div>
    </section>
  );
}

export default UserFlowWireframes;