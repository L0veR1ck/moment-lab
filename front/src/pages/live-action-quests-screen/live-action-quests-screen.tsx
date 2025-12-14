import { useState } from "react";
import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";


function LiveActionQuestsScreen() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const personalIqGameData = {
        section_1: {
            mainHeading: "Квесты живого действия",
            mainAnnotation: "Полное погружение в детективную историю: множество актеров-персонажей, сложный сюжет с разветвлениями, свобода исследования истории. Разгадка требует анализа и синтеза.",
            handleModalClick: handleModalClick,
            isModalOpen: isModalOpen
        },
        section_2: {
            firstProgramList: {
                heading: "Что входит в программу?",
                checklist: [
                    "Тематические декорации и реквизит",
                    "8-12 актеров",
                    "Техническое оснащение",
                    "Координатор"
                ]
            },
            secondProgramList: {
                heading: "Что будем развивать?",
                checklist: [
                    "Критическое мышление",
                    "Анализ информации",
                    "Построение гипотез",
                    "Ведение переговоров",
                    "Работа с большим объемом данных"
                ]
            },
            conditionData: [
                { value: "25-200", description: "участников" },
                { value: "1,5 часа", description: "длительность мероприятия" },
                { value: "14+", description: "возраст участников" },
            ]
        },
        section_3: {
            photos: photos,
            pathImages: "./src/assets/private/private",
            formatImages: "webp"
        }
    }

    return (
        <CarcassSubPages {...personalIqGameData} />
    )
}

export default LiveActionQuestsScreen;
