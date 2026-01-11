import type { GalleryImage } from '../types/image';
import { buildGallery } from './build-gallery';

/**
 * Частные мероприятия (assets)
 */
export async function getPrivateEventsImages(): Promise<GalleryImage[]> {
  const images = import.meta.glob(
    '../../assets/private/private-*.*',
    {
      eager: true,
      import: 'default',
    },
  );

  return buildGallery(images);
}

/**
 * Иммерсивные квесты (assets)
 */
export async function getQuestsImages(): Promise<GalleryImage[]> {
  const images = import.meta.glob(
    '../../assets/quests/quests-*.*',
    {
      eager: true,
      import: 'default',
    },
  );

  return buildGallery(images);
}

export async function getActiveTeamBuildingImages(): Promise<GalleryImage[]> {
  const images = import.meta.glob(
    '../../assets/active-team-building/active-team-building-*.*',
    {
      eager: true,
      import: 'default',
    },
  );

  return buildGallery(images);
}

export async function getTrainingImages(): Promise<GalleryImage[]> {
  const images = import.meta.glob(
    '../../assets/training/training-*.*',
    {
      eager: true,
      import: 'default',
    },
  );

  return buildGallery(images);
}
