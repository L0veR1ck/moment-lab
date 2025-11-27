import Form from "../form/form";

type ModalFormProps = {
    onClose: () => void
}

function ModalForm({onClose}: ModalFormProps) {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-[var(--color-blue)]/30 backdrop-blur-xs z-1">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <Form isModal={true} onClose={onClose}/>
            </div>
        </div>
    )
}

export default ModalForm;