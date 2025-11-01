import logo from '../../assets/logo/logo-momen-lab.svg';
import Button from '../button/button';

function Header() {
  return (
    <header className="flex justify-between items-center w-[100%] px-[64px] py-[24px]">
      <img className='h-[32px]' src={logo} alt="Moment Lab Logo" />
      <nav className='flex gap-x-[124px]'>
        <span className='font-semibold text-lg text-[var(--color-blue)] hover:text-[var(--color-dark-blue)] cursor-pointer'>
          Программы и услуги
        </span>
        <span className='font-semibold text-lg text-[var(--color-blue)] hover:text-[var(--color-dark-blue)] cursor-pointer'>
          О нас
        </span>
      </nav>
      <Button
        text='Связатьcя'
      />
    </header>
  );
}

export default Header;
