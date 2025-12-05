function InfoSection() {
    const statsData = [
        { value: "15 лет", description: "опыта проведения мероприятий" },
        { value: "100+", description: "реализованных проектов" },
        { value: "500+", description: "частных мероприятий" },
        { value: "250+", description: "интерактивов  " }
    ];

    return (
        <section className="flex py-[120px] w-full max-w-[1280px]">
            <div className="flex gap-[120px] justify-between">
                <div className="flex flex-1 grow-[1.5] flex-col gap-[32px]">
                    <h2 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
                        Кто мы?
                    </h2>
                    <p className="text-lg text-[var(--color-blue)]">
                        Момент.Лаб — креативное агентство по организации мероприятий со смыслом. 
                        Трансформируем любой формат: от корпоративных тимбилдингов до семейных праздников в уникальный опыт
                    </p>
                    <img className="h-[290px] rounded-2xl object-cover" src="./src/assets/content/info.webp" />

                </div>
                <div className="flex-1 grid gap-y-[96px] gap-x-[96px] grid-rows-2 grid-cols-2 py-[64px]">
                    {statsData.map((stat, index) => (
                        <div key={index} className="flex flex-col">
                            <p className="font-semibold text-[var(--color-blue)] text-[64px] whitespace-nowrap">
                                {stat.value}
                            </p>
                            <p className="font-semibold text-lg text-[var(--color-blue)] whitespace-nowrap">
                                {stat.description.split(' ').slice(0, -1)}
                                <br />
                                {stat.description.split(' ').slice(-1)[0]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InfoSection;