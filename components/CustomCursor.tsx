'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    // Only on devices with fine pointer (desktop)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!mq.matches || prefersReduced) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, [role="button"], input, textarea, .cursor-target');
      setHovering(isInteractive);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            borderColor: hovering ? 'rgba(217,164,0,0.8)' : 'rgba(255,255,255,0.4)',
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center rounded-full border"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: hovering ? 6 : 5,
            height: hovering ? 6 : 5,
            backgroundColor: hovering ? '#d9a400' : '#ffffff',
          }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}
