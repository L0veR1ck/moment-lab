import Button from '../../../../components/ui/button/button';
import startPhoto from '../../../../assets/content/start-photo.png';

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
        backgroundImage: `url('${startPhoto}')`,
      }}
    >
      <div
        className="
          flex flex-col md:flex-row
          gap-8 md:gap-[164px]
          pb-16 md:pb-[64px]
          items-start md:items-end justify-start md:justify-between
          w-full max-w-[1280px] px-4 mx-auto
        "
      >
        <h1
          className="
            text-xl sm:text-2xl md:text-3xl lg:text-4xl
            font-semibold
            text-[var(--color-beige)]
            text-left
            max-w-full
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
