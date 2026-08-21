'use client';

import { type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // negative moves slower / opposite
  className?: string;
}

/**
 * Parallax wrapper using global scroll progress.
 * Uses viewport-based interpolation so no per-element ref is needed,
 * avoiding the framer-motion "ref not hydrated" runtime error.
 */
export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const { scrollY } = useScroll();
  const yRaw = useTransform(scrollY, [0, 1000], [speed * 100, -speed * 100]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <motion.div style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
