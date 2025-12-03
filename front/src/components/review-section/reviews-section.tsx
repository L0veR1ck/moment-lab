import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const reviews = [
    { id: 1, author: "Иван", company: 'ООО "Газпромнефть - ЦР"', text: "Отличный сервис! Очень доволен качеством." },
    { id: 2, author: "Мария", company: 'ООО "Газпромнефть - ЦР"', text: "Все прошло быстро и удобно. Рекомендую!" },
    { id: 3, author: "Алексей", company: 'ООО "Газпромнефть - ЦР"', text: "Хорошая поддержка и приятный интерфейс." },
    { id: 4, author: "Ольга", company: 'ООО "Газпромнефть - ЦР"', text: "Довольна на 100%! Обращусь снова." },
    { id: 5, author: "Павел", company: 'ООО "Газпромнефть - ЦР"', text: "Все супер. Буду советовать друзьям." },
];

function ReviewsSection() {
    return (
        <section className="flex flex-col w-full py-[64px] max-w-[1280px]">
            <h2 className="text-center font-semibold text-[64px] text-[var(--color-dark-blue)] pb-[56px]">Отзывы</h2>
            <Carousel
                className="*:overflow-visible! "
                showArrows={true}
                showIndicators={true}
                showThumbs={false}
                showStatus={false}
                centerMode={true}
                centerSlidePercentage={33.33}
                infiniteLoop={true}
                swipeable={true}
                emulateTouch={false}
                interval={7000}
                transitionTime={500}
                renderArrowPrev={(onClickHandler, hasPrev, label) => (
                    hasPrev && (
                        <button
                            onClick={onClickHandler}
                            title={label}
                            className="absolute -left-12 group top-2/5 -translate-y-1/2 z-10 w-12 h-12 border border-[var(--color-blue)]/55 hover:border-[var(--color-blue)] rounded-full flex items-center justify-center shadow transition"
                        >
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" className="w-6 h-6 stroke-[var(--color-blue)]/55 group-hover:stroke-[var(--color-blue)] transition">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )
                )}
                renderArrowNext={(onClickHandler, hasNext, label) => (
                    hasNext && (
                        <button
                            onClick={onClickHandler}
                            title={label}
                            className="absolute -right-12 group top-2/5 -translate-y-1/2 z-10 w-12 h-12 border border-[var(--color-blue)]/55 hover:border-[var(--color-blue)] rounded-full flex items-center justify-center shadow transition"
                        >
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" className="w-6 h-6 stroke-[var(--color-blue)]/55 group-hover:stroke-[var(--color-blue)] transition">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )
                )}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    const base = "inline-block w-2 h-2 mx-1 rounded-full cursor-pointer";
                    return (
                        <li
                            className={
                                base + (isSelected ? " bg-[var(--color-blue)]" : " bg-[var(--color-blue)]/25 hover:bg-[var(--color-blue)]/55")
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
                    <div key={item.id} className="border-b-[50px] border-b-[var(--color-beige)] px-4 h-full" >
                        <div className="pt-[24px] px-[24px] pb-[64px] bg-[var(--color-blue)]/15 rounded-lg shadow p-6 h-full flex flex-col text-left">
                            <span className="font-semibold text-lg text-[var(--color-blue)]">{item.author}</span>
                            <p className="text-lg text-[var(--color-blue)]/55 pb-[16px]">{item.company}</p>
                            <p className="text-lg text-[var(--color-blue)]">{item.text}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
}

export default ReviewsSection;