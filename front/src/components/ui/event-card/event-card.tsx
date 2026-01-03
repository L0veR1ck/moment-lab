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
  titleCard,
  description,
  path,
  imgPosition,
}: EventCardProps) {
  return (
    <div className="h-[700px] w-[544px] flex flex-col shadow-xl rounded-[16px] border border-[var(--color-blue)]/10 ">
      <div
        className={`h-[100%] flex-[2.2] rounded-t-[16px] bg-cover bg-no-repeat ${urlImg} ${imgPosition}`}
      />
      <div className="flex flex-col px-[24px] pt-[24px] pb-[32px] flex-1">
        <div className="grow">
          <p className="font-semibold text-[24px] text-[var(--color-dark-blue)]">
            {titleCard}
          </p>
          <p className="text-[20px]/[145%] text-[var(--color-blue)]/80 mt-[8px]">
            {description}
          </p>
        </div>
        <Link
          to={path}
          className="flex flex-row gap-[8px] font-semibold text-[var(--color-dark-blue)] items-end leading-none hover:gap-[12px] hover:text-[var(--color-dark-blue)]/80 "
        >
          Подробнее
          <img src="./src/assets/event-card/arrow.svg" />
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
