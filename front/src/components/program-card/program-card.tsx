import { Link } from "react-router-dom";

type ProgramCardProps = {
    link: string;
    title: string;
    description: string;
    imageUrl: string;
    imagePosition: string;
}

function ProgramCard({
    link,
    title,
    description,
    imageUrl,
    imagePosition
}: ProgramCardProps) {

    const divClassBase = "flex-1 bg-cover bg-no-repeat w-full border-x-[8px] border-t-[8px] border-[var(--color-beige)] rounded-t-[32px]"
    return (
        <Link
            to={link}
            className="flex flex-1 flex-col px-[24px] pt-[24px] gap-[16px] bg-[var(--color-blue)]/5 rounded-[16px] h-[420px] hover:bg-[var(--color-blue)]/15 hover:cursor-pointer transition-colors duration-300"
        >
            <p className="font-semibold text-2xl text-[var(--color-dark-blue)]">
                {title}
            </p>
            <p className="text-lg text-[var(--color-blue)]/55 min-h-[70px]">
                {description}
            </p>
            <div className={`${divClassBase} ${imageUrl} ${imagePosition}`} />
        </Link>
    );
}

export default ProgramCard;