import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo/logo-momen-lab.svg';
import Button from '../button/button';
import DropMenu from '../drop-menu/drop-menu';

function Header() {
  const [open, setOpen] = useState({ programs: false, about: false });
  const wrapperRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen({ programs: false, about: false });
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <header className="flex justify-between items-center w-[100%] px-[64px] py-[24px]">
      <img className="h-[32px]" src={logo} alt="Moment Lab Logo" />

      <nav ref={wrapperRef} className="flex items-center">
        <ul className="flex gap-x-[150px] items-center">
          <DropMenu
            label="Программы и услуги"
            isOpen={open.programs}
            onToggle={(e) => {
              e.stopPropagation();
              setOpen((s) => ({ ...s, programs: !s.programs }));
            }}
            items={['Частные мероприятия', 'Корпоративные мероприятия', 'Интерактивы', 'Аренда помещений']}
          />

          <DropMenu
            label="О нас"
            isOpen={open.about}
            onToggle={(e) => {
              e.stopPropagation();
              setOpen((s) => ({ ...s, about: !s.about }));
            }}
            items={["О Момент.Лаб", 'Портфолио']}
          />
        </ul>
      </nav>

      <Button text="Связатьcя" />
    </header>
  );
}

export default Header;
