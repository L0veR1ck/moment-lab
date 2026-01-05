import { cake } from '../../assets/3d-objects';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import EventCard from '../../components/ui/event-card/event-card';
import { ROUTES } from '../../consts/routes';
import { useParallax } from '../../shared/hooks/use-parallax';

function CorporateEventScreen() {
  const cakeParallax = useParallax(0.2, 40);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] pt-8 sm:pt-12 md:pt-16 lg:pt-[64px] px-4 text-center break-words">
          Корпоративные мероприятия
        </h1>
        <section className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-8 sm:py-12 md:py-16 lg:py-[64px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0 w-full">
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/event-card-1.png)]'}
            imgPosition="bg-position-[center_45%]"
            titleCard={'Персональная разумная игра'}
            description={
              'Адаптируемая интеллектуальная игра, разработанная индивидуально для вашей компании, подарит неповторимый опыт'
            }
            path={ROUTES.PERSONAL_IQ_GAME}
          />
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/event-card-2.png)]'}
            imgPosition="bg-position-[center_43%]"
            titleCard={'Квесты живого действия'}
            description={
              'Полное погружение в детективную историю: множество актеров-персонажей, сложный сюжет с разветвлениями, свобода исследования истории'
            }
            path={ROUTES.LIVE_ACTION_QUESTS}
          />
          <div
            ref={cakeParallax.ref}
            className="relative w-full pointer-events-none hidden lg:block"
            style={{ height: 0 }}
          >
            <img
              src={cake}
              className="absolute left-1/2 -translate-x-1/2 w-auto"
              style={{
                top: '-140px',
                transform: `translateY(${cakeParallax.offset}px)`,
                willChange: 'transform',
              }}
            />
          </div>
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/event-card-3.png)]'}
            titleCard={'Творческий тимбилдинг'}
            description={
              'Приготовься раскрыть свой творческий потенциал и объединить усилия с командой ради общего успеха'
            }
            path={ROUTES.ART_TEAM_BUILDING}
          />
          <EventCard
            urlImg={'bg-[url(./src/assets/event-card/event-card-4.png)]'}
            titleCard={'Семейные мероприятия'}
            description={
              'Улучшение взаимодействия сотрудников, стимулирование лояльности, разрядка рабочей обстановки и формирование благоприятной атмосферы'
            }
            path={ROUTES.FAMILY_EVENT}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CorporateEventScreen;
