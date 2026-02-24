type ProgramListProps = {
  heading?: string;
  checklist?: string[];
  large?: boolean;
};

function ProgramList({ heading, checklist, large }: ProgramListProps) {
  return (
    <div className={`flex flex-col gap-3 sm:gap-4 md:gap-[16px] py-4 sm:py-6 md:py-[24px] border-t border-t-[var(--color-blue)]/10 w-full lg:w-auto ${large ? 'items-center text-center' : ''}`}>
      <p className={`font-semibold text-[var(--color-dark-blue)] break-words ${large ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[40px]' : 'text-lg sm:text-xl md:text-2xl'}`}>
        {heading}
      </p>
      <ul className={`list-disc ${large ? 'list-inside' : 'list-inside'}`}>
        {checklist?.map((listItem, itemIndex) => (
          <li
            key={itemIndex}
            className={`font-bold break-words ${large ? 'text-base sm:text-lg md:text-xl text-[var(--color-blue)]/55' : 'text-sm sm:text-base text-[var(--color-blue)]/55'}`}
          >
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramList;
