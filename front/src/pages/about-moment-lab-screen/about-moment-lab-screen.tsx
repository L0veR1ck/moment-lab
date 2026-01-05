import { useState } from 'react';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import Button from '../../components/ui/button/button';
import PersonCard from '../../components/ui/person-card/person-card';
import ModalForm from '../../components/ui/modal-form/modal-form';
import MyMap from '../../components/ui/my-map/my-map';
import { useParallax } from '../../shared/hooks/use-parallax';
import { gift } from '../../assets/3d-objects';

function AboutMomentLab() {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClick = () => setModalOpen((prev) => !prev);
  const giftParallax = useParallax(0.4, 40);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        <section className="relative pt-0 lg:pt-[64px] pb-8 sm:pb-12 md:pb-[32px] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:h-[calc(100vh-180px)] w-full">
          <div className="absolute right-0 top-8 sm:top-12 md:top-16 lg:top-[64px] bottom-8 sm:bottom-12 md:bottom-[32px] w-full lg:w-[50vw] rounded-l-0 lg:rounded-l-[15px] bg-cover bg-no-repeat bg-[url(./src/assets/about-screen/team.png)] bg-[60%] opacity-20 lg:opacity-100 hidden lg:block" />

          <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] overflow-hidden rounded-b-[16px] lg:hidden">
            <img
              src="/src/assets/about-screen/team.png"
              alt="Команда Moment.lab"
              className="
      w-full h-full object-cover
      object-[50%_10%]
      sm:object-[50%_12%]
      md:object-[50%_15%]
    "
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start max-w-[1280px] mx-auto py-8 sm:py-12 md:py-16 lg:py-[120px] gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
            <div
              className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px]
z-10 w-full lg:w-auto
items-center text-center lg:items-start lg:text-left"
            >
              <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] break-words">
                Момент.лаб
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-[24px] text-[var(--color-blue)]/55 break-words">
                Креативное агентство по организации мероприятий со смыслом{' '}
                <br className="hidden sm:block" />
                Наша суперсила — уникальные события, от которых бегут мурашки
              </p>
              <Button
                text="Хочу мероприятие 🎉"
                onClick={handleModalClick}
                width="w-fit"
              />
              {isModalOpen && <ModalForm onClose={handleModalClick} />}
            </div>

            {/* Пустой блок нужен для того, чтобы текст корренкто переносился */}
            <div className="hidden lg:block w-[45vw] flex-shrink-0"></div>
          </div>
          <div className="absolute right-0 top-8 sm:top-12 md:top-16 lg:top-[64px] bottom-8 sm:bottom-12 md:bottom-[32px] w-full lg:w-[50vw] rounded-l-0 lg:rounded-l-[15px] bg-cover bg-no-repeat bg-[url(./src/assets/about-screen/team.png)] bg-[60%] opacity-20 lg:opacity-100 hidden lg:block" />
        </section>
        <div
          ref={giftParallax.ref}
          className="relative w-full pointer-events-none hidden xl:block"
          style={{ height: 0 }}
        >
          <img
            src={gift}
            className="absolute left-1/2 -translate-x-1/2 w-auto"
            style={{
              width: '450px',
              top: '-340px',
              left: '45%',
              transform: `translateY(${giftParallax.offset}px)`,
              willChange: 'transform',
            }}
          />
        </div>
        <section className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] pt-8 sm:pt-12 md:pt-16 lg:pt-[64px] pb-8 sm:pb-12 md:pb-[32px] w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] text-center break-words">
            Наша команда
          </h2>
          <div
            className="flex flex-col sm:flex-row flex-wrap
justify-center
gap-4 sm:gap-6 md:gap-8 lg:gap-[32px]
w-full max-w-full"
          >
            <PersonCard
              bgImage={'bg-[url(./src/assets/about-screen/person.png)]'}
              name={'Иван Иванов'}
              job={'Котенок момент.лаб'}
            />
            <PersonCard
              bgImage={'bg-[url(./src/assets/about-screen/person.png)]'}
              name={'Иван Иванов'}
              job={'Котенок момент.лаб'}
            />
            <PersonCard
              bgImage={'bg-[url(./src/assets/about-screen/person.png)]'}
              name={'Иван Иванов'}
              job={'Котенок момент.лаб'}
            />
            <PersonCard
              bgImage={'bg-[url(./src/assets/about-screen/person.png)]'}
              name={'Иван Иванов'}
              job={'Котенок момент.лаб'}
            />
          </div>
        </section>
        <section className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] pt-8 sm:pt-12 md:pt-16 lg:pt-[64px] pb-8 sm:pb-12 md:pb-[32px] w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] text-center break-words">
            Контакты
          </h2>
          <ul className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[100px] w-full sm:w-auto">
            <li className="flex flex-col items-center gap-2 sm:gap-3 md:gap-[12px]">
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-[var(--color-blue)]">
                Адрес
              </p>
              <a
                className="text-sm sm:text-base md:text-lg text-[var(--color-blue)]/80 text-center hover:text-[var(--color-blue)] transition break-words"
                target="_blank"
                href="https://yandex.ru/maps/29397/berezovskyi/house/koltsevaya_ulitsa_2v_6/YkkYcQJoTEcDQFtsfXR4d39gYw==/?ll=60.758524%2C56.896337&z=16"
              >
                г. Березовский, ул. Кольцевая, 2В/6
              </a>
            </li>
            <li className="flex flex-col items-center gap-2 sm:gap-3 md:gap-[12px]">
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-[var(--color-blue)]">
                Телефон
              </p>
              <a
                className="text-sm sm:text-base md:text-lg text-[var(--color-blue)]/80 hover:text-[var(--color-blue)] transition"
                href="tel:+79121234567"
              >
                +7 (912) 123 45 67
              </a>
            </li>
            <li className="flex flex-col items-center gap-2 sm:gap-3 md:gap-[12px]">
              <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-[var(--color-blue)]">
                Почта
              </p>
              <a
                className="text-sm sm:text-base md:text-lg text-[var(--color-blue)]/80 hover:text-[var(--color-blue)] transition break-all"
                href="mailto:moment.lab@gmail.com"
              >
                moment.lab@gmail.com
              </a>
            </li>
          </ul>
          <MyMap />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutMomentLab;
