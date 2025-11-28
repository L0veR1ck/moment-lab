import Button from "../button/button";

function StartSection() {
    return (
        <section className="flex justify-center items-end bg-cover bg-[url(./src/assets/content/start-photo.png)] bg-no-repeat h-[calc(100vh-95px)] w-screen">
            <div className="flex gap-[164px] pb-[64px] items-center justify-between w-full max-w-[1280px]">
                <h1 className="text-3xl font-semibold text-[var(--color-beige)]">Наша суперсила — уникальные события, от которых бегут мурашки</h1>
                <Button text="Хочу мероприятие 🎉" theme={'light'}></Button>
            </div>
        </section>
    )
}

export default StartSection;