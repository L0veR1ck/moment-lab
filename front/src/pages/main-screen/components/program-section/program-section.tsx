import { ROUTES } from '../../../../consts/routes';
import ProgramCard from './components/program-card/program-card';

function ProgramSection() {
  return (
    <section className="flex flex-col w-full py-8 sm:py-12 md:py-[64px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0 overflow-x-hidden">
      <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] pb-4 sm:pb-6 md:pb-[24px] break-words">
        Программы и услуги
      </h2>
      <div className="flex flex-col py-4 sm:py-6 md:py-[32px] gap-4 sm:gap-6 md:gap-[32px] w-full">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-[32px] w-full">
          <ProgramCard
            link={ROUTES.PRIVATE_EVENTS}
            title={'Частные мероприятия'}
            description={'Воплощаем идеи частных мероприятий'}
            imageUrl={'bg-[url(./src/assets/program-cards/card-1.jpg)]'}
            imagePosition={'bg-position-[center_20%]'}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-[32px] w-full">
          <ProgramCard
            link={ROUTES.SCHOOL_EVENTS}
            title={'События для школ'}
            description={'Разрабатываем осмысленные события в школе'}
            imageUrl={'bg-[url(./src/assets/program-cards/card-2.jpg)]'}
            imagePosition={'bg-position-[center_52%]'}
          />
          <ProgramCard
            link={ROUTES.IMMERSIVE_QUESTS}
            title={'Иммерсивные квесты'}
            description={'Полное погружение в детективную историю'}
            imageUrl={'bg-[url(./src/assets/program-cards/card-3.jpg)]'}
            imagePosition={'bg-position-[center_45%]'}
          />
        </div>
      </div>
    </section>
  );
}

export default ProgramSection;
