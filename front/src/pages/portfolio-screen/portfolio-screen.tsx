import { Carousel } from 'react-responsive-carousel';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import { useEffect, useState } from 'react';

function PortfolioScreen() {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);
  const quizInfo = [
    {
      name: 'Квиз SLK CEMENT',
      folderName: 'Квиз SLK CEMENT',
      count: 4,
    },
    {
      name: 'Организация дня рождения',
      folderName: 'Организация дня рождения',
      count: 4,
    },
  ];

  const portfolioImages = import.meta.glob('../../assets/portfolio/**/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const getProjectImages = (folderName: string, count: number) => {
    const images: string[] = [];
    const folderPath = `portfolio/${folderName}`;

    for (let i = 1; i <= count; i++) {
      const imageKey = Object.keys(portfolioImages).find(
        (key) => key.includes(folderPath) && key.includes(`/${i}.png`),
      );
      if (imageKey && portfolioImages[imageKey]) {
        images.push(portfolioImages[imageKey] as string);
      }
    }
    return images;
  };

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

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Header />
      <main>
        <h1 className="font-semibold py-[64px] text-[64px] text-[var(--color-dark-blue)] text-center break-words">
          Реализованные мероприятия
        </h1>
        {quizInfo.map((project, projectIndex) => {
          const images = getProjectImages(project.folderName, project.count);

          return (
            <section
              key={projectIndex}
              className="flex flex-col w-full py-8 sm:py-12 md:py-[64px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0"
            >
              <h2 className="text-left pl-[20px] font-semibold sm:text-4xl md:text-5xl lg:text-[36px] text-[var(--color-dark-blue)] pb-6 sm:pb-8 md:pb-[56px] break-words">
                {project.name}
              </h2>
              <div className="relative w-full">
                <Carousel
                  className="*:overflow-visible! "
                  showArrows={true}
                  showIndicators={false}
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
                >
                  {images.map((imageSrc, index) => (
                    <div key={index} className="px-2 sm:px-4">
                      <div className="w-full h-[400px] overflow-hidden rounded-lg">
                        <img
                          src={imageSrc}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

export default PortfolioScreen;
