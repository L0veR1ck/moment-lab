import Marquee from "react-fast-marquee";

function ClientsSection() {
  return (
    <section className="flex flex-col w-screen py-[64px]">
      <h2 className="text-center font-semibold text-[64px] text-[var(--color-dark-blue)] pb-[32px]">
        Наши клиенты
      </h2>

      <Marquee className="pt-[24px]" autoFill={true} pauseOnHover={true} speed={80}>
          <img className="h-[64px] px-[32px]" src="./src/assets/clients-logo/logo-1.png" />
      </Marquee>
    </section>

  );
};

export default ClientsSection;