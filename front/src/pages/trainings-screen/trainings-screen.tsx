import { useState } from "react";
import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";


function TrainingsScreen() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const personalIqGameData = {
        section_1: {
            mainHeading: "Тренинги",
            mainAnnotation: "Специальный тренинг для вашего класса, лидерство, командообразование, профориентация, опишите ваш запрос, а мы составим программу, специально для вас.",
            handleModalClick: handleModalClick,
            isModalOpen: isModalOpen
        },
        section_2: {
            firstProgramList: {
                heading: "Что входит в программу?",
                checklist: [
                    "Ведущий",
                    "Помощники"
                ]
            },
            secondProgramList: {
                heading: "Что будем развивать?",
                checklist: [
                    "Лидерство",
                    "Командообразование",
                    "Профориоентация"
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

export default TrainingsScreen;
