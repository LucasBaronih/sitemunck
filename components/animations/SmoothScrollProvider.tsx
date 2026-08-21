'use client';

import { useEffect } from 'react';
import { useSmoothScroll } from '@/components/animations/SmoothScroll';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  // Register GSAP ScrollTrigger globally on client
  useEffect(() => {
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      // Refresh after load to ensure correct positions
      ScrollTrigger.refresh();
    })();
  }, []);

  return <>{children}</>;
}
