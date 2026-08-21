'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

export function WhyUltraMunck() {
  const { scrollYProgress } = useScroll();
  const xText = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="relative overflow-hidden bg-industrial-950 py-24 lg:py-40" aria-label="Por que UltraMunck">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      {/* Volumetric light */}
      <div className="absolute right-0 top-1/4 h-1/2 w-1/2 bg-mustard-400/5 blur-[140px]" />

      <div className="container-industrial relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: editorial text */}
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-mustard-400" />
                <span className="section-label">/ Por que UltraMunck</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.05}>
              <h2 className="heading-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl xl:text-7xl">
                Não é só mover<br />
                cargas. É mover<br />
                <span className="text-mustard-400">confiança.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <div className="mt-10 max-w-xl space-y-6 text-base leading-relaxed text-industrial-200 lg:text-lg">
                <p>
                  Cada operação UltraMunck nasce de um princípio simples: o que parece impossível
                  de mover, nós movemos — com técnica, com segurança e com a velocidade que sua obra exige.
                </p>
                <p>
                  Da primeira conversa à entrega da carga, você fala com uma equipe que pensa em
                  engenharia, não em improvisação.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { location: 'why_ultramunck' })}
                className="group mt-10 inline-flex items-center gap-3 bg-mustard-400 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.18em] text-industrial-950 transition-colors hover:bg-mustard-300"
              >
                Solicitar Orçamento
              </a>
            </Reveal>
          </div>

          {/* Right: technical detail panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.15}>
              <div className="relative flex flex-col gap-px bg-white/5">
                <DetailRow label="Posicionamento" value="Locação de Muncks e Micro Escavadeiras" />
                <DetailRow label="Atuação" value="Piracicaba e região" />
                <DetailRow label="Foco" value="Cargas pesadas" />
                <DetailRow label="Atendimento" value="Rápido e direcionado" />
                <DetailRow label="Equipe" value="Técnica e especializada" />
              </div>
            </Reveal>

            {/* Parallax technical number */}
            <Parallax speed={0.2} className="mt-8">
              <motion.div style={{ x: xText }} className="overflow-hidden">
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-400">
                  / UltraMunck — Movimentação de cargas pesadas
                </span>
              </motion.div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-industrial-900 p-5 transition-colors hover:bg-industrial-850">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-industrial-400">
        {label}
      </span>
      <span className="text-right text-sm text-white">{value}</span>
    </div>
  );
}
