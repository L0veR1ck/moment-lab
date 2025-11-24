function Form() {
    return (
        <form className="flex flex-col bg-[var(--color-beige)] rounded-xl px-[42px] py-[24px] w-[500px]">

            <label className="font-semibold text-[var(--color-dark-blue)] text-lg" id="name">Имя</label>
            <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="name" type="text" placeholder="Введите имя" required></input>

            <label className="font-semibold text-[var(--color-dark-blue)] text-lg" id="mail">Электронная почта</label>
            <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="mail" type="email" placeholder="Введите электронную почту"></input>

            <label className="font-semibold text-[var(--color-dark-blue)] text-lg" id="phone">Номер телефона</label>
            <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="phone" type="tel" placeholder="Введите номер телефона" required></input>

            <label className="font-semibold text-[var(--color-dark-blue)] text-lg" id="wishes">Ваши пожелания</label>
            <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="wishes" type="text"  placeholder="Введите ваши пожелания "></input>

        </form>

    )

}


export default Form;