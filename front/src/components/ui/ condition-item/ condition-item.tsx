type ConditionItemProp = {
  value: string;
  description: string;
};

function ConditionItem({ value, description }: ConditionItemProp) {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-[var(--color-blue)] text-[64px] whitespace-nowrap">
        {value}
      </p>
      <p className="font-semibold text-lg text-[var(--color-blue)]">
        {description}
      </p>
    </div>
  );
}

export default ConditionItem;
