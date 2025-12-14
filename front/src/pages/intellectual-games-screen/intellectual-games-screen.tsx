import { useState } from "react";
import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";


function IntellectualGamesScreen() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const personalIqGameData = {
        section_1: {
            mainHeading: "Интеллектуальные игры",
            mainAnnotation: "Динамичные интеллектуальные батлы: команды соревнуются на большом экране в серии разноформатных мини-игр (викторины, головоломки, челленджи). Азарт и скорость!",
            handleModalClick: handleModalClick,
            isModalOpen: isModalOpen
        },
        section_2: {
            firstProgramList: {
                heading: "Что входит в программу?",
                checklist: [
                    "Ведущий",
                    "Помощники",
                    "Раздаточный материал",
                    "Техническое оснащение"
                ]
            },
            secondProgramList: {
                heading: "Что будем развивать?",
                checklist: [
                    "Скорость реакции",
                    "Командная координация",
                    "Логика",
                    "Умение работать в условиях ограниченного времени"
                ]
            },
            conditionData: [
                { value: "25-100", description: "участников" },
                { value: "1,5 часа", description: "длительность мероприятия" },
                { value: "7+", description: "возраст участников" }
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

export default IntellectualGamesScreen;
