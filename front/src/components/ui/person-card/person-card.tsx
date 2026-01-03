type PersonCardProps = {
  bgImage: string;
  name: string;
  job: string;
};

function PersonCard({ bgImage, name, job }: PersonCardProps) {
  return (
    <div className="flex flex-col gap-[16px] items-center h-[320px] w-[264px] rounded-[8px] px-[24px] py-[16px] bg-[var(--color-blue)]/15">
      <div
        className={`h-full w-full bg-cover bg-no-repeat ${bgImage} bg-position-[center_45%]`}
      ></div>
      <div className="flex flex-col items-center gap-[8px]">
        <p className="font-semibold text-[24px] text-[var(--color-dark-blue)]">
          {name}
        </p>
        <p className="text-[18px] text-[var(--color-dark-blue)]">{job}</p>
      </div>
    </div>
  );
}

export default PersonCard;
