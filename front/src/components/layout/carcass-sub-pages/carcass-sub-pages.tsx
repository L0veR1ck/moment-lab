import Marquee from 'react-fast-marquee';
import ConditionItem from '../../ui/condition-item/condition-item';
import Button from '../../ui/button/button';
import ModalForm from '../../ui/modal-form/modal-form';
import ProgramList from '../../ui/program-list/program-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useParallax } from '../../../shared/hooks/use-parallax';
import { littleDiamond } from '../../../assets/3d-objects';

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
    secondProgramList: {
      heading: string;
      checklist: string[];
    };
    conditionData: {
      value: string;
      description: string;
    }[];
  };
  section_3: {
    photos: number[];
    pathImages: string;
    formatImages: string;
  };
};

function CarcassSubPages(pageData: CarcassSubPagesProps) {
  const diamondParallax = useParallax(0.4, 50);
  const diamondRightParallax = useParallax(0.45, 100);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex flex-col items-center">
        <section className="flex flex-wrap justify-center gap-[32px] pt-[64px] pb-[32px] max-w-[1280px]">
          <h1 className="relative font-semibold text-[64px] text-[var(--color-dark-blue)]">
            <span
              ref={diamondParallax.ref}
              className="absolute left-[-230px] top-0 pointer-events-none"
              style={{
                transform: `translateY(${diamondParallax.offset}px)`,
                transition: 'transform 0.2s ease-out',
                willChange: 'transform',
              }}
            >
              <img src={littleDiamond} alt="" className="-translate-y-1/2" />
            </span>

            {pageData.section_1.mainHeading}
          </h1>

          <p className="text-2xl text-[var(--color-blue)]/55 text-center mb-[32px]">
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
              className="absolute right-[-450px] top-[-25px] pointer-events-none"
              style={{
                transform: `translateY(${diamondRightParallax.offset}px)`,
                transition: 'transform 0.2s ease-out',
                willChange: 'transform',
              }}
            >
              <img
                src={littleDiamond}
                alt=""
                className="-translate-y-1/2  scale-x-[-1]"
              />
            </span>
          </div>

          {pageData.section_1.isModalOpen && (
            <ModalForm onClose={pageData.section_1.handleModalClose} />
          )}
        </section>

        <section className="flex flex-col items-center flex-wrap gap-[32px] py-[64px] max-w-[1280px] w-full">
          <div className="flex gap-x-[256px] justify-between w-full">
            <ProgramList
              heading={pageData.section_2.firstProgramList.heading}
              checklist={pageData.section_2.firstProgramList.checklist}
            />
            <ProgramList
              heading={pageData.section_2.secondProgramList.heading}
              checklist={pageData.section_2.secondProgramList.checklist}
            />
          </div>
          <div className="flex justify-evenly w-full">
            {pageData.section_2.conditionData.map((condition, index) => (
              <ConditionItem
                key={index}
                value={condition.value}
                description={condition.description}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col w-screen py-[64px] gap-[32px] overflow-hidden">
          <Marquee
            speed={60}
            direction="right"
            autoFill={true}
            pauseOnHover={true}
          >
            {pageData.section_3.photos.map((photoNumber) => (
              <div key={photoNumber} className="h-[410px] w-[304px] px-[8px]">
                <img
                  className="h-full w-full object-cover rounded-2xl"
                  src={`${pageData.section_3.pathImages}-${photoNumber}.${pageData.section_3.formatImages}`}
                  alt={''}
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
