import { useState } from 'react';
import Button from '../button/button';
import SuccessSubmitModal from './success-submit-modal';
import { api, uploadFile } from '../../../api/client';
import consentPdf from '../../../assets/согласие.pdf';

type FormProps = {
  isModal: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: () => void;
};

function Form({ isModal, onClose }: FormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const wishes = formData.get('wishes') as string;
      const file = formData.get('file') as File;

      let attachedFileName = null;
      let attachedFileUrl = null;

      // Загружаем файл, если он выбран
      if (file && file.size > 0) {
        try {
          const fileResult = await uploadFile(file, 'applications');
          attachedFileName = fileResult.fileName;
          attachedFileUrl = fileResult.fileUrl;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }

      await api.applications.create({
        clientName: name,
        clientEmail: email || null,
        clientPhone: phone,
        clientWishes: wishes || null,
        attachedFileName,
        attachedFileUrl,
        requestDate: null,
        status: 0,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Ошибка при отправке формы:', err);
      setError('Не удалось отправить форму. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    if (onClose) onClose();
  };

  return (
    <div className="relative w-full">
      {isModal && isSuccess && (
        <SuccessSubmitModal onClose={handleCloseSuccess} isModal />
      )}
      {(!isModal || !isSuccess) && (
        <form
          onSubmit={handleSubmit}
          className={`relative flex flex-col gap-3 sm:gap-4
             bg-[var(--color-beige)] rounded-xl
             px-4 sm:px-6 md:px-[42px]
             py-4 sm:py-6 md:py-[24px]
             w-full"
             ${isSuccess && !isModal ? 'invisible' : ''}`}
        >
          {isModal && (
            <>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 w-4 h-4 cursor-pointer border-none bg-transparent p-5"
                aria-label="Закрыть"
              >
                <span className="relative block w-full h-full">
                  <span className="absolute top-1/2 left-1/2 w-5 h-[2px] bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                  <span className="absolute top-1/2 left-1/2 w-5 h-[2px] bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
                </span>
              </button>
              <p
                className="text-center font-semibold text-lg sm:text-xl md:text-2xl text-[var(--color-dark-blue)] mt-2 sm:mt-3 md:mt-[12px] break-words"
                id="form-title"
              >
                Расскажите о вашем мероприятии
              </p>
            </>
          )}

          <div className="flex flex-col">
            <label
              className="text-left font-semibold text-[var(--color-dark-blue)] text-sm sm:text-base md:text-lg"
              htmlFor="name"
            >
              Имя <span className="text-[var(--color-red)]">*</span>
            </label>
            <input
              className="border border-[var(--color-blue)]/25 rounded-sm px-3 sm:px-4 md:px-[16px] py-2 sm:py-[6px] md:py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55 text-sm sm:text-base"
              id="name"
              name="name"
              type="text"
              placeholder="Введите имя"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-left font-semibold text-[var(--color-dark-blue)] text-sm sm:text-base md:text-lg"
              htmlFor="email"
            >
              Электронная почта
            </label>
            <input
              className="border border-[var(--color-blue)]/25 rounded-sm px-3 sm:px-4 md:px-[16px] py-2 sm:py-[6px] md:py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55 text-sm sm:text-base"
              id="email"
              name="email"
              type="email"
              placeholder="Введите электронную почту"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-left text-left font-semibold text-[var(--color-dark-blue)] text-sm sm:text-base md:text-lg"
              htmlFor="phone"
            >
              Номер телефона <span className="text-[var(--color-red)]">*</span>
            </label>
            <input
              className="border border-[var(--color-blue)]/25 rounded-sm px-3 sm:px-4 md:px-[16px] py-2 sm:py-[6px] md:py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55 text-sm sm:text-base"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Введите номер телефона"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-left font-semibold text-[var(--color-dark-blue)] text-sm sm:text-base md:text-lg"
              htmlFor="wishes"
            >
              Ваши пожелания
            </label>
            <textarea
              className="border border-[var(--color-blue)]/25 rounded-sm px-3 sm:px-4 md:px-[16px] py-2 sm:py-[6px] md:py-[8px] placeholder:text-[var(--color-blue)] placeholder:opacity-55 max-h-[200px] text-sm sm:text-base"
              id="wishes"
              name="wishes"
              rows={3}
              placeholder="Введите ваши пожелания "
            />
          </div>

          <div className="flex flex-col">
            <label className="sr-only">Выберите файл</label>
            <input
              type="file"
              name="file"
              accept=".txt,.pdf,.doc,.docx"
              className="block w-full text-sm text-gray-500
                            file:py-2 file:px-4
                            file:rounded-sm file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#D9E9FF] file:text-[var(--color-dark-blue)]
                            hover:file:bg-[#C7DFFF]"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex flex-col gap-[12px] mt-[16px]">
            <div className="flex justify-center gap-[16px]">
              <input type="checkbox" required />
              <label className="text-xs text-[var(--color-dark-blue)]/55 leading-none">
                Соглашаюсь на{' '}
                <a
                  href={consentPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-[.2rem]"
                >
                  обработку персональных данных
                </a>{' '}
                из формы.
              </label>
            </div>
            <Button text={isSubmitting ? "Отправка..." : "Отправить форму"} />
          </div>
        </form>
      )}

      {!isModal && isSuccess && (
        <SuccessSubmitModal onClose={handleCloseSuccess} isModal={false} />
      )}

    </div>
  );
}

export default Form;
