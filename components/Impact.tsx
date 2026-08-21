'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

const pillars = [
  { label: 'Força', desc: 'Capacidade para mover o que parece impossível.' },
  { label: 'Precisão', desc: 'Controle técnico em cada operação.' },
  { label: 'Segurança', desc: 'Foco total na integridade da carga e da equipe.' },
  { label: 'Velocidade', desc: 'Atendimento rápido para sua obra não parar.' },
];

export function Impact() {
  const { scrollYProgress } = useScroll();
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      className="relative overflow-hidden bg-industrial-950 py-24 lg:py-40"
      aria-label="Impacto"
    >
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="container-industrial relative z-10">
        {/* Section header */}
        <div className="mb-16 flex items-end justify-between gap-8">
          <Reveal direction="up">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-mustard-400" />
              <span className="section-label">/ Impacto</span>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <p className="hidden max-w-xs text-right font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-300 sm:block">
              O que move cada operação UltraMunck
            </p>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.label} direction="up" delay={i * 0.1} className="group relative">
              <div className="relative flex flex-col gap-6 bg-industrial-950 p-8 transition-colors duration-500 hover:bg-industrial-900 lg:p-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mustard-400">
                  0{i + 1}
                </span>
                <Parallax speed={0.15}>
                  <h3 className="heading-display text-4xl text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl lg:text-5xl xl:text-6xl">
                    {p.label}
                  </h3>
                </Parallax>
                <p className="max-w-[200px] text-sm leading-relaxed text-industrial-200">
                  {p.desc}
                </p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-mustard-400 transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Animated horizontal line */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="mt-20 h-px w-full origin-left bg-gradient-to-r from-mustard-400 via-white/20 to-transparent"
        />
      </div>
    </section>
  );
}