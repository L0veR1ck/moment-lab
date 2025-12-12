import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo-moment-lab.svg';
import Button from '../../ui/button/button';
import ModalForm from '../../ui/modal-form/modal-form';
import DropMenu from '../../common/drop-menu/drop-menu';

function Header() {
  const [isDropOpen, setDropOpen] = useState({ programs: false, about: false });
  const [isModalOpen, setModalOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement | null>(null);


  const handleModalClick = () => {
    setModalOpen(prev => !prev)
  }

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropOpen({ programs: false, about: false });
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <header className="sticky top-0 z-2 bg-[var(--color-beige)]/95 transition-shadow  w-full duration-300">
      <div className="flex justify-between items-center w-full py-[24px] max-w-[1280px] mx-auto">
        <Link to="/" className="cursor-pointer hover:text-[var(--color-dark-blue)] block">
          <img className="h-[32px]" src={logo} alt="Moment Lab Logo" />
        </Link>

        <nav ref={wrapperRef} className="flex items-center">
          <ul className="flex gap-x-[150px] items-center text-nowrap">
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
                    name: 'Корпоративные мероприятия',
                    path: '/corporate-events'
                  },
                  {
                    name: 'Частные мероприятия',
                    path: '/private'
                  }, 
                  { 
                    name: 'События для школ',
                    path: '/school-events'

                  }, 
                  { 
                    name: 'Пространство для событий',
                    path: '/rent'
                  }
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
                    name: "О Момент.Лаб",
                    path: '/'
                  }, 
                  {
                    name: 'Портфолио',
                    path: '/'
                  }
                ]}
              />
            </li>

          </ul>
        </nav>

        <Button text="Связатьcя" onClick={handleModalClick} />
        {isModalOpen && <ModalForm onClose={handleModalClick} />}
      </div>
    </header>
  );
}

export default Header;
