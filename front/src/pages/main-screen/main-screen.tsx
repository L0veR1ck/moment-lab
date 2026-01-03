import { gift, music, pompon } from '../../assets/3d-objects';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import { useParallax } from '../../shared/hooks/use-parallax';
import ClientsSection from './components/clients-section/clients-section';
import FormSection from './components/form-section/form-section';
import InfoSection from './components/info-section/info-section';
import ProgramSection from './components/program-section/program-section';
import ReviewsSection from './components/review-section/reviews-section';
import StartSection from './components/start-section/start-section';

function MainScreen() {
  const giftParallax = useParallax(0.4, 80);
  const pomponParallax = useParallax(0.2, 100);
  const musicParallax = useParallax(0.5, 70);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex flex-col items-center">
        <StartSection />
        <InfoSection />
        {/* style нужен для динамических объектов, tailwind - для значений, которые не меняются*/}
        <div
          ref={giftParallax.ref}
          className="relative w-full pointer-events-none"
          style={{ height: 0 }}
        >
          <img
            src={gift}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: '-350px',
              transform: `translateY(${giftParallax.offset}px)`,
              willChange: 'transform',
            }}
          />
        </div>

        <div
          ref={pomponParallax.ref}
          className="relative w-full pointer-events-none"
          style={{ height: 0 }}
        >
          <img
            src={pompon}
            className="absolute right-0"
            style={{
              top: '0px',
              transform: `translateY(${pomponParallax.offset}px)`,
              willChange: 'transform',
            }}
          />
        </div>

        <ProgramSection />

        <div ref={musicParallax.ref} className="relative w-full">
          <img
            src={music}
            className="absolute top-[-720px] left-1/2 -translate-x-1/2"
            style={{
              transform: `translateY(${musicParallax.offset}px)`,
              willChange: 'transform',
            }}
          />
        </div>
        <ClientsSection />
        <ReviewsSection />
        <FormSection />
      </main>
      <Footer />
    </div>
  );
}

export default MainScreen;
