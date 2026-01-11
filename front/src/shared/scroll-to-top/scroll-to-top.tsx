import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '0px';

    window.scrollTo({
      top: 0,
      left: 0,
    });

    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
