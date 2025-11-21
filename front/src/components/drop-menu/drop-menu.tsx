type DropMenuProps = {
    label: string;
    isOpen: boolean;
    onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
    items: string[];
}

function DropMenu({ label, isOpen, onToggle, items }: DropMenuProps) {

    return (
        <li className="relative">
            <button
                onClick={onToggle}
                className="font-semibold text-lg text-[var(--color-blue)] hover:text-[var(--color-dark-blue)] cursor-pointer"
            >
                {label}
            </button>

            {isOpen && (
                <ul className={"absolute left-1/2 transform -translate-x-1/2 mt-2 bg-[var(--color-bg-white)] rounded-sm shadow-[0_6px_14px_rgba(0,0,0,0.08)] ring-1 p-4 flex flex-col gap-4 text-sm text-[var(--color-blue)]"}>
                    {items.map((item, idx) => (
                        <li key={idx} className="cursor-pointer hover:text-[var(--color-dark-blue)] whitespace-nowrap">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default DropMenu;
