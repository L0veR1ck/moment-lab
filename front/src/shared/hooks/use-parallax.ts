import { useEffect, useRef, useState } from 'react';

export const useParallax = (speed = 0.5, maxOffset?: number) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const startScrollY = useRef<number | null>(null);
  const isActive = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive.current) {
          isActive.current = true;
          startScrollY.current = window.scrollY;
        }
      },
      {
        threshold: 0,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isActive.current || startScrollY.current === null) return;

      const delta = window.scrollY - startScrollY.current;
      if (delta < 0) return;

      let newOffset = delta * speed;

      if (maxOffset !== undefined) {
        newOffset = Math.min(newOffset, maxOffset);
      }

      setOffset(newOffset);
    };

    let rafId: number;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, maxOffset]);

  return { ref, offset };
};
