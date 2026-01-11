import type { GalleryImage } from '../types/image';

export function buildGallery(
  images: Record<string, unknown>,
): GalleryImage[] {
  return Object.entries(images)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url], index) => ({
      id: `${index}`,
      url: url as string,
    }));
}
