function InfoSection() {
    return (
        <section className="flex py-[120px] w-full max-w-[1280px]">
            <div className="flex gap-[120px] justify-between">
                <div className="flex flex-col gap-[24px]">
                    <h2 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
                        Кто мы?
                    </h2>
                    <p className="text-lg text-[var(--color-blue)]">
                        Момент.Лаб — креативное агентство по организации мероприятий со смыслом. Трансформируем любой формат: от корпоративных тимбилдингов до семейных праздников в уникальный опыт
                    </p>
                    <img src="./src/assets/content/content.png" />

                </div>
                <div className="grid gap-y-[96px] gap-x-[96px] grid-rows-2 grid-cols-2 w-full py-[64px]">
                    <div className="flex flex-col w-full">
                        <p className="font-semibold text-[var(--color-blue)] text-[64px] whitespace-nowrap">15 лет</p>
                        <p className="font-semibold text-lg text-[var(--color-blue)] whitespace-nowrap">опыта проведения <br/> мероприятий</p>
                    </div> 

                    <div className="flex flex-col">
                        <p className="font-semibold text-[var(--color-blue)] text-[64px] whitespace-nowrap">100+</p>
                        <p className="font-semibold text-lg text-[var(--color-blue)]">корпоративных мероприятий</p>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-semibold text-[var(--color-blue)] text-[64px] whitespace-nowrap">500+</p>
                        <p className="font-semibold text-lg text-[var(--color-blue)]">частных мероприятий</p>
                    </div>
                    
                    <div className="flex flex-col">
                        <p className="font-semibold text-[var(--color-blue)] text-[64px] whitespace-nowrap">250+</p>
                        <p className="font-semibold text-lg text-[var(--color-blue)]">интерактивов</p>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default InfoSection;