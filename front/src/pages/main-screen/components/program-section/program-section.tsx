import ProgramCard from "./components/program-card/program-card";

function ProgramSection() {
    return (
        <section className="flex flex-col w-full py-[64px] max-w-[1280px]">
            <h2 className="text-center font-semibold text-[64px] text-[var(--color-dark-blue)] pb-[24px]">Программы и услуги</h2>
            <div className="flex flex-col py-[32px] gap-[32px]">
                <div className="flex overflow-hidden gap-[32px] w-full">
                    <ProgramCard
                        link="/corporate-events"
                        title={"Корпоративные мероприятия"}
                        description={"События, от которых бегут мурашки, ощущаются моменты радости и вдохновения"}
                        imageUrl={"bg-[url(./src/assets/program-cards/card-1.jpg)]"}
                        imagePosition={"bg-position-[center_10%]"}
                    />
                    <ProgramCard
                        link={"/"}
                        title={"Частные мероприятия"}
                        description={"Воплощаем ваши идеи"}
                        imageUrl={"bg-[url(./src/assets/program-cards/card-2.jpg)]"}
                        imagePosition={"bg-position-[center_20%]"}
                    />
                </div>
                <div className="flex overflow-hidden gap-[32px] w-full">
                    <ProgramCard
                        link={"/school-events"}
                        title={"События для школ"}
                        description={"Это не просто мероприятия, а инвестиции в будущее вашего класса"}
                        imageUrl={"bg-[url(./src/assets/program-cards/card-3.png)]"}
                        imagePosition={"bg-position-[center_52%]"}
                    />
                    <ProgramCard
                        link={"/"}
                        title={"Пространство для событий"}
                        description={"Многофункциональный лофт, подходящий для организации вашего мероприятия"}
                        imageUrl={"bg-[url(./src/assets/program-cards/card-4.JPEG)]"}
                        imagePosition={"bg-position-[center_45%]"}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProgramSection;