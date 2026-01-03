import Button from '../button/button';
import { success } from '../../../assets/icons';

type Props = {
  onClose: () => void;
};

function SuccessSubmitModal({ onClose }: Props) {
  return (
    <div className="flex flex-col items-center justify-center bg-[var(--color-beige)] rounded-lg gap-[24px] p-[48px]">
      <img src={success} alt="" className="w-16 h-16 mx-auto" />
      <p className="font-semibold text-center text-lg text-[var(--color-dark-blue)]">
        Заявка отправлена!
        <br />
        Мы свяжемся с вами в скором времени.
      </p>
      <Button onClick={onClose} text="Хорошо!" />
    </div>
  );
}

export default SuccessSubmitModal;
