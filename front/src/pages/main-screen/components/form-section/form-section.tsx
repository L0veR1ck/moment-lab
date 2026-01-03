import { mask } from "../../../../assets/3d-objects";
import Form from "../../../../components/ui/form/form";
import { useParallax } from "../../../../shared/hooks/use-parallax";


function FormSection() {
    const maskParallax = useParallax(0.5, 70);
    return (
        <section id='form-section' className="flex w-full py-[120px] max-w-[1280px]">
            <div className="flex w-full justify-between bg-[var(--color-blue)] p-[32px] rounded-2xl relative">
                <div className="flex flex-col gap-[40px] max-w-[520px]">
                <h2 className="font-semibold text-[64px]/13 text-[var(--color-beige)]">
                    Расскажите о вашем событии
                </h2>
                <p className="text-lg text-[var(--color-beige)]/55">
                    Опишите задачу или пришлите бриф.
                    <br />
                    Мы свяжемся с вами в скором времени.
                </p>
                </div>
                <Form isModal={false} />
                <img
                src={mask}
                alt=""
                className="absolute pointer-events-none"
                style={{
                    top: "220px",
                    left: "-80px",
                    transform: `translateY(${maskParallax?.offset ?? 0}px)`,
                    willChange: "transform",
                }}
                />

            </div>
        </section>

    )
}


export default FormSection;