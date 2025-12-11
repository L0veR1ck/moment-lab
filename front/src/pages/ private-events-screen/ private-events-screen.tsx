import { useState } from "react";
import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import Button from "../../components/ui/button/button";
import ModalForm from "../../components/ui/modal-form/modal-form";
import InfoItem from "../../components/ui/info-item/info-item";
import Marquee from "react-fast-marquee";
import { littleDiamond, pompon } from "../../assets/3d-objects/index.ts";
import { useParallax } from "../../shared/use-parallax.ts";

function PrivateEventsScreen() {
    const [isModalOpen, setModalOpen] = useState(false);
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const diamondOffset = useParallax(0.55, 100);
    const pomponOffset = useParallax(0.35, 240);

    const infoDataPresent = [
        { text: "Уникальность" },
        { text: "Веселье и азарт" },
        { text: "Универсальность" },
        { text: "Простота и доступность" },
    ];

    const handleModalClick = () => {
        setModalOpen(prev => !prev)
    }

    return (
        <div className='flex flex-col items-center'>
            <Header />
            <main className='flex flex-col items-center'>
                <section className="flex flex-wrap justify-center gap-[32px] pt-[64px] pb-[32px] max-w-[1280px]">
                    <div className="relative">
                        <img 
                            src={littleDiamond} 
                            className="absolute top-2/5 left-[-230px] -mt-12" 
                            style={{ 
                                transform: `translateY(calc(-50% + ${diamondOffset}px))`,
                                transition: 'transform 0.2s ease-out',
                                willChange: 'transform'
                            }}
                            alt="Алмаз" 
                        />
                        <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
                            Частные мероприятия
                        </h1>
                    </div>
                    <p className="text-2xl text-[var(--color-blue)]/55 text-center mb-[32px]">Создаем события по вашему запросу, начиная от Дня Рождения, заканчивая свадьбой и корпоративом. Разработка и реализация любой концепции</p>
                    <Button text="Хочу мероприятие 🎉 " onClick={handleModalClick} theme={'dark'}></Button>
                    {isModalOpen && <ModalForm onClose={handleModalClick} />}
                </section>
                <section className="flex flex-col flex-wrap gap-[32px] py-[64px] max-w-[1280px] w-full">
                    <div className="relative">
                        <img 
                            src={pompon} 
                            className="absolute top-2/5 right-[10px] -mt-12" 
                            style={{ 
                                transform: `translateY(calc(-50% + ${pomponOffset}px))`,
                                transition: 'transform 0.2s ease-out',
                                willChange: 'transform'
                            }}
                            alt="Помпон" 
                        />
                        <h2 className="text-5xl font-semibold text-[var(--color-dark-blue)] text-left pr-10">
                            Преимущества
                        </h2>
                    </div>
                    <div className="flex gap-[16px] flex-wrap">
                        {infoDataPresent.map((info, index) => (
                            <InfoItem key={index} text={info.text} />
                        ))}
                    </div>
                    <p className="text-2xl text-[var(--color-blue)]/55">У вас есть идея? У нас уже есть реализация! Создаем мероприятия для вас и про вас!</p>
                </section>
                <section className="flex flex-col w-screen py-[64px] gap-[32px] overflow-hidden">
                    <Marquee speed={60} direction="right" autoFill={true} pauseOnHover={true}>
                        {photos.map((photoNumber) => (
                            <div key={photoNumber} className="h-[410px] w-[304px] px-[8px]">
                            <img
                                className="h-full w-full object-cover rounded-2xl"
                                src={`./src/assets/private/private-${photoNumber}.webp`}
                                alt={""}
                            />
                        </div>
                        ))}
                    </Marquee>
                </section>
            </main>
            <Footer />
        </div>

    )
}

export default PrivateEventsScreen;