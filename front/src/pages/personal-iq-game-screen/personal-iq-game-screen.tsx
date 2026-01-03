import CarcassSubPages from '../../components/layout/carcass-sub-pages/carcass-sub-pages';
import { useToggle } from '../../shared/hooks/useToggle';

function PersonalIqGameScreen() {
  const modal = useToggle();
  const photos = Array.from({ length: 8 }, (_, i) => i + 1);

  const personalIqGameData = {
    section_1: {
      mainHeading: 'Персональная разумная игра',
      mainAnnotation:
        'Адаптируемая интеллектуальная игра, разработанная индивидуально для вашей компании, подарит неповторимый опыт.',
      handleModalOpen: modal.open,
      handleModalClose: modal.close,
      isModalOpen: modal.isOpen,
    },
    section_2: {
      firstProgramList: {
        heading: 'Что входит в программу?',
        checklist: [
          'Ведущий',
          'Персональная разработка',
          'Техническое оснащение',
          'Координатор',
        ],
      },
      secondProgramList: {
        heading: 'Ключевые ценности:',
        checklist: [
          'Более близкое знакомство коллектива',
          'Быстрая адаптация новичков',
          'Тестирование корпоративной культуры',
          'Выявление лидеров на раннем этапе',
          'Нетворкинг в неформальной обстановке',
        ],
      },
      conditionData: [
        { value: 'до 60', description: 'участников' },
        { value: '2 часа', description: 'длительность мероприятия' },
      ],
    },
    section_3: {
      photos: photos,
      pathImages: './src/assets/private/private',
      formatImages: 'webp',
    },
  };

  return <CarcassSubPages {...personalIqGameData} />;
}

export default PersonalIqGameScreen;
