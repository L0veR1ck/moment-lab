import { useState } from "react";
import CarcassSubPages from "../../components/layout/carcass-sub-pages/carcass-sub-pages";


function ArtTeamBuildingScreen() {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClick = () => setModalOpen(prev => !prev)
    const photos = Array.from({ length: 8 }, (_, i) => i + 1);

    const personalIqGameData = {
        section_1: {
            mainHeading: "Творческий тимбилдинг",
            mainAnnotation: "Приготовься раскрыть свой творческий потенциал и объединить усилия с командой ради общего успеха. Откажись от шаблонных подходов и погружайся в атмосферу вдохновения!",
            handleModalClick: handleModalClick,
            isModalOpen: isModalOpen
        },
        section_2: {
            firstProgramList: {
                heading: "Что входит в программу?",
                checklist: [
                    "Ведущий",
                    "6 мастеров",
                    "Материалы для творчества",
                    "Техническое оснащение",
                    "Координатор"
                ]
            },
            secondProgramList: {
                heading: "Ключевые ценности:",
                checklist: [
                    "Взаимодействие всех со всеми",
                    "Разрушение рутины и шаблонов мышления",
                    "Выявление скрытых талантов",
                    "Создание tangible-результата",
                    "Повышение мотивации через творчество"
                ]
            },
            conditionData: [
                { value: "до 200", description: "участников" },
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

export default ArtTeamBuildingScreen;
