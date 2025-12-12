import { useEffect, useState } from 'react';

export const useParallax = (speed = 0.5, maxOffset?: number) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      let newOffset = scrollY * speed;
      
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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, maxOffset]);

  return offset;
};