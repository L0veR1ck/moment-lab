export type GalleryImage = {
  id: string;
  url: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  images: GalleryImage[];
};
