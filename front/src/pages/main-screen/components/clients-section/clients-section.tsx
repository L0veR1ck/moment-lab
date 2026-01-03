import Marquee from "react-fast-marquee";

function ClientsSection() {
  const logos = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <section className="flex flex-col w-screen py-[64px]">
      <h2 className="text-center font-semibold text-[64px] text-[var(--color-dark-blue)] pb-[32px]">
        Наши клиенты
      </h2>

      <Marquee
        className="pt-[24px]"
        autoFill={true}
        pauseOnHover={true}
        speed={60}
      >
        {logos.map((logoNumber) => (
          <img
            key={logoNumber}
            className="h-[64px] px-[64px]"
            src={`./src/assets/clients-logo/logo-${logoNumber}.svg`}
            alt={`Логотип клиента ${logoNumber}`}
          />
        ))}
      </Marquee>
    </section>
  );
}

export default ClientsSection;
