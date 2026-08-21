'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gauge, Ruler, ArrowUp } from 'lucide-react';
import { fleet } from '@/data/fleet';
import { getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

export function Fleet() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tilt motion values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateXTransform = useTransform(rotateX, [-10, 10], [8, -8]);
  const rotateYTransform = useTransform(rotateY, [-10, 10], [-8, 8]);

  const current = fleet[active];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateY.set(((x / rect.width) - 0.5) * 20);
    rotateX.set(((y / rect.height) - 0.5) * -20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const next = () => {
    track('fleet_interact', { action: 'next' });
    setActive((p) => (p + 1) % fleet.length);
  };
  const prev = () => {
    track('fleet_interact', { action: 'prev' });
    setActive((p) => (p - 1 + fleet.length) % fleet.length);
  };

  return (
    <section id="frota" className="relative overflow-hidden bg-industrial-950 py-24 lg:py-40">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="container-industrial relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="/ Frota"
            title="Equipamentos para cada operação"
            description="Apresentação técnica da frota UltraMunck. Especificações disponíveis conforme consulta."
          />
          <Reveal direction="left" delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-mustard-400">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-12 bg-white/20" />
              <span className="font-mono text-sm text-industrial-400">
                {String(fleet.length).padStart(2, '0')}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Fleet display */}
        <div ref={containerRef} className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image with tilt */}
          <Reveal direction="right">
            <div
              className="relative aspect-[4/3] overflow-hidden bg-industrial-900 industrial-border"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ rotateX: rotateXTransform, rotateY: rotateYTransform, transformStyle: 'preserve-3d' }}
                  className="relative h-full w-full"
                >
                  {/* Real photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-industrial-800 to-industrial-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.image}
                      alt={current.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/60 to-transparent" />
                  {/* Tech overlay corners */}
                  <div className="absolute left-4 top-4 h-4 w-4 border-l border-t border-mustard-400/60" />
                  <div className="absolute right-4 top-4 h-4 w-4 border-r border-t border-mustard-400/60" />
                  <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-mustard-400/60" />
                  <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-mustard-400/60" />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              <button
                onClick={prev}
                aria-label="Equipamento anterior"
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/10 bg-industrial-950/60 text-white backdrop-blur transition-colors hover:border-mustard-400 hover:text-mustard-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Próximo equipamento"
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/10 bg-industrial-950/60 text-white backdrop-blur transition-colors hover:border-mustard-400 hover:text-mustard-400"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8"
              >
                <span className="section-label">{current.category}</span>
                <h3 className="heading-display text-5xl text-white lg:text-6xl">
                  {current.name}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-industrial-200">
                  {current.description}
                </p>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-px bg-white/5">
                  <SpecItem icon={<Gauge className="h-4 w-4" />} label="Capacidade" value={current.specifications.capacity} />
                  <SpecItem icon={<Ruler className="h-4 w-4" />} label="Alcance" value={current.specifications.reach} />
                  <SpecItem icon={<ArrowUp className="h-4 w-4" />} label="Altura" value={current.specifications.height} />
                </div>

                {/* Indicators */}
                <div className="flex items-center gap-2">
                  {fleet.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => setActive(i)}
                      aria-label={`Ver ${f.name}`}
                      className={`h-1 transition-all duration-300 ${
                        i === active ? 'w-12 bg-mustard-400' : 'w-6 bg-white/15 hover:bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={getWhatsAppLink(
                    `Olá, vim pelo site da UltraMunck e gostaria de consultar disponibilidade do equipamento ${current.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('cta_click', { location: 'fleet' })}
                  className="group inline-flex w-fit items-center gap-3 bg-mustard-400 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.18em] text-industrial-950 transition-colors hover:bg-mustard-300"
                >
                  Consultar disponibilidade
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Data note */}
        <Reveal direction="up" delay={0.15} className="mt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-400">
            * Especificações técnicas serão preenchidas conforme dados oficiais. Consulte para detalhes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-3 bg-industrial-900 p-5">
      <div className="flex items-center gap-2 text-mustard-400">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-industrial-300">
          {label}
        </span>
      </div>
      <span className="font-mono text-sm text-white">{value}</span>
    </div>
  );
}
