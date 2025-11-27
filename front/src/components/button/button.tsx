type ButtonProps = {
  text: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`bg-[var(--color-blue)] text-[var(--color-beige)] font-normal text-lg rounded-md px-[16px] py-[12px] leading-none cursor-pointer hover:bg-[var(--color-dark-blue)]`}>
      {text}
    </button>
  );
}

export default Button;
