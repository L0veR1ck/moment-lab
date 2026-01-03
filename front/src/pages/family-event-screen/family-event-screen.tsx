import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";
import { useToggle } from "../../shared/hooks/useToggle";

function FamilyEventScreen() {
  const modal = useToggle();
  const photos = Array.from({ length: 8 }, (_, i) => i + 1);

  const personalIqGameData = {
    section_1: {
      mainHeading: "Семейные мероприятия",
      mainAnnotation:
        "Улучшение взаимодействия сотрудников, стимулирование лояльности, разрядка рабочей обстановки и формирование благоприятной атмосферы взаимовыручки и поддержки в праздничной атмосфере, возможность отдохнуть вместе с семьей.",
      handleModalOpen: modal.open,
      handleModalClose: modal.close,
      isModalOpen: modal.isOpen,
    },
    section_2: {
      firstProgramList: {
        heading: "Что входит в программу?",
        checklist: [
          "9 зон активностей с ведущим",
          "3 интерактивные зоны",
          "3 зоны с тематическими мастер-классами",
          "Техническое оснащение",
          "Координатор",
        ],
      },
      secondProgramList: {
        heading: "Ключевые ценности:",
        checklist: [
          "Укрепление лояльности сотрудников",
          "Work-life balance через включение семьи",
          "Формирование «семейного» бренда компании",
          "Снижение стресса и эмоциональная разгрузка",
        ],
      },
      conditionData: [
        { value: "до 200", description: "участников" },
        { value: "2,5 часа", description: "длительность мероприятия" },
      ],
    },
    section_3: {
      photos: photos,
      pathImages: "./src/assets/private/private",
      formatImages: "webp",
    },
  };

  return <CarcassSubPages {...personalIqGameData} />;
}

export default FamilyEventScreen;
