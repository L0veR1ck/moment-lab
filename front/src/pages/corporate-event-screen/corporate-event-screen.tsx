import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import EventCard from "../../components/ui/event-card/event-card";
import { ROUTES } from "../../consts/routes";

function CorporateEventScreen() {
    return (
        <div className='flex flex-col items-center'>
            <Header />
            <main className='flex flex-col items-center'>
                <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)] pt-[64px]">Корпоративные мероприятия</h1>
                <section className="flex flex-row flex-wrap justify-center gap-[32px] py-[64px] max-w-[1280px]">
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/event-card-1.png)]"}
                        imgPosition="bg-position-[center_45%]"
                        titleCard={"Персональная разумная игра"}
                        description={"Адаптируемая интеллектуальная игра, разработанная индивидуально для вашей компании, подарит неповторимый опыт"}
                        path={ROUTES.PERSONAL_IQ_GAME}
                    />
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/event-card-2.png)]"}
                        imgPosition="bg-position-[center_43%]"
                        titleCard={"Квесты живого действия"}
                        description={"Полное погружение в детективную историю: множество актеров-персонажей, сложный сюжет с разветвлениями, свобода исследования истории"}
                        path={ROUTES.LIVE_ACTION_QUESTS}
                    />
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/event-card-3.png)]"}
                        titleCard={"Творческий тимбилдинг"}
                        description={"Приготовься раскрыть свой творческий потенциал и объединить усилия с командой ради общего успеха"}
                        path={ROUTES.ART_TEAM_BUILDING}
                    />
                    <EventCard
                        urlImg={"bg-[url(./src/assets/event-card/event-card-4.png)]"}
                        titleCard={"Семейные мероприятия"}
                        description={"Улучшение взаимодействия сотрудников, стимулирование лояльности, разрядка рабочей обстановки и формирование благоприятной атмосферы"}
                        path={ROUTES.FAMILY_EVENT}
                    />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default CorporateEventScreen;