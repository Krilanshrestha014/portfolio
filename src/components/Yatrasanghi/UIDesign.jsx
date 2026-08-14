import row1 from "../../assets/Yatra/Container.svg";
import row2 from "../../assets/Yatra/Container1.svg";
import row3 from "../../assets/Yatra/Container2.svg";

function UIDesign() {
  const rows = [row1, row2, row3];

  return (
    <section id="ui-design" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">UI Design</p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-6xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Making design easier and more exciting to explore
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-2xl">
        I designed the interface around strong destination imagery, clear
        information hierarchy, and reusable components to make a
        content-heavy platform easier to navigate.
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-4 sm:gap-6">
        {rows.map((row, i) => (
          <img
            key={i}
            src={row}
            alt={`UI design before and after comparison ${i + 1}`}
            className="w-full h-auto"
          />
        ))}
      </div>
    </section>
  );
}

export default UIDesign;