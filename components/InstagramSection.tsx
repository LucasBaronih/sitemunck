'use client';

import { useEffect } from 'react';
import { Instagram as InstagramIcon, ArrowUpRight } from 'lucide-react';
import { company } from '@/data/company';
import { track } from '@/lib/analytics';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

export function InstagramSection() {
  const handleClick = () => track('instagram_click', { location: 'section' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative bg-industrial-900 py-24 lg:py-40" aria-label="Instagram">
      <div className="container-industrial">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: text */}
          <div>
            <SectionHeading
              label="/ Instagram"
              title="Acompanhe a UltraMunck"
              description="Acompanhe nossas operações, equipamentos em ação e bastidores do dia a dia movendo cargas pesadas."
            />

            <Reveal direction="up" delay={0.2}>
              <a
                href={company.instagram.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="group mt-10 inline-flex items-center gap-3 bg-mustard-400 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.18em] text-industrial-950 transition-colors hover:bg-mustard-300"
              >
                <InstagramIcon className="h-5 w-5" />
                Siga {company.instagram.handle}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          {/* Right: Instagram Widget com tarja maior */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative w-full overflow-hidden bg-industrial-850 p-4 min-h-[420px] border border-white/5 flex flex-col items-center">
              
              {/* Widget do Elfsight */}
              <div className="w-full">
                <div className="elfsight-app-ed71148c-1ff8-40e2-8c72-ebe6adff2687" data-elfsight-app-lazy></div>
              </div>

              {/* Tarja preta um pouco mais alta para cobrir 100% */}
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-industrial-850 pointer-events-none z-20" />

              {/* Cantoneiras industriais */}
              <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-mustard-400/40 pointer-events-none z-30" />
              <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-mustard-400/40 pointer-events-none z-30" />
              <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-mustard-400/40 pointer-events-none z-30" />
              <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-mustard-400/40 pointer-events-none z-30" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}