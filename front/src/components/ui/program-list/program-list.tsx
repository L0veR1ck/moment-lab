type ProgramListProps = {
  heading?: string;
  checklist?: string[];
};

function ProgramList({ heading, checklist }: ProgramListProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-[16px] py-4 sm:py-6 md:py-[24px] border-t border-t-[var(--color-blue)]/10 w-full lg:w-auto">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--color-dark-blue)] break-words">
        {heading}
      </p>
      <ul className="list-disc list-inside">
        {checklist?.map((listItem, itemIndex) => (
          <li
            key={itemIndex}
            className="font-bold text-sm sm:text-base text-[var(--color-blue)]/55 break-words"
          >
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramList;
