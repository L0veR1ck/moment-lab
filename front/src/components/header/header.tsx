import logo from '../../assets/logo/logo-momen-lab.svg';

function Header() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={logo} alt="Moment Lab Logo" />;
    </div>
  );
}

export default Header;
