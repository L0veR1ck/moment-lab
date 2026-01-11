import Marquee from 'react-fast-marquee';
import type { GalleryImage } from '../../../shared/types/image';

type Props = {
  images: GalleryImage[];
};

export function ImageMarquee({ images }: Props) {
  return (
    <section className="flex flex-col w-screen py-4 sm:py-6 md:py-8 lg:py-[32px] overflow-hidden">
      <Marquee speed={60} direction="right" autoFill pauseOnHover>
        {images.map((img) => (
          <div
            key={img.id}
            className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[410px]
                       w-[200px] sm:w-[240px] md:w-[280px] lg:w-[304px]
                       px-2 sm:px-4 md:px-[8px]"
          >
            <img
              src={img.url}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover rounded-xl sm:rounded-2xl"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
