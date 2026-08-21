'use client';

import { motion } from 'framer-motion';
import { Truck, Pickaxe, Package, Factory, ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  Shovel: Pickaxe,
  Package,
  Factory,
};

export function Services() {
  const handleCta = () => track('cta_click', { location: 'services' });

  return (
    <section id="servicos" className="relative bg-industrial-900 py-24 lg:py-40">
      <div className="container-industrial">
        <SectionHeading
          label="/ Serviços"
          title="Operações que movem sua obra"
          description="Da locação de muncks ao transporte de cargas pesadas — soluções técnicas para projetos que não podem parar."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px bg-white/5 md:grid-cols-2" stagger={0.08}>
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Truck;
            return (
              <StaggerItem key={service.id}>
                <a
                  href={getWhatsAppLink(
                    `Olá, vim pelo site da UltraMunck e gostaria de saber mais sobre ${service.title.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCta}
                  className="group relative flex flex-col gap-6 bg-industrial-900 p-8 transition-colors duration-500 hover:bg-industrial-850 lg:p-12"
                  aria-label={`${service.title} — Solicitar orçamento`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-mustard-400">{service.index}</span>
                    <ArrowUpRight className="h-5 w-5 text-industrial-400 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-mustard-400" />
                  </div>

                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center border border-white/10 transition-colors duration-500 group-hover:border-mustard-400">
                    <Icon className="h-7 w-7 text-industrial-100 transition-colors duration-500 group-hover:text-mustard-400" />
                  </div>

                  {/* Title */}
                  <h3 className="heading-display text-2xl text-white sm:text-3xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-md text-sm leading-relaxed text-industrial-200">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-industrial-300"
                      >
                        <span className="h-1 w-1 bg-mustard-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Hover line */}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-mustard-400 transition-all duration-700 group-hover:w-full" />
                </a>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* CTA */}
        <Reveal direction="up" delay={0.2} className="mt-12">
          <a
            href={getWhatsAppLink('Olá, vim pelo site da UltraMunck e gostaria de falar com um especialista.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('cta_click', { location: 'services_bottom' })}
            className="group inline-flex items-center gap-3 border border-white/15 px-8 py-4 font-mono text-sm uppercase tracking-[0.18em] text-white transition-colors hover:border-mustard-400 hover:text-mustard-400"
          >
            Falar com um especialista
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
