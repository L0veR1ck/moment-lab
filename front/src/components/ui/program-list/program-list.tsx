type ProgramListProps = {
  heading: string;
  checklist: string[];
};

function ProgramList({ heading, checklist }: ProgramListProps) {
  return (
    <div className="flex flex-col gap-[16px] py-[24px] border-t border-t-[var(--color-blue)]/10">
      <p className="text-2xl font-semibold text-[var(--color-dark-blue)]">
        {heading}
      </p>
      <ul className="list-disc list-inside">
        {checklist.map((listItem, itemIndex) => (
          <li
            key={itemIndex}
            className="font-bold text-base text-[var(--color-blue)]/55"
          >
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramList;
