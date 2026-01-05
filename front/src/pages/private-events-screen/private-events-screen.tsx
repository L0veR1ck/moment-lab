import Footer from '../../components/layout/footer/footer.tsx';
import Header from '../../components/layout/header/header.tsx';
import Button from '../../components/ui/button/button.tsx';
import ModalForm from '../../components/ui/modal-form/modal-form.tsx';
import InfoItem from '../../components/ui/info-item/info-item.tsx';
import Marquee from 'react-fast-marquee';
import { littleDiamond, pompon } from '../../assets/3d-objects/index.ts';
import { useParallax } from '../../shared/hooks/use-parallax.ts';
import { useToggle } from '../../shared/hooks/useToggle.ts';

function PrivateEventsScreen() {
  const modal = useToggle();
  const photos = Array.from({ length: 8 }, (_, i) => i + 1);

  const diamondParallax = useParallax(0.55, 80);
  const pomponParallax = useParallax(0.35, 240);

  const infoDataPresent = [
    { text: 'Уникальность' },
    { text: 'Веселье и азарт' },
    { text: 'Универсальность' },
    { text: 'Простота и доступность' },
  ];

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        <section className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] pt-8 sm:pt-12 md:pt-16 lg:pt-16 xl:pt-[120px] pb-8 sm:pb-12 md:pb-[32px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0 w-full">
          <div className="relative w-full">
            <div
              ref={diamondParallax.ref}
              className="pointer-events-none hidden xl:block absolute inset-x-0"
              style={{ top: '-70px', height: '1px' }}
            >
              <img
                src={littleDiamond}
                className="absolute left-[-0px] top-[40%]
                 -translate-y-1/2 w-auto"
                style={{
                  transform: `translateY(${diamondParallax.offset}px)`,
                  transition: 'transform 0.2s ease-out',
                  willChange: 'transform',
                }}
                alt=""
              />
            </div>
            <h1 className="text-center font-semibold
                 text-3xl sm:text-4xl md:text-5xl lg:text-[64px]
                 text-[var(--color-dark-blue)] break-words">
            Частные мероприятия
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-blue)]/55 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-[32px] break-words max-w-4xl">
            Создаем события по вашему запросу, начиная от Дня Рождения,
            заканчивая свадьбой и корпоративом. Разработка и реализация любой
            концепции
          </p>
          <Button
            text="Хочу мероприятие 🎉 "
            onClick={modal.open}
            theme={'dark'}
          ></Button>
          {modal.isOpen && <ModalForm onClose={modal.close} />}
        </section>
        <section className="flex flex-col gap-6 sm:gap-8 md:gap-[32px] py-8 sm:py-12 md:py-16 lg:py-[64px] max-w-[1280px] w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0">
          <div className="relative">
            <div
              ref={pomponParallax.ref}
              className="relative w-full pointer-events-none hidden xl:block"
              style={{ height: '1px', marginTop: '-40px' }}
            >
              <img
                src={pompon}
                className="absolute right-[10px] -translate-y-1/2 w-auto"
                style={{
                  top: '40%',
                  transform: `translateY(${pomponParallax.offset}px)`,
                  transition: 'transform 0.2s ease-out',
                  willChange: 'transform',
                }}
                alt="Помпон"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-dark-blue)] text-left pr-0 lg:pr-10 break-words">
              Преимущества
            </h2>
          </div>
          <div className="flex gap-3 sm:gap-4 md:gap-[16px] flex-wrap">
            {infoDataPresent.map((info, index) => (
              <InfoItem key={index} text={info.text} />
            ))}
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-blue)]/55 break-words">
            У вас есть идея? У нас уже есть реализация! Создаем мероприятия для
            вас и про вас!
          </p>
        </section>
        <section className="flex flex-col w-screen py-4 sm:py-6 md:py-8 lg:py-[32px] gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] overflow-hidden">
          <Marquee
            speed={60}
            direction="right"
            autoFill={true}
            pauseOnHover={true}
          >
            {photos.map((photoNumber) => (
              <div key={photoNumber} className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[410px] w-[200px] sm:w-[240px] md:w-[280px] lg:w-[304px] px-2 sm:px-4 md:px-[8px]">
                <img
                  className="h-full w-full object-cover rounded-xl sm:rounded-2xl"
                  src={`./src/assets/private/private-${photoNumber}.webp`}
                  alt={`Частное мероприятие ${photoNumber}`}
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

export default PrivateEventsScreen;
