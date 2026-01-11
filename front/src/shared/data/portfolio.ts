import type { PortfolioProject } from '../types/image';

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const images = import.meta.glob(
    '../../assets/portfolio/**/*.{jpg,jpeg,png,webp,avif}',
    {
      eager: true,
      import: 'default',
    },
  );

  const projectsMap = new Map<string, PortfolioProject>();

  Object.entries(images).forEach(([path, url]) => {
    // path: ../../assets/portfolio/Квиз SLK CEMENT/1.png
    const [, , , , folder] = path.split('/');

    if (!projectsMap.has(folder)) {
      projectsMap.set(folder, {
        id: folder,
        title: folder,
        images: [],
      });
    }

    projectsMap.get(folder)!.images.push({
      id: path,
      url: url as string,
    });
  });

  return Array.from(projectsMap.values()).map((project) => ({
    ...project,
    images: project.images.sort((a, b) =>
      a.url.localeCompare(b.url, undefined, { numeric: true }),
    ),
  }));
}
