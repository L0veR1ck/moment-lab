import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CarcassSubPages from '../../components/layout/carcass-sub-pages/carcass-sub-pages';
import { useToggle } from '../../shared/hooks/useToggle';
import type { GalleryImage } from '../../shared/types/image';
import { api, getFileUrl } from '../../api/client';
import { getActiveTeamBuildingImages } from '../../shared/data/galleries';

function EventDetailScreen() {
  const { slug } = useParams<{ slug: string }>();
  const modal = useToggle();
  const [images, setImages] = useState<GalleryImage[]>([]);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => api.events.getBySlug(slug!),
    enabled: !!slug,
  });

  useEffect(() => {
    async function loadImages() {
      if (event?.photos && event.photos.length > 0) {
        const galleryImages: GalleryImage[] = event.photos
          .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
          .map((photo: any, index: number) => ({
            id: String(photo.id ?? index),
            url: getFileUrl(photo.photoUrl),
          }));

        setImages(galleryImages);
      } else {
        const defaultImages = await getActiveTeamBuildingImages();
        setImages(defaultImages);
      }
    }
    
    if (event) {
      loadImages();
    }
  }, [event]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        color: 'var(--color-blue)',
        fontSize: '1.5rem'
      }}>
        Загрузка...
      </div>
    );
  }

  if (error || !event) {
    const backPath = slug?.startsWith('quest-') ? '/immersive-quests' : '/school-events';
    return <Navigate to={backPath} replace />;
  }

  const eventData = {
    section_1: {
      mainHeading: event.title,
      mainAnnotation: event.description,
      handleModalOpen: modal.open,
      handleModalClose: modal.close,
      isModalOpen: modal.isOpen,
    },
    section_2: {
      firstProgramList: {
        heading: 'Что входит в программу?',
        checklist: (event.programDescription || '')
          .split('\n')
          .filter((line: string) => line.trim())
          .map((line: string) => line.replace(/^[•\-\*]\s*/, '')),
      },
      keyValues: event.keyValues || '',
      conditionData: event.characteristics
        .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
        .map((char: any) => ({
          value: char.value,
          description: char.name,
        })),
    },
    section_3: {
      images,
    },
  };

  return <CarcassSubPages {...eventData} />;
}

export default EventDetailScreen;
