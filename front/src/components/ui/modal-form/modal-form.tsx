import Form from '../form/form';
import { createPortal } from 'react-dom';

type ModalFormProps = {
  onClose: () => void;
};

function ModalForm({ onClose }: ModalFormProps) {
  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        bg-[var(--color-blue)]/30 backdrop-blur-xs
        flex items-center justify-center
        px-4 sm:px-6
      "
    >
      <div className="w-full max-w-[520px] max-h-[90vh] overflow-y-auto">
        <Form isModal={true} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}

export default ModalForm;
