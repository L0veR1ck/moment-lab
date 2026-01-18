import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { api } from '../../../../api/client';

interface Review {
  id: string;
  clientName: string;
  reviewText: string;
  rating: number;
}

function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await api.reviews.getAll(1, 100);
        setReviews(response.items);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCenterSlidePercentage(33.33);
      } else if (width >= 640) {
        setCenterSlidePercentage(50);
      } else {
        setCenterSlidePercentage(100);
      }
    };

    updateSlidePercentage();
    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

  if (isLoading) {
    return (
      <section className="flex flex-col w-full py-8 sm:py-12 md:py-[64px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
        <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] pb-6 sm:pb-8 md:pb-[56px] break-words">
          Отзывы
        </h2>
        <div className="text-center text-[var(--color-blue)] py-8">Загрузка отзывов...</div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Не показываем секцию, если нет отзывов
  }

  return (
    <section className="flex flex-col w-full py-8 sm:py-12 md:py-[64px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
      <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] pb-6 sm:pb-8 md:pb-[56px] break-words">
        Отзывы
      </h2>
      <div className="relative w-full">
        <Carousel
          className="*:overflow-visible! "
          showArrows={true}
          showIndicators={true}
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          centerSlidePercentage={centerSlidePercentage}
          infiniteLoop={true}
          swipeable={true}
          emulateTouch={true}
          interval={7000}
          transitionTime={500}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                title={label}
                className="hidden lg:flex absolute -left-12 group top-2/5 -translate-y-1/2 z-10 w-12 h-12 border border-[var(--color-blue)]/55 hover:border-[var(--color-blue)] rounded-full items-center justify-center shadow transition"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  className="w-6 h-6 stroke-[var(--color-blue)]/55 group-hover:stroke-[var(--color-blue)] transition"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                title={label}
                className="hidden lg:flex absolute -right-12 group top-2/5 -translate-y-1/2 z-10 w-12 h-12 border border-[var(--color-blue)]/55 hover:border-[var(--color-blue)] rounded-full items-center justify-center shadow transition"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  className="w-6 h-6 stroke-[var(--color-blue)]/55 group-hover:stroke-[var(--color-blue)] transition"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )
          }
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            const base =
              'inline-block w-2 h-2 mx-1 rounded-full cursor-pointer';
            return (
              <li
                className={
                  base +
                  (isSelected
                    ? ' bg-[var(--color-blue)]'
                    : ' bg-[var(--color-blue)]/25 hover:bg-[var(--color-blue)]/55')
                }
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          {reviews.map((item) => (
            <div
              key={item.id}
              className="border-b-[30px] sm:border-b-[40px] md:border-b-[50px] border-b-[var(--color-beige)] px-2 sm:px-4 h-full"
            >
              <div className="min-h-[200px] sm:min-h-[230px] md:min-h-[250px] pt-4 sm:pt-6 md:pt-[24px] px-4 sm:px-6 md:px-[24px] bg-[var(--color-blue)]/15 rounded-lg shadow p-4 sm:p-6 h-full flex flex-col gap-4 sm:gap-6 md:gap-[24px] text-left">
                <span className="font-semibold text-base sm:text-lg text-[var(--color-blue)] break-words">
                  {item.clientName}
                </span>
                <p className="text-sm sm:text-base md:text-lg text-[var(--color-blue)] break-words">
                  {item.reviewText}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default ReviewsSection;
