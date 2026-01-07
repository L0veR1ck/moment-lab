import { ball } from '../../assets/3d-objects';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import EventCard from '../../components/ui/event-card/event-card';
import { ROUTES } from '../../consts/routes';
import { useParallax } from '../../shared/hooks/use-parallax';

function SchoolEventScreen() {
  const ballParallax = useParallax(0.4, 100);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] pt-8 sm:pt-12 md:pt-16 lg:pt-[64px] px-4 text-center break-words">
          События для школ
        </h1>
        <section className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-8 sm:py-12 md:py-16 lg:py-[64px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0 w-full">
          <div
            ref={ballParallax.ref}
            className="relative w-full pointer-events-none hidden lg:block"
            style={{ height: 0 }}
          >
            <img
              src={ball}
              className="absolute w-auto"
              style={{
                top: '-280px',
                transform: `translateY(${ballParallax.offset}px)`,
                willChange: 'transform',
              }}
            />
          </div>
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/school-event-card-1.png)]'}
            imgPosition="bg-position-[center_60%]"
            titleCard={'Активное командообразование'}
            description={
              'Динамичный тренинг по активному командообразованию для одного или нескольких классов.'
            }
            path={ROUTES.ACTIVE_TEAM_BUILDING}
          />
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/school-event-card-4.png)]'}
            titleCard={'Тренинги'}
            description={
              'Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас.'
            }
            path={ROUTES.TRAININGS}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SchoolEventScreen;
