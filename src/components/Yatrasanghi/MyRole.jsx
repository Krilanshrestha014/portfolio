
import myRoleImage from "../../assets/Yatra/role.svg";

function MyRole() {
  return (
    <section id="role" className="scroll-mt-24 pb-14 sm:pb-18 md:pb-24">
      <p className="text-[13px] sm:text-[14px] text-[#777777]">My Role</p>

      <p className="mt-3 font-medium text-[1.6rem] sm:text-3xl md:text-4xl lg:text-6xl max-w-4xl leading-[1.2] sm:leading-[1.25] tracking-tight text-[#000000]">
        Taking the product from concept to structure
      </p>

      <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#777777] font-normal leading-relaxed max-w-2xl">
        I owned the UX and UI redesign, from auditing the existing interface
        and restructuring the information architecture to creating the final
        UI and working with developers.
      </p>

      <div className="mt-8 sm:mt-10 md:mt-12 relative rounded-2xl overflow-hidden bg-black">
        <img
          src={myRoleImage}
          alt="My role — design collaboration screenshot"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

export default MyRole;