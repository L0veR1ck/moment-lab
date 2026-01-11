import ConditionItem from '../../../../components/ui/condition-item/condition-item';

function InfoSection() {
  const statsData = [
    { value: '15 лет', description: 'опыта проведения мероприятий' },
    { value: '100+', description: 'реализованных проектов' },
    { value: '500+', description: 'частных мероприятий' },
    { value: '250+', description: 'интерактивов  ' },
  ];

  return (
    <section className="flex py-8 sm:py-16 md:py-[64px] lg:py-[120px] w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-[120px] justify-between w-full">
        <div className="flex flex-1 lg:grow-[1.5] flex-col gap-4 sm:gap-6 md:gap-[32px] min-w-0">
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[var(--color-dark-blue)] break-words">
            Кто мы?
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-blue)] break-words">
            Момент.Лаб — креативное агентство по организации мероприятий со
            смыслом. Трансформируем любой формат: от корпоративных тимбилдингов
            до семейных праздников в уникальный опыт
          </p>
          <img
            className="h-[200px] sm:h-[250px] md:h-[290px] rounded-2xl object-cover w-full"
            src="./src/assets/content/info.webp"
            alt="О нас"
          />
        </div>
        <div className="flex-1 grid gap-y-6 sm:gap-y-8 md:gap-y-2 lg:gap-y-[96px] gap-x-3 sm:gap-x-6 md:gap-x-8 lg:gap-x-[96px] grid-rows-2 grid-cols-2 py-4 sm:py-8 md:py-8 lg:py-[64px] min-w-0">
          {statsData.map((stat, index) => (
            <ConditionItem
              key={index}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
