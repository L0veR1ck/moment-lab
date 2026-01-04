import logo from '../../../assets/logo/logo-moment-lab.svg';
import vk from '../../../assets/social-link/vk.svg';
import telegram from '../../../assets/social-link/telegram.svg';
import whatsapp from '../../../assets/social-link/whatsapp.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts/routes';

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row w-full justify-between items-start border-t border-t-[var(--color-blue)]/25 max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
      <div className="flex flex-col gap-8 sm:gap-12 md:gap-[64px] py-8 sm:py-12 md:py-[80px] w-full lg:w-auto">
        <div className="flex flex-col gap-2 items-start">
          <Link
            to={ROUTES.MAIN}
            className="cursor-pointer hover:text-[var(--color-dark-blue)] block"
          >
            <img
              className="h-6 sm:h-8 md:h-[32px]"
              src={logo}
              alt="Moment Lab Logo"
            />
          </Link>
          <p className="font-semibold text-sm sm:text-base md:text-lg text-[var(--color-blue)]/55">
            Креативное агентство по организации мероприятий
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-[4px] items-start">
          <a
            className="text-lg sm:text-xl md:text-2xl text-[var(--color-blue)]/80 hover:text-[var(--color-blue)] transition"
            href="tel:+79121234567"
          >
            +7 (912) 123 45 67
          </a>
          <a
            className="text-lg sm:text-xl md:text-2xl text-[var(--color-blue)]/80 hover:text-[var(--color-blue)] transition break-all"
            href="mailto:moment.lab@gmail.com"
          >
            moment.lab@gmail.com
          </a>
          <a
            className="text-sm sm:text-base md:text-lg font-semibold pt-2 sm:pt-[10px] text-[var(--color-blue)]/80 hover:text-[var(--color-blue)] transition"
            target="_blank"
            href="https://yandex.ru/maps/29397/berezovskyi/house/koltsevaya_ulitsa_2v_6/YkkYcQJoTEcDQFtsfXR4d39gYw==/?ll=60.758524%2C56.896337&z=16"
          >
            г. Березовский, ул. Кольцевая, 2В/6
          </a>
        </div>

        <div className="flex flex-row gap-3 sm:gap-[12px]">
          <a
            target="_blank"
            href="https://vk.com/momentlab"
            className="hover:opacity-80 transition"
          >
            <img className="h-6 sm:h-8 md:h-[34px]" src={vk} alt="vk" />
          </a>
          <a
            target="_blank"
            href="https://t.me/momentlab"
            className="hover:opacity-80 transition"
          >
            <img
              className="h-6 sm:h-8 md:h-[34px]"
              src={telegram}
              alt="telegram"
            />
          </a>
          <a
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=79630402828&text&type=phone_number&app_absent=0"
            className="hover:opacity-80 transition"
          >
            <img
              className="h-6 sm:h-8 md:h-[34px]"
              src={whatsapp}
              alt="whatsapp"
            />
          </a>
        </div>
      </div>
      <div className="hidden lg:block py-8 sm:py-12 md:py-[80px] w-full lg:w-auto">
        <p className="font-semibold text-base sm:text-lg text-[var(--color-blue)] pb-3 sm:pb-4 md:pb-[16px]">
          Наши продукты
        </p>
        <ul className="flex flex-col gap-2 sm:gap-[8px] text-sm sm:text-base md:text-lg text-[var(--color-blue)]">
          <li>
            <Link
              to={ROUTES.CORPORATE_EVENTS}
              className="cursor-pointer hover:text-[var(--color-dark-blue)] block transition"
            >
              Корпоративные мероприятия
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.PRIVATE_EVENTS}
              className="cursor-pointer hover:text-[var(--color-dark-blue)] block transition"
            >
              Частные мероприятия
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.SCHOOL_EVENTS}
              className="cursor-pointer hover:text-[var(--color-dark-blue)] block transition"
            >
              События для школ
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.RENT}
              className="cursor-pointer hover:text-[var(--color-dark-blue)] block transition"
            >
              Пространство для событий
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
