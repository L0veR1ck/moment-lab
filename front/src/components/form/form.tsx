import Button from "../button/button";

type FormProps = {
    isModal: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onClose?: () => void,
}

function Form({ isModal, onClose }: FormProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted!');
    };


    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-[16px] bg-[var(--color-beige)] rounded-xl px-[42px] py-[24px]" aria-labelledby="form-title">
            {isModal &&
                <>
                    <button onClick={onClose} className="absolute top-0 right-0 w-4 h-4 cursor-pointer border-none bg-transparent p-5" aria-label="Закрыть">
                        <span className="relative block w-full h-full">
                            <span className="absolute top-1/2 left-1/2 w-5 h-[2px] bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                            <span className="absolute top-1/2 left-1/2 w-5 h-[2px] bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
                        </span>
                    </button>
                    <p className="text-center whitespace-nowrap font-semibold text-2xl text-[var(--color-dark-blue)] mt-[12px]" id="form-title">Расскажите о вашем мероприятии</p>
                </>

            }

            <div className="flex flex-col">
                <label className="font-semibold text-[var(--color-dark-blue)] text-lg" htmlFor="name">Имя</label>
                <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="name" type="text" placeholder="Введите имя" required></input>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-[var(--color-dark-blue)] text-lg" htmlFor="mail">Электронная почта</label>
                <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="mail" type="email" placeholder="Введите электронную почту"></input>

            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-[var(--color-dark-blue)] text-lg" htmlFor="phone">Номер телефона</label>
                <input className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55" id="phone" type="tel" placeholder="Введите номер телефона" required></input>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-[var(--color-dark-blue)] text-lg" htmlFor="wishes">Ваши пожелания</label>
                <textarea className="border border-[var(--color-blue)]/25 rounded-sm px-[16px] py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55 max-h-[200px]" id="wishes" rows={3} placeholder="Введите ваши пожелания "></textarea>
            </div>


            <div className="flex flex-col">
                <label className="sr-only">Выберите файл</label>
                <input
                    type="file"
                    className="block w-full text-sm text-gray-500
                            file:py-2 file:px-4
                            file:rounded-sm file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#D9E9FF] file:text-[var(--color-dark-blue)]
                            hover:file:bg-[#C7DFFF]"
                />
            </div>

            <div className="flex flex-col gap-[12px] mt-[16px]">
                <div className="flex justify-center gap-[16px]">
                    <input type="checkbox" required />
                    <label className="text-xs text-[var(--color-dark-blue)]/55 leading-none">
                        Соглашаюсь на <a href="/" className="underline underline-offset-[.2rem]">обработку персональных данных</a> из формы.
                    </label>
                </div>
                <Button text="Отправить форму" />
            </div>
        </form>
    )
}


export default Form;