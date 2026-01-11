import { useState, useEffect } from 'react';
import CarcassSubPages from '../../components/layout/carcass-sub-pages/carcass-sub-pages';
import { getTrainingImages } from '../../shared/data/galleries';
import { useToggle } from '../../shared/hooks/useToggle';
import type { GalleryImage } from '../../shared/types/image';

function TrainingsScreen() {
  const modal = useToggle();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    getTrainingImages().then(setImages);
  }, []);

  const trainingsData = {
    section_1: {
      mainHeading: 'Тренинги',
      mainAnnotation:
        'Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас.',
      handleModalOpen: modal.open,
      handleModalClose: modal.close,
      isModalOpen: modal.isOpen,
    },
    section_2: {
      firstProgramList: {
        heading: 'Что входит в программу?',
        checklist: [
          'Профессиональная команда: ведущий и хелперы.',
          'Масштабируемый формат для разного числа участников.',
          'Индивидуальный сценарий под ваш запрос.',
        ],
      },
      conditionData: [
        { value: 'до 100', description: 'участников' },
        { value: '1,5 часа', description: 'длительность мероприятия' },
      ],
    },
    section_3: {
      images,
    },
  };

  return <CarcassSubPages {...trainingsData} />;
}

export default TrainingsScreen;
