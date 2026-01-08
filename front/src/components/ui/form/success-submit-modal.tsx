import Button from '../button/button';
import { success } from '../../../assets/icons';
import clsx from 'clsx';

type Props = {
  onClose: () => void;
  isModal: boolean;
};

function SuccessSubmitModal({ onClose, isModal }: Props) {
  return (
    <div
      className={clsx(
        'bg-[var(--color-beige)] rounded-lg flex flex-col items-center justify-center gap-[24px]',
        isModal
          ? 'p-[48px]'
          : 'absolute inset-0 p-[24px]',
      )}
    >
      <img src={success} alt="" className="w-16 h-16" />
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
