'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDone(true);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setDone(true), 400);
      } else {
        setProgress(Math.floor(current));
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-industrial-950"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <span className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              Ultra<span className="text-mustard-400">Munck</span>
            </span>
          </motion.div>

          {/* Progress */}
          <div className="flex w-64 flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-300">
              <span>Carregando</span>
              <span className="text-mustard-400">{progress}%</span>
            </div>
            <div className="h-px w-full bg-white/10">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'linear' }}
                className="h-full bg-mustard-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
