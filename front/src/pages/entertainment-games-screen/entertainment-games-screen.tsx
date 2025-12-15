import { useState } from "react";
import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";


function EntertainmentGamesScreen() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const personalIqGameData = {
        section_1: {
            mainHeading: "Развлекательные игры",
            mainAnnotation: "Драйвовые игры и челленджи для вашего класса, формат легко трансформируется и адаптируется под любой возраст.",
            handleModalClick: handleModalClick,
            isModalOpen: isModalOpen
        },
        section_2: {
            firstProgramList: {
                heading: "Что входит в программу?",
                checklist: [
                    "9-12 активных заданий",
                    "Техническое оснащение",
                    "Ведущий",
                    "Помощники"
                ]
            },
            secondProgramList: {
                heading: "Что будем развивать?",
                checklist: [
                    "Умение работать на публику",
                    "Умение поддерживать",
                    "Быстрая реакция",
                    "Критическое мышление",
                    "Анализ информации"
                ]
            },
            conditionData: [
                { value: "до 100", description: "участников" },
                { value: "1,5 часа", description: "длительность мероприятия" }
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

export default EntertainmentGamesScreen;
