import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import Button from "../../components/ui/button/button";
import ModalForm from "../../components/ui/modal-form/modal-form";
import ConditionItem from "../../components/ui/ condition-item/ condition-item";
import { bottleIcon, cakeIcon, clockIcon, hangerIcon, megaphoneIcon, microphoneIcon, parkingIcon, sofaIcon } from "../../assets/icons";
import InfoItem from "../../components/ui/info-item/info-item";
import Marquee from "react-fast-marquee";
import { cross, check } from "../../assets/3d-objects/index.ts";
import { useParallax } from "../../shared/hooks/use-parallax.ts";
import { useToggle } from "../../shared/hooks/useToggle.ts";

function RentScreen() {
    const modal = useToggle();
    const photos = Array.from({ length: 12 }, (_, i) => i + 1);

    const checkOffset = useParallax(0.20, 70);
    const crossOffset = useParallax(0.15, 160);

    const conditionData = [
        { value: "500 м²", description: "общая площадь пространства" },
        { value: "3 зала", description: "площадью 300м², 100м², 70м² соответственно" },
        { value: "до 300", description: "человек вместисмость пространства" },
        { value: "3,5 м", description: "высота пололков" }
    ];

    const infoDataPresent = [
        { icon: hangerIcon, text: "гардероб" },
        { icon: parkingIcon, text: "охраняемая парковка" },
        { icon: cakeIcon, text: "место под кейтеринг" },
        { icon: sofaIcon, text: "необходимая мебель" },
        { icon: microphoneIcon, text: "профессиональное оборудование" },
    ];

    const infoDataAbsent = [
        { icon: clockIcon, text: "ограничений по времени" },
        { icon: megaphoneIcon, text: "ограничений по громкости" },
        { icon: bottleIcon, text: "пробкового сбора" },
    ];

    return (
        <div className='flex flex-col items-center'>
            <Header />
            <main className='flex flex-col items-center'>
                <section className="flex flex-wrap justify-center gap-[32px] pt-[64px] pb-[32px] max-w-[1280px]">
                    <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">Пространство для событий</h1>
                    <p className="text-2xl text-[var(--color-blue)]/55 text-center mb-[32px]">Стильное и уютное место для ваших праздников, корпоративов, тренингов, фотосессий, мастер-классов и много другого!</p>
                    <Button text="Арендовать 🎉" onClick={modal.open} theme={'dark'}></Button>
                    {modal.isOpen && <ModalForm onClose={modal.close} />}
                </section>
                <section className="flex flex-col flex-wrap gap-[32px] py-[64px] max-w-[1280px] w-full">
                    <div className="relative">
                        <h2 className="text-5xl font-semibold text-[var(--color-dark-blue)] text-left pr-10">
                            У нас есть
                        </h2>
                        <img 
                            src={check} 
                            className="absolute top-[-50px] left-[200px] -mt-12" 
                            style={{ 
                                transform: `translateY(calc(-50% + ${checkOffset}px))`,
                                transition: 'transform 0.2s ease-out',
                                willChange: 'transform'
                            }}
                            alt="" 
                        />
                    </div>
                    <div className="flex gap-x-[64px]">
                        {conditionData.map((condition, index) => (
                            <ConditionItem key={index} value={condition.value} description={condition.description} />
                        ))}
                    </div>
                    <div className="flex gap-[16px] py-[32px] flex-wrap">
                        {infoDataPresent.map((info, index) => (
                            <InfoItem key={index} icon={info.icon} text={info.text} />
                        ))}
                    </div>
                </section>
                <section className="flex flex-col flex-wrap gap-[32px] py-[32px] max-w-[1280px] w-full">
                    <div className="relative">
                        <img 
                            src={cross} 
                            className="absolute top-2/5 right-[10px] -mt-12" 
                            style={{ 
                                transform: `translateY(calc(-50% + ${crossOffset}px))`,
                                transition: 'transform 0.2s ease-out',
                                willChange: 'transform'
                            }}
                            alt="" 
                        />
                        <h2 className="text-5xl font-semibold text-[var(--color-dark-blue)] text-left">У нас нет</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-[16px]">
                        {infoDataAbsent.map((info, index) => (
                            <InfoItem key={index} icon={info.icon} text={info.text} />
                        ))}
                    </div>
                </section>
                <section className="flex flex-col w-screen py-[64px] gap-[32px] overflow-hidden">
                    <Marquee speed={60} autoFill={true} pauseOnHover={true}>
                        {photos.slice(0, 6).map((roomNumber) => (
                            <div key={roomNumber} className="h-[225px] w-[340px] px-[8px]">
                            <img
                                className="h-full w-full object-cover rounded-2xl"
                                src={`./src/assets/room/room-${roomNumber}.JPEG`}
                                alt={`Room ${roomNumber}`}
                            />
                        </div>
                        ))}
                    </Marquee>
                    
                    <Marquee speed={60} direction="right" autoFill={true} pauseOnHover={true}>
                        {photos.slice(6, 12).map((roomNumber) => (
                            <div key={roomNumber} className="h-[225px] w-[340px] px-[8px]">
                            <img
                                className="h-full w-full object-cover rounded-2xl"
                                src={`./src/assets/room/room-${roomNumber}.JPEG`}
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

export default RentScreen;