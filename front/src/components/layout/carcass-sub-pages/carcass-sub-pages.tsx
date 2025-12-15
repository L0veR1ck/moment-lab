import Marquee from "react-fast-marquee";
import ConditionItem from "../../ui/ condition-item/ condition-item";
import Button from "../../ui/button/button";
import ModalForm from "../../ui/modal-form/modal-form";
import ProgramList from "../../ui/program-list/program-list";
import Header from "../header/header";
import Footer from "../footer/footer";

type CarcassSubPagesProps = {
    section_1: {
        mainHeading: string,
        mainAnnotation: string,
        handleModalClick: () => void,
        isModalOpen: boolean
    },
    section_2: {
        firstProgramList: {
            heading: string;
            checklist: string[];
        },
        secondProgramList: {
            heading: string;
            checklist: string[];
        },
        conditionData: {
            value: string;
            description: string;
        }[]
    },
    section_3: {
        photos: number[],
        pathImages: string,
        formatImages:string
    }
}


function CarcassSubPages(pageData: CarcassSubPagesProps) {
    return (
        <div className='flex flex-col items-center'>
            <Header />
            <main className='flex flex-col items-center'>
                <section className="flex flex-wrap justify-center gap-[32px] pt-[64px] pb-[32px] max-w-[1280px] h-[calc(100vh-95px)]">
                    <h1 className="font-semibold text-[64px] text-[var(--color-dark-blue)]">
                        {pageData.section_1.mainHeading}
                    </h1>
                    <p className="text-2xl text-[var(--color-blue)]/55 text-center mb-[32px]">
                        {pageData.section_1.mainAnnotation}
                    </p>
                    <Button text="Хочу мероприятие 🎉" onClick={pageData.section_1.handleModalClick} theme={'dark'}></Button>
                    {pageData.section_1.isModalOpen && <ModalForm onClose={pageData.section_1.handleModalClick} />}
                    <div className="flex gap-x-[256px] justify-between w-full">
                        <ProgramList heading={pageData.section_2.firstProgramList.heading} checklist={pageData.section_2.firstProgramList.checklist} />
                        <ProgramList heading={pageData.section_2.secondProgramList.heading} checklist={pageData.section_2.secondProgramList.checklist} />
                    </div>
                    <div className="flex justify-evenly w-full">
                        {pageData.section_2.conditionData.map((condition, index) => (
                            <ConditionItem key={index} value={condition.value} description={condition.description} />
                        ))}
                    </div>
                </section>
                <section className="flex flex-col w-screen py-[64px] gap-[32px] overflow-hidden">
                    <Marquee speed={60} direction="right" autoFill={true} pauseOnHover={true}>
                        {pageData.section_3.photos.map((photoNumber) => (
                            <div key={photoNumber} className="h-[410px] w-[304px] px-[8px]">
                                <img
                                    className="h-full w-full object-cover rounded-2xl"
                                    src={`${pageData.section_3.pathImages}-${photoNumber}.${pageData.section_3.formatImages}`}
                                    alt={""}
                                />
                            </div>
                        ))}
                    </Marquee>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default CarcassSubPages;