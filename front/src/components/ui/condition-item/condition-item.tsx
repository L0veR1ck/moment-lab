type ConditionItemProp = {
  value: string;
  description: string;
};

function ConditionItem({ value, description }: ConditionItemProp) {
  return (
    <div className="flex flex-col min-w-0">
      <p className="font-semibold text-[var(--color-blue)] text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-[64px] break-words whitespace-nowrap">
        {value}
      </p>
      <p className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-[var(--color-blue)] break-words">
        {description}
      </p>
    </div>
  );
}

export default ConditionItem;
