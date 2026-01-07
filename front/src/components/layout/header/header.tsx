import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo-moment-lab.svg';
import Button from '../../ui/button/button';
import ModalForm from '../../ui/modal-form/modal-form';
import DropMenu from '../../common/drop-menu/drop-menu';
import { ROUTES } from '../../../consts/routes';
import { useToggle } from '../../../shared/hooks/useToggle';
import MobileMenu from './mobile-menu';
import BurgerButton from '../../ui/burger/burger';

function Header() {
  const [isDropOpen, setDropOpen] = useState({ programs: false, about: false });
  const wrapperRef = useRef<HTMLLIElement | null>(null);
  const modal = useToggle();
  const [isBurgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setDropOpen({ programs: false, about: false });
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 bg-[var(--color-beige)]/95 backdrop-blur transition-shadow w-full">
        <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <Link
            to={ROUTES.MAIN}
            className="cursor-pointer hover:text-[var(--color-dark-blue)] block"
          >
            <img className="h-[32px]" src={logo} alt="Moment Lab Logo" />
          </Link>

          <nav ref={wrapperRef} className="hidden md:flex items-center">
            <ul className="flex gap-x-[120px] items-center text-nowrap">
              <li>
                <DropMenu
                  label="Программы и услуги"
                  isOpen={isDropOpen.programs}
                  onToggle={(e) => {
                    e.stopPropagation();
                    setDropOpen((s) => ({ ...s, programs: !s.programs }));
                  }}
                  items={[
                    {
                      name: 'Частные мероприятия',
                      path: ROUTES.PRIVATE_EVENTS,
                    },
                    {
                      name: 'События для школ',
                      path: ROUTES.SCHOOL_EVENTS,
                    },
                    {
                      name: 'Иммерсивные квесты',
                      path: ROUTES.IMMERSIVE_QUESTS,
                    },
                  ]}
                />
              </li>

              <li>
                <DropMenu
                  label="О нас"
                  isOpen={isDropOpen.about}
                  onToggle={(e) => {
                    e.stopPropagation();
                    setDropOpen((s) => ({ ...s, about: !s.about }));
                  }}
                  items={[
                    {
                      name: 'О Момент.Лаб',
                      path: '/about-moment-lab',
                    },
                    {
                      name: 'Портфолио',
                      path: '/',
                    },
                  ]}
                />
              </li>
            </ul>
          </nav>

          <Button
            text="Связаться"
            onClick={modal.open}
            className="hidden md:block"
          />
          <div className="relative md:hidden">
            <BurgerButton onClick={() => setBurgerOpen((s) => !s)} />

            <MobileMenu
              isOpen={isBurgerOpen}
              onClose={() => setBurgerOpen(false)}
            />
          </div>
        </div>
        {modal.isOpen && <ModalForm onClose={modal.close} />}
      </header>
    </>
  );
}

export default Header;
