import CarcassSubPages from '../../components/layout/carcass-sub-pages/carcass-sub-pages';
import { useToggle } from '../../shared/hooks/useToggle';

function ActiveTeamBuilding() {
  const modal = useToggle();
  const photos = Array.from({ length: 8 }, (_, i) => i + 1);

  const activeTeamBuildingData = {
    section_1: {
      mainHeading: 'Активное командообразование',
      mainAnnotation:
        'Динамичный тренинг по активному командообразованию для одного или нескольких классов. Цель — сплотить коллектив через энергичные игры и совместные задачи. Программа адаптируется под ваши цели, с возможностью участия родителей.Тренинг проходит в игровой форме.',
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
          'Интерактивные задания на взаимодействие и лидерство.',
          'Индивидуальный сценарий под ваш запрос.',
        ],
      },
      conditionData: [
        { value: 'до 100', description: 'участников' },
        { value: '1,5 часа', description: 'длительность мероприятия' },
      ],
    },
    section_3: {
      photos: photos,
      pathImages: './src/assets/private/private',
      formatImages: 'webp',
    },
  };

  return <CarcassSubPages {...activeTeamBuildingData} />;
}

export default ActiveTeamBuilding;
