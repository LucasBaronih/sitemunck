'use client';

import { Zap, ShieldCheck, Anchor, HardHat } from 'lucide-react';
import { differentials } from '@/data/differentials';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  ShieldCheck,
  Anchor,
  HardHat,
};

export function Differentials() {
  return (
    <section id="diferenciais" className="relative bg-industrial-900 py-24 lg:py-40">
      <div className="container-industrial">
        <SectionHeading
          label="/ Diferenciais"
          title="Quatro pilares. Uma operação."
          description="Cada diferencial UltraMunck existe para garantir que sua carga chegue onde precisa, com segurança e no tempo certo."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {differentials.map((d) => {
            const Icon = iconMap[d.icon] ?? Zap;
            return (
              <StaggerItem key={d.id}>
                <div className="group relative flex h-full flex-col gap-6 bg-industrial-900 p-8 transition-colors duration-500 hover:bg-industrial-850 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-mustard-400">{d.index}</span>
                    <div className="flex h-12 w-12 items-center justify-center border border-white/10 transition-colors duration-500 group-hover:border-mustard-400">
                      <Icon className="h-6 w-6 text-industrial-100 transition-colors duration-500 group-hover:text-mustard-400" />
                    </div>
                  </div>
                  <h3 className="heading-display text-xl text-white">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-industrial-200">{d.description}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-mustard-400 transition-all duration-700 group-hover:w-full" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
