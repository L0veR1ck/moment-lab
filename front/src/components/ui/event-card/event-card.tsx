import { Link } from 'react-router-dom';

type EventCardProps = {
  urlImg: string;
  imgPosition?: string;
  titleCard: string;
  description: string;
  path: string;
};

function EventCard({
  urlImg,
  imgPosition = 'bg-position-[center]',
  titleCard,
  description,
  path,
}: EventCardProps) {
  // Check if urlImg starts with 'bg-[url(' - if so it's a Tailwind class, otherwise it's a URL
  const isBackgroundImage = urlImg.startsWith('bg-[url(');
  const imageStyle = !isBackgroundImage ? {
    backgroundImage: `url(${urlImg})`,
  } : undefined;

  return (
    <div
      className="h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px]
                    w-full sm:w-[480px] md:w-[500px] lg:w-[544px]
                    flex flex-col shadow-xl
                    rounded-xl sm:rounded-2xl lg:rounded-[16px]
                    border border-[var(--color-blue)]/10"
    >
      <div
        className={`
          flex-[2.2] min-h-0
          rounded-t-xl sm:rounded-t-2xl lg:rounded-t-[16px]
          bg-cover bg-no-repeat
          ${isBackgroundImage ? urlImg : ''}
          ${imgPosition}
        `}
        style={imageStyle}
      />

      <div
        className="flex flex-col flex-1 min-h-0
                      px-4 sm:px-6 lg:px-[24px]
                      pt-4 sm:pt-6 lg:pt-[24px]
                      pb-4 sm:pb-6 lg:pb-[32px]"
      >
        <div className="grow flex flex-col">
          <p
            className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[24px]
                        text-[var(--color-dark-blue)] break-words"
          >
            {titleCard}
          </p>

          <p
            className="flex-1 mt-2 sm:mt-3 lg:mt-[8px]
                        text-sm sm:text-base md:text-lg lg:text-[20px]
                        lg:leading-[145%]
                        text-[var(--color-blue)]/80 break-words"
          >
            {description}
          </p>
        </div>

        <Link
          to={path}
          className="mt-4 sm:mt-6 lg:mt-0
                     flex items-end gap-2 sm:gap-[8px]
                     font-semibold text-sm sm:text-base lg:text-[18px]
                     text-[var(--color-dark-blue)] leading-none
                     transition-all
                     hover:gap-3 sm:hover:gap-[12px]
                     hover:text-[var(--color-dark-blue)]/80"
        >
          Подробнее
          <img
            src="/src/assets/event-card/arrow.svg"
            alt=""
            className="h-4 w-4 sm:h-5 sm:w-5 lg:h-auto lg:w-auto"
          />
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
