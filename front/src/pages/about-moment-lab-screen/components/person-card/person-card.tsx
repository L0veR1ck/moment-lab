import { getFileUrl } from '../../../../api/client';

type PersonCardProps = {
  photoUrl?: string;
  name: string;
  job: string;
};

function PersonCard({ photoUrl, name, job }: PersonCardProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-[16px] items-center h-[320px] sm:h-[340px] md:h-[360px] w-full sm:w-[260px] md:w-[280px] lg:w-[300px] rounded-[8px] px-4 sm:px-6 md:px-[24px] py-3 sm:py-4 md:py-[16px] bg-[var(--color-blue)]/15">
      <div
        className="h-full w-full bg-cover bg-no-repeat bg-[center_30%] sm:bg-[center_35%] md:bg-[center_40%] lg:bg-[center_45%]"
        style={photoUrl ? { backgroundImage: `url(${getFileUrl(photoUrl)})` } : {}}
      ></div>
      <div className="flex flex-col items-center gap-2 sm:gap-[8px]">
        <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-[var(--color-dark-blue)] text-center break-words">
          {name}
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[var(--color-dark-blue)] text-center break-words">
          {job}
        </p>
      </div>
    </div>
  );
}

export default PersonCard;
