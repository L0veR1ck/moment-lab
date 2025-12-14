import { useState } from "react";
import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";


function PersonalIqGameScreen() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const personalIqGameData = {
        section_1: {
            mainHeading: "Персональная разумная игра",
            mainAnnotation: "Адаптируемая интеллектуальная игра, разработанная индивидуально для вашей компании, подарит неповторимый опыт.",
            handleModalClick: handleModalClick,
            isModalOpen: isModalOpen
        },
        section_2: {
            firstProgramList: {
                heading: "Что входит в программу?",
                checklist: [
                    "Ведущий",
                    "Персональная разработка",
                    "Техническое оснащение",
                    "Координатор"
                ]
            },
            secondProgramList: {
                heading: "Ключевые ценности:",
                checklist: [
                    "Более близкое знакомство коллектива",
                    "Быстрая адаптация новичков",
                    "Тестирование корпоративной культуры",
                    "Выявление лидеров на раннем этапе",
                    "Нетворкинг в неформальной обстановке"
                ]
            },
            conditionData: [
                { value: "до 60", description: "участников" },
                { value: "2 часа", description: "длительность мероприятия" },
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

export default PersonalIqGameScreen;
