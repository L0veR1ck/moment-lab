import Marquee from 'react-fast-marquee';

import logo1 from '../../../../assets/clients-logo/logo-1.svg';
import logo2 from '../../../../assets/clients-logo/logo-2.svg';
import logo3 from '../../../../assets/clients-logo/logo-3.svg';
import logo4 from '../../../../assets/clients-logo/logo-4.svg';
import logo5 from '../../../../assets/clients-logo/logo-5.svg';
import logo6 from '../../../../assets/clients-logo/logo-6.svg';
import logo7 from '../../../../assets/clients-logo/logo-7.svg';
import logo8 from '../../../../assets/clients-logo/logo-8.svg';

import png1 from '../../../../assets/clients-logo/8ff1863551e5ffaf01b853d339cbac9d_1920 (1) 1.png';
import png2 from '../../../../assets/clients-logo/c4aa2a2c2519f20b4908ec4b69792f0 (1) 1.png';
import png3 from '../../../../assets/clients-logo/images (1) (1) 1.png';
import png4 from '../../../../assets/clients-logo/sign-single-basic 1.png';
import png5 from '../../../../assets/clients-logo/STIMEK ВЕРНЫЙ logo_v2_pantone-01 (2) 1.png';
import png6 from '../../../../assets/clients-logo/image 1.png';
import png7 from '../../../../assets/clients-logo/image 2.png';
import png8 from '../../../../assets/clients-logo/image 3.png';

const clientLogos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  png1,
  png2,
  png3,
  png4,
  png5,
  png6,
  png7,
  png8,
];

function ClientsSection() {
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
        {clientLogos.map((logoSrc, index) => {
          const isBigLogo = logoSrc === png1;

          return (
            <img
              key={index}
              className={`px-4 sm:px-8 md:px-[64px] ${
                isBigLogo
                  ? 'h-24 sm:h-32 md:h-[140px]'
                  : 'h-8 sm:h-12 md:h-[64px]'
              }`}
              src={logoSrc}
              alt={`Логотип клиента ${index + 1}`}
            />
          );
        })}
      </Marquee>
    </section>
  );
}

export default ClientsSection;
