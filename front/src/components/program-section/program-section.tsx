import { Link } from "react-router-dom";

function ProgramSection() {
    return (
        <section className="flex flex-col w-full py-[64px] max-w-[1280px]">
            <h2 className="text-center font-semibold text-[64px] text-[var(--color-dark-blue)] pb-[24px]">Программы и услуги</h2>
            <div className="flex flex-col py-[32px] gap-[32px]">
                <div className="flex gap-[32px] w-full">
                    <Link to="/" className="overflow-hidden flex flex-1 flex-col p-[24px] gap-[16px] bg-[var(--color-blue)]/5 rounded-[16px] h-[384px] hover:bg-[var(--color-blue)]/15 hover:cursor-pointer">
                        <p className="font-semibold text-2xl text-[var(--color-dark-blue)]">Корпоративные мероприятия</p>
                        <p className="text-lg text-[var(--color-blue)]/55">События, от которых бегут мурашки, ощущаются моменты радости и вдохновения</p>
                        <img className="w-full border-[8px] border-[var(--color-beige)] rounded-[32px]" src="./src/assets/program-cards/card-1.png"></img>
                    </Link>
                    <Link to="/" className="overflow-hidden flex flex-1 flex-col p-[24px] gap-[16px] bg-[var(--color-blue)]/5 rounded-[16px] h-[384px] hover:bg-[var(--color-blue)]/15 hover:cursor-pointer">
                        <p className="font-semibold text-2xl text-[var(--color-dark-blue)]">Частные мероприятия</p>
                        <p className="text-lg text-[var(--color-blue)]/55">Мероприятия, направленные на укрепление командного духа</p>
                        <img className="w-full border-[8px] border-[var(--color-beige)] rounded-[32px]" src="./src/assets/program-cards/card-2.png"></img>
                    </Link>
                </div>
                <div className="flex gap-[32px] w-full">
                    <Link to="/" className="overflow-hidden flex flex-1 flex-col p-[24px] gap-[16px] bg-[var(--color-blue)]/5 rounded-[16px] h-[384px] hover:bg-[var(--color-blue)]/15 hover:cursor-pointer">
                        <p className="font-semibold text-2xl text-[var(--color-dark-blue)]">Интерактивы</p>
                        <p className="text-lg text-[var(--color-blue)]/55">Мероприятия, направленные на развитие метанавыков и soft skills</p>
                        <img className="w-full border-[8px] border-[var(--color-beige)] rounded-[32px]" src="./src/assets/program-cards/card-3.png"></img>
                    </Link>
                    <Link to="/" className="overflow-hidden flex flex-1 flex-col p-[24px] gap-[16px] bg-[var(--color-blue)]/5 rounded-[16px] h-[384px] hover:bg-[var(--color-blue)]/15 hover:cursor-pointer">
                        <p className="font-semibold text-2xl text-[var(--color-dark-blue)]">Аренда помещений</p>
                        <p className="text-lg text-[var(--color-blue)]/55">Возможность арендовать три зала для ваших мероприятий</p>
                        <img className="w-full border-[8px] border-[var(--color-beige)] rounded-[32px]" src="./src/assets/program-cards/card-4.png"></img>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ProgramSection;