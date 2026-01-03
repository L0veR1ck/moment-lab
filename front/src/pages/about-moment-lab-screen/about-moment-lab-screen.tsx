import { useState } from "react";
import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import Button from "../../components/ui/button/button";
import PersonCard from "../../components/ui/person-card/person-card";
import ModalForm from "../../components/ui/modal-form/modal-form";
import MyMap from "../../components/ui/my-map/my-map";
import { useParallax } from "../../shared/hooks/use-parallax";
import { gift } from "../../assets/3d-objects";

function AboutMomentLab() {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClick = () => setModalOpen((prev) => !prev);
  const giftParallax = useParallax(0.4, 75);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex flex-col items-center w-full">
        <section className="relative pt-[64px] pb-[32px] h-[calc(100vh-180px)] w-full">
          <div className="flex justify-between items-start max-w-[1280px] mx-auto py-[120px] gap-[64px]">
            <div className="flex flex-col gap-[32px] z-10">
              <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
                Момент.лаб
              </h1>
              <p className="text-[24px] text-[var(--color-blue)]/55">
                Креативное агентство по организации мероприятий со смыслом{" "}
                <br />
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
            <div className="w-[45vw] flex-shrink-0"></div>
          </div>
          <div className="absolute right-0 top-[64px] bottom-[32px] w-[50vw] rounded-l-[15px] bg-cover bg-no-repeat bg-[url(./src/assets/about-screen/team.png)] bg-[60%]" />
        </section>
        <div
          ref={giftParallax.ref}
          className="relative w-full pointer-events-none"
          style={{ height: 0 }}
        >
          <img
            src={gift}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: "450px",
              top: "-350px",
              left: "45%",
              transform: `translateY(${giftParallax.offset}px)`,
              willChange: "transform",
            }}
          />
        </div>
        <section className="flex flex-col items-center gap-[32px] pt-[64px] pb-[32px] w-full max-w-[1280px]">
          <h2 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
            Наша команда
          </h2>
          <div className="flex gap-[32px] h-[320px]">
            <PersonCard
              bgImage={"bg-[url(./src/assets/about-screen/person.png)]"}
              name={"Иван Иванов"}
              job={"Котенок момент.лаб"}
            />
            <PersonCard
              bgImage={"bg-[url(./src/assets/about-screen/person.png)]"}
              name={"Иван Иванов"}
              job={"Котенок момент.лаб"}
            />
            <PersonCard
              bgImage={"bg-[url(./src/assets/about-screen/person.png)]"}
              name={"Иван Иванов"}
              job={"Котенок момент.лаб"}
            />
            <PersonCard
              bgImage={"bg-[url(./src/assets/about-screen/person.png)]"}
              name={"Иван Иванов"}
              job={"Котенок момент.лаб"}
            />
          </div>
        </section>
        <section className="flex flex-col items-center gap-[32px] pt-[64px] pb-[32px] w-full max-w-[1280px]">
          <h2 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
            Контакты
          </h2>
          <ul className="flex gap-[100px]">
            <li className="flex flex-col items-center gap-[12px]">
              <p className="font-semibold text-[24px] text-[var(--color-blue)]">
                Адрес
              </p>
              <a
                className="text-lg text-[var(--color-blue)]/80"
                target="_blank"
                href="https://yandex.ru/maps/29397/berezovskyi/house/koltsevaya_ulitsa_2v_6/YkkYcQJoTEcDQFtsfXR4d39gYw==/?ll=60.758524%2C56.896337&z=16"
              >
                г. Березовский, ул. Кольцевая, 2В/6
              </a>
            </li>
            <li className="flex flex-col items-center gap-[12px]">
              <p className="font-semibold text-[24px] text-[var(--color-blue)]">
                Телефон
              </p>
              <a
                className="text-lg text-[var(--color-blue)]/80"
                href="tel:+79121234567"
              >
                +7 (912) 123 45 67
              </a>
            </li>
            <li className="flex flex-col items-center gap-[12px]">
              <p className="font-semibold text-[24px] text-[var(--color-blue)]">
                Почта
              </p>
              <a
                className="text-lg text-[var(--color-blue)]/80"
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
