'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-industrial-950 py-24 lg:py-40">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="container-industrial relative z-10">
        <SectionHeading
          label="/ Depoimentos"
          title="Quem confia, recomenda"
          align="center"
        />

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <Quote className="mb-8 h-10 w-10 text-mustard-400" />
                <p className="heading-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-industrial-300">
                  {current.author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="mt-12 flex items-center justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Depoimento ${i + 1}`}
                className={`h-1 transition-all duration-300 ${
                  i === index ? 'w-12 bg-mustard-400' : 'w-6 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Marquee */}
        <Reveal direction="up" delay={0.2} className="mt-20 overflow-hidden border-y border-white/5 py-5">
          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-12">
                {['Movimentação de cargas', 'Locação de munck', 'Micro escavadeiras', 'Cargas pesadas', 'Piracicaba / SP', 'Atendimento rápido'].map((text) => (
                  <span key={text} className="flex items-center gap-12 font-mono text-sm uppercase tracking-[0.25em] text-industrial-400">
                    {text}
                    <span className="h-1.5 w-1.5 bg-mustard-400" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
