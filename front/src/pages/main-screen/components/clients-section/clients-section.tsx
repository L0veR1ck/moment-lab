import Marquee from 'react-fast-marquee';

function ClientsSection() {
  const logos = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <section className="flex flex-col w-screen py-8 sm:py-12 md:py-[64px]">
      <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] pb-4 sm:pb-6 md:pb-[32px] px-4">
        Наши клиенты
      </h2>

      <Marquee
        className="pt-4 sm:pt-6 md:pt-[24px]"
        autoFill={true}
        pauseOnHover={true}
        speed={60}
      >
        {logos.map((logoNumber) => (
          <img
            key={logoNumber}
            className="h-8 sm:h-12 md:h-[64px] px-4 sm:px-8 md:px-[64px]"
            src={`./src/assets/clients-logo/logo-${logoNumber}.svg`}
            alt={`Логотип клиента ${logoNumber}`}
          />
        ))}
      </Marquee>
    </section>
  );
}

export default ClientsSection;
