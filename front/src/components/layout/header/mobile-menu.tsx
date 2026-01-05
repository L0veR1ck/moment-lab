import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts/routes';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 top-full mt-2 z-30
                    bg-[var(--color-beige)]
                    rounded-sm
                    shadow-[0_6px_14px_rgba(0,0,0,0.25)]
                    p-4
                    w-[220px]
                    flex flex-col gap-3
                    text-sm text-[var(--color-blue)]"
    >
      <div>
        <p className="font-semibold mb-2">Программы и услуги</p>
        <ul className="flex flex-col gap-1 pl-2">
          <Link to={ROUTES.CORPORATE_EVENTS} onClick={onClose}>
            Корпоративные мероприятия
          </Link>
          <Link to={ROUTES.PRIVATE_EVENTS} onClick={onClose}>
            Частные мероприятия
          </Link>
          <Link to={ROUTES.SCHOOL_EVENTS} onClick={onClose}>
            События для школ
          </Link>
          <Link to={ROUTES.RENT} onClick={onClose}>
            Пространство для событий
          </Link>
        </ul>
      </div>

      <Link to="/about-moment-lab" onClick={onClose} className="font-semibold">
        О Момент.Лаб
      </Link>

      <Link to="/events" onClick={onClose} className="font-semibold">
        Портфолио
      </Link>
    </div>
  );
}

export default MobileMenu;
