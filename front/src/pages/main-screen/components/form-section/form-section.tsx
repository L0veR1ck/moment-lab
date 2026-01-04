import { mask } from '../../../../assets/3d-objects';
import Form from '../../../../components/ui/form/form';
import { useParallax } from '../../../../shared/hooks/use-parallax';

function FormSection() {
  const maskParallax = useParallax(0.5, 70);
  return (
    <section
      id="form-section"
      className="flex w-full py-8 sm:py-12 md:py-[120px] max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-0"
    >
      <div className="flex flex-col lg:flex-row w-full justify-between bg-[var(--color-blue)] p-4 sm:p-6 md:p-[32px] rounded-xl sm:rounded-2xl relative min-w-0">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-[40px] max-w-full lg:max-w-[520px] mb-6 lg:mb-0 min-w-0">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[64px] lg:leading-[1.3] text-[var(--color-beige)] break-words">
            Расскажите о вашем событии
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-beige)]/55 break-words">
            Опишите задачу или пришлите бриф.
            <br />
            Мы свяжемся с вами в скором времени.
          </p>
        </div>
        <div className="flex-1 lg:max-w-[500px] min-w-0">
          <Form isModal={false} />
        </div>
        <img
          src={mask}
          alt=""
          className="absolute pointer-events-none hidden lg:block"
          style={{
            top: '220px',
            left: '-80px',
            transform: `translateY(${maskParallax?.offset ?? 0}px)`,
            willChange: 'transform',
          }}
        />
      </div>
    </section>
  );
}

export default FormSection;
