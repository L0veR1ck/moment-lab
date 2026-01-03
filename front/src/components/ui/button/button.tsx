type ButtonProps = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme?: string;
  width?: string;
};

function Button({ text, onClick, theme, width }: ButtonProps) {
  const dark = `bg-[var(--color-blue)] text-[var(--color-beige)] hover:bg-[var(--color-dark-blue)] font-normal text-lg rounded-md px-[16px] py-[12px] leading-none cursor-pointer whitespace-nowrap ${width}`;
  const light = `bg-[var(--color-beige)] text-[var(--color-blue)] hover:bg-[#FFE6DA] font-normal text-lg rounded-md px-[16px] py-[12px] leading-none cursor-pointer whitespace-nowrap ${width}`;

  return (
    <button onClick={onClick} className={theme === 'light' ? light : dark}>
      {text}
    </button>
  );
}

export default Button;
