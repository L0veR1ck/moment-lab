import Form from '../form/form';

function FormSection() {

    return (
        <section className="flex justify-center py-[120px] max-w-[1280px]">
            <div className="flex justify-between bg-[var(--color-blue)] p-[32px] rounded-2xl">
                <div className="flex flex-col gap-[40px] max-w-[520px]">
                    <h2 className="font-semibold text-[64px]/13 text-[var(--color-beige)]">
                        Расскажите о вашем событии
                    </h2>
                    <p className="text-lg text-[var(--color-beige)]/55">
                        Опишите задачу или пришлите бриф.
                        <br/> 
                        Мы свяжемся с вами в течении двух часов.
                    </p>
                </div>
                <Form isModal={false}></Form>
            </div>
        </section>
    )
}


export default FormSection;