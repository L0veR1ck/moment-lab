import Button from '../../../../components/ui/button/button';

function StartSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="
        relative
        flex justify-center items-end
        bg-cover bg-top bg-no-repeat
        w-screen

        min-h-[35vh]        /* мобилка <640px */
        sm:min-h-[50vh]     /* планшет 640-768px */
        md:min-h-[90vh]    /* ПК >=768px */
      "
      style={{
        backgroundImage: 'url(\'./src/assets/content/start-photo.png\')',
      }}
    >
      <div
        className="
          flex flex-col sm:flex-row
          gap-8 sm:gap-[164px]
          pb-16 sm:pb-[64px]
          items-center justify-center sm:justify-between
          w-full max-w-[1280px] px-4
        "
      >
        <h1
          className="
            text-l sm:text-3xl md:text-4xl
            font-semibold
            text-[var(--color-beige)]
            text-left
          "
        >
          Наша суперсила — уникальные события, от которых бегут мурашки
        </h1>

        <div className="hidden md:block">
          <Button
            text="Хочу мероприятие 🎉"
            onClick={scrollToForm}
            theme="light"
          />
        </div>
      </div>
    </section>
  );
}

export default StartSection;
