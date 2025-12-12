type InfoItemProps = {
    icon?: string;
    text: string;
}

function InfoItem({icon, text}: InfoItemProps){
    return(
        <div className={`flex rounded-lg bg-[var(--color-blue)]/15 p-[16px] justify-center items-center ${icon ? 'gap-4' : ''}`}>
            <img className="h-[32px]" src={icon} alt="" />
            <p className="font-semibold text-lg text-[var(--color-dark-blue)] text-nowrap">{text}</p>
        </div>
    )
}

export default InfoItem;