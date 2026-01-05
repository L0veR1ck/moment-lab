import { Link } from 'react-router-dom';

type ProgramCardProps = {
  link: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: string;
};

function ProgramCard({
  link,
  title,
  description,
  imageUrl,
  imagePosition,
}: ProgramCardProps) {
  return (
    <Link
      to={link}
      className="flex flex-1 flex-col px-3 sm:px-6 md:px-[24px]
                 pt-4 sm:pt-6 md:pt-[24px]
                 gap-3 sm:gap-4 md:gap-[16px]
                 bg-[var(--color-blue)]/5 hover:bg-[var(--color-blue)]/15
                 rounded-xl sm:rounded-2xl md:rounded-[16px]
                 h-[380px] sm:h-[360px] md:h-[420px]
                 transition-colors duration-300
                 min-w-0 w-full"
    >
      <p className="font-semibold text-lg sm:text-xl md:text-2xl text-[var(--color-dark-blue)] break-words">
        {title}
      </p>

      <p
        className="text-sm sm:text-base md:text-lg text-[var(--color-blue)]/55
                    min-h-[50px] sm:min-h-[60px] md:min-h-[70px]
                    break-words"
      >
        {description}
      </p>

      <div
        className={`
          flex-1 w-full min-h-[180px] sm:min-h-0 flex-shrink-0
          bg-cover bg-no-repeat
          border-x-[8px] border-t-[8px] border-[var(--color-beige)]
          rounded-t-[32px]
          ${imageUrl}
          ${imagePosition}
        `}
      />
    </Link>
  );
}

export default ProgramCard;
