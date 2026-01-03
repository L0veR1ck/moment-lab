import { ball } from '../../assets/3d-objects';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import EventCard from '../../components/ui/event-card/event-card';
import { ROUTES } from '../../consts/routes';
import { useParallax } from '../../shared/hooks/use-parallax';

function SchoolEventScreen() {
  const ballParallax = useParallax(0.4, 100);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex flex-col items-center">
        <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)] pt-[64px]">
          События для школ
        </h1>
        <section className="flex flex-row flex-wrap justify-center gap-[32px] py-[64px] max-w-[1280px]">
          <div
            ref={ballParallax.ref}
            className="relative w-full pointer-events-none"
            style={{ height: 0 }}
          >
            <img
              src={ball}
              className="absolute left-[-60px]"
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
            titleCard={'Интеллектуальные игры'}
            description={
              'Динамичные интеллектуальные батлы: команды соревнуются на большом экране в серии разноформатных мини-игр'
            }
            path={ROUTES.INTELLECTUAL_GAMES}
          />
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/school-event-card-2.png)]'}
            imgPosition="bg-position-[center_45%]"
            titleCard={'Квесты  живого  действия'}
            description={
              'Полное погружение в детективную историю: множество актеров-персонажей, сложный сюжет с разветвлениями, свобода исследования истории'
            }
            path={ROUTES.LIVE_ACTION_QUESTS}
          />
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/school-event-card-3.png)]'}
            imgPosition="bg-position-[center_65%]"
            titleCard={'Развлекательные игры'}
            description={
              'Драйвовые игры и челленджи для вашего класса, формат легко трансформируется и адаптируется под любой возраст'
            }
            path={ROUTES.ENTERTAINMENT_GAMES}
          />
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/school-event-card-4.png)]'}
            titleCard={'Тренинги'}
            description={
              'Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас'
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
