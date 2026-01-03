type BurgerButtonProps = {
  onClick: () => void;
  className?: string;
};

function BurgerButton({ onClick, className = '' }: BurgerButtonProps) {
  return (
    <button
      className={`flex flex-col gap-[5px] md:hidden ${className}`}
      onClick={onClick}
      aria-label="Открыть меню"
    >
      <span className="w-6 h-[2px] bg-[var(--color-dark-blue)]" />
      <span className="w-6 h-[2px] bg-[var(--color-dark-blue)]" />
      <span className="w-6 h-[2px] bg-[var(--color-dark-blue)]" />
    </button>
  );
}

export default BurgerButton;
