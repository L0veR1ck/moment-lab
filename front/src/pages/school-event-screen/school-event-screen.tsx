import { useQuery } from '@tanstack/react-query';
import { ball } from '../../assets/3d-objects';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import EventCard from '../../components/ui/event-card/event-card';
import { useParallax } from '../../shared/hooks/use-parallax';
import { api } from '../../api/client';

function SchoolEventScreen() {
  const ballParallax = useParallax(0.4, 100);

  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['events', 'active'],
    queryFn: () => api.events.getAll(1, 100, true),
  });

  const schoolEvents = eventsData?.items.filter(
    (event: any) => !event.urlSlug.startsWith('quest-'),
  );

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
          {isLoading ? (
            <div className="text-[var(--color-blue)] text-lg">Загрузка...</div>
          ) : schoolEvents && schoolEvents.length > 0 ? (
            schoolEvents.map((event: any) => (
              <EventCard
                key={event.id}
                urlImg={
                  event.mainPhotoUrl
                    ? `http://localhost:5009${event.mainPhotoUrl}`
                    : 'bg-gray-300'
                }
                titleCard={event.title}
                description={event.description}
                path={`/school-events/${event.urlSlug}`}
              />
            ))
          ) : (
            <div className="text-[var(--color-blue)] text-lg">
              Пока нет активных мероприятий для школ.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SchoolEventScreen;
