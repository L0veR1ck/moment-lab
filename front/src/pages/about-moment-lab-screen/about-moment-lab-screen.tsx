import { useState } from "react";
import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import Button from "../../components/ui/button/button";
import PersonCard from "../../components/ui/person-card/person-card";
import ModalForm from "../../components/ui/modal-form/modal-form";

function AboutMomentLab() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    return (
        <div className='flex flex-col items-center'>
            <Header />
            <main className="flex flex-col items-center w-full max-w-[1280px]">
                <section className="flex justify-between pt-[64px] pb-[32px] w-full">
                    <div className="flex flex-[1.5] flex-col gap-[32px] pr-[64px] py-[120px]">
                        <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">Момент.лаб</h1>
                        <p className="text-[24px] text-[var(--color-blue)]/55">Креативное агентство по организации мероприятий со смыслом <br /> Наша суперсила — уникальные события, от которых бегут мурашки</p>
                        <Button text="Хочу мероприятие 🎉" onClick={handleModalClick} width=" w-fit"></Button>
                        {isModalOpen && <ModalForm onClose={handleModalClick} />}
                    </div>
                    <div className="flex-2 rounded-l-[15px] bg-cover bg-no-repeat bg-[url(./src/assets/about-screen/team.png)] bg-position-[100%]" />
                </section>
                <section className="flex flex-col items-center gap-[32px] pt-[64px] pb-[32px] w-full">
                    <h2 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">Наша команда</h2>
                    <div className="flex gap-[32px] h-[320px]">
                        <PersonCard bgImage={"bg-[url(./src/assets/about-screen/person.png)]"} name={"Иван Иванов"} job={"Котенок момент.лаб"} />
                        <PersonCard bgImage={"bg-[url(./src/assets/about-screen/person.png)]"} name={"Иван Иванов"} job={"Котенок момент.лаб"} />
                        <PersonCard bgImage={"bg-[url(./src/assets/about-screen/person.png)]"} name={"Иван Иванов"} job={"Котенок момент.лаб"} />
                        <PersonCard bgImage={"bg-[url(./src/assets/about-screen/person.png)]"} name={"Иван Иванов"} job={"Котенок момент.лаб"} />
                    </div>
                </section>
                <section className="flex flex-col items-center gap-[32px] pt-[64px] pb-[32px] w-full">
                    <h2 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">Контакты</h2>
                    <ul className="flex gap-[100px]">
                        <li className="flex flex-col items-center gap-[12px]">
                            <p className="font-semibold text-[24px] text-[var(--color-blue)]">Адрес</p>
                            <p className="text-[18px] text-[var(--color-blue)]/80">г. Березовский, ул. Кольцевая, 2В/6</p>
                        </li>
                        <li className="flex flex-col items-center gap-[12px]">
                            <p className="font-semibold text-[24px] text-[var(--color-blue)]">Телефон</p>
                            <p className="text-[18px] text-[var(--color-blue)]/80">+7 (912) 123 45 67</p>
                        </li>
                        <li className="flex flex-col items-center gap-[12px]">
                            <p className="font-semibold text-[24px] text-[var(--color-blue)]">Почта</p>
                            <p className="text-[18px] text-[var(--color-blue)]/80">moment.lab@gmail.com</p>
                        </li>
                    </ul>
                    <img className="rounded-[12px]" src="./src/assets/about-screen/map.png" />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default AboutMomentLab;