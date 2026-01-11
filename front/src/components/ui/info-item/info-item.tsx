type InfoItemProps = {
  icon?: string;
  text: string;
};

function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div
      className={`flex rounded-lg bg-[var(--color-blue)]/15 p-3 sm:p-4 lg:p-[16px] justify-center items-center ${icon ? 'gap-2 sm:gap-3 lg:gap-4' : ''}`}
    >
      {icon && (
        <img
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-[32px] lg:w-auto"
          src={icon}
          alt=""
        />
      )}
      <p className="font-semibold text-sm sm:text-base md:text-lg text-[var(--color-dark-blue)] whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}

export default InfoItem;
