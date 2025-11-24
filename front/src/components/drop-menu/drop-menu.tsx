import { Link } from 'react-router-dom';
import type { MouseEvent } from 'react';

type DropMenuProps = {
    label: string;
    isOpen?: boolean;
    onToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
    items: string[];
}

function DropMenu({ label, isOpen, onToggle, items }: DropMenuProps) {

    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="font-semibold text-lg text-[var(--color-blue)] hover:text-[var(--color-dark-blue)] cursor-pointer"
            >
                {label}
            </button>

            {isOpen && (
                <ul className={"absolute left-1/2 transform -translate-x-1/2 mt-2 bg-[var(--color-bg-white)] rounded-sm shadow-[0_6px_14px_rgba(0,0,0,0.08)] p-4 flex flex-col gap-4 text-sm text-[var(--color-blue)]"}>
                    {items.map((item, idx) => (
                        <li key={idx} className="whitespace-nowrap">
                            <Link to="/" className="cursor-pointer hover:text-[var(--color-dark-blue)] block">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropMenu;
