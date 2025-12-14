import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import EventCard from "../../components/ui/event-card/event-card";

function SchoolEventScreen() {
    return (
        <div className='flex flex-col items-center'>
            <Header />
            <main className='flex flex-col items-center'>
                <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)] pt-[64px]">События для школ</h1>
                <section className="flex flex-row flex-wrap justify-center gap-[32px] py-[64px] max-w-[1280px]">
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/school-event-card-1.png)]"}
                        imgPosition="bg-position-[center_60%]"
                        titleCard={"Интеллектуальные игры"}
                        description={"Динамичные интеллектуальные батлы: команды соревнуются на большом экране в серии разноформатных мини-игр"}
                        path={"/intellectual-games"}
                    />
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/school-event-card-2.png)]"}
                        imgPosition="bg-position-[center_45%]"
                        titleCard={"Квесты  живого  действия"}
                        description={"Полное погружение в детективную историю: множество актеров-персонажей, сложный сюжет с разветвлениями, свобода исследования истории"}
                        path={"/live-action-quests"}
                    />
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/school-event-card-3.png)]"}
                        imgPosition="bg-position-[center_65%]"
                        titleCard={"Развлекательные игры"}
                        description={"Драйвовые игры и челленджи для вашего класса, формат легко трансформируется и адаптируется под любой возраст"}
                        path={"/entertainment-games"}
                    />
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/school-event-card-4.png)]"}
                        titleCard={"Тренинги"}
                        description={"Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас"}
                        path={"/trainings"}
                    />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default SchoolEventScreen;