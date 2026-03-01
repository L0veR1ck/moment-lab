import Marquee from 'react-fast-marquee';
import ConditionItem from '../../ui/condition-item/condition-item';
import Button from '../../ui/button/button';
import ModalForm from '../../ui/modal-form/modal-form';
import ProgramList from '../../ui/program-list/program-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useParallax } from '../../../shared/hooks/use-parallax';
import { star } from '../../../assets/3d-objects';
import type { GalleryImage } from '../../../shared/types/image';

type CarcassSubPagesProps = {
  section_1: {
    mainHeading: string;
    mainAnnotation: string;
    handleModalOpen: () => void;
    handleModalClose: () => void;
    isModalOpen: boolean;
  };
  section_2: {
    firstProgramList: {
      heading: string;
      checklist: string[];
    };
    secondProgramList?: {
      heading: string;
      checklist: string[];
    };
    keyValues?: string;
    conditionData: {
      value: string;
      description: string;
    }[];
  };
  section_3: {
  images: GalleryImage[];
};
};

function CarcassSubPages(pageData: CarcassSubPagesProps) {
  const diamondParallax = useParallax(0.4, 50);
  const diamondRightParallax = useParallax(0.45, 100);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        <section className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] pt-8 sm:pt-12 md:pt-16 lg:pt-[64px] pb-8 sm:pb-12 md:pb-[32px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0 w-full">
          <h1 className="relative font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] text-center break-words">
            <span
              ref={diamondParallax.ref}
              className="absolute left-[-180px] top-0 pointer-events-none hidden xl:block"
              style={{
                transform: `translateY(${diamondParallax.offset}px)`,
                transition: 'transform 0.2s ease-out',
                willChange: 'transform',
              }}
            >
              <img
                src={star}
                alt=""
                className="-translate-y-1/2 w-auto"
              />
            </span>

            {pageData.section_1.mainHeading}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-blue)]/55 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-[32px] break-words max-w-4xl">
            {pageData.section_1.mainAnnotation}
          </p>

          <div className="relative flex items-center">
            <Button
              text="Хочу мероприятие 🎉"
              onClick={pageData.section_1.handleModalOpen}
              theme="dark"
            />
            <span
              ref={diamondRightParallax.ref}
              className="absolute right-[-450px] top-[-25px] pointer-events-none hidden xl:block"
              style={{
                transform: `translateY(${diamondRightParallax.offset}px)`,
                transition: 'transform 0.2s ease-out',
                willChange: 'transform',
              }}
            >
              <img
                src={star}
                alt=""
                className="-translate-y-1/2 scale-x-[-1] w-auto"
              />
            </span>
          </div>

          {pageData.section_1.isModalOpen && (
            <ModalForm onClose={pageData.section_1.handleModalClose} />
          )}
        </section>

        {(() => {
          const checklist = pageData.section_2.firstProgramList.checklist;
          const keyValuesLines = (pageData.section_2.keyValues || '')
            .split('\n')
            .filter((line: string) => line.trim())
            .map((line: string) => line.replace(/^[•\-\*]\s*/, ''));

          const hasProgram = checklist.length > 0;
          const hasKeyValues = keyValuesLines.length > 0;
          const hasBoth = hasProgram && hasKeyValues;
          const hasAny = hasProgram || hasKeyValues;
          const hasConditions = pageData.section_2.conditionData.length > 0;

          // Ничего нет — не рендерим секцию вообще
          if (!hasAny && !hasConditions) return null;

          return (
            <section className="flex flex-col items-center gap-6 sm:gap-8 md:gap-[32px] py-8 sm:py-12 md:py-16 lg:py-[64px] max-w-[1280px] w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
              {hasAny && (
                <div className={`flex w-full ${hasBoth ? 'flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-x-[64px]' : 'flex-col items-center'}`}>
                  {hasProgram && (
                    <div className={hasBoth ? 'flex-1' : 'w-full max-w-[640px]'}>
                      <ProgramList
                        heading={pageData.section_2.firstProgramList.heading}
                        checklist={checklist}
                        large={!hasBoth}
                      />
                    </div>
                  )}
                  {hasKeyValues && (
                    <div className={hasBoth ? 'flex-1' : 'w-full max-w-[640px]'}>
                      <ProgramList
                        heading="Ключевые ценности"
                        checklist={keyValuesLines}
                        large={!hasBoth}
                      />
                    </div>
                  )}
                </div>
              )}

              {hasConditions && (
                <div className="flex flex-wrap justify-center sm:justify-evenly gap-x-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-4 sm:gap-y-6 w-full">
                  {pageData.section_2.conditionData.map((condition, index) => (
                    <ConditionItem
                      key={index}
                      value={condition.value}
                      description={condition.description}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })()}

        <section className="flex flex-col w-screen py-4 sm:py-6 md:py-8 lg:py-[64px] gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] overflow-hidden">
          <Marquee
            speed={60}
            direction="right"
            autoFill={true}
            pauseOnHover={true}
          >
            {pageData.section_3.images.map((img) => (
              <div
                key={img.id}
                className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[410px]
               w-[200px] sm:w-[240px] md:w-[280px] lg:w-[304px]
               px-2 sm:px-4 md:px-[8px]"
              >
                <img
                  src={img.url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            ))}

          </Marquee>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CarcassSubPages;
