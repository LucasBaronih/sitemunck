'use client';

import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { company, getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { MagneticButton } from '@/components/animations/MagneticButton';

export function Contact() {
  const handleWhatsApp = () => track('whatsapp_click', { location: 'contact' });

  // Google Maps embed URL 
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.2324077535426!2d-47.632022819357886!3d-22.75475502717357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8a2f30dd8d4307f5%3A0x608d0f0ac60a3145!2sUltraMunck!5e0!3m2!1spt-BR!2sbr!4v1787316021091!5m2!1spt-BR!2sbr";

  return (
    <section id="contato" className="relative bg-industrial-950 py-24 lg:py-40">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="container-industrial relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <Reveal direction="up">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-mustard-400" />
                  <span className="section-label">/ Contato</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.05}>
                <h2 className="heading-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl xl:text-7xl">
                  Precisa movimentar<br />
                  uma <span className="text-mustard-400">carga?</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.15}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-industrial-200 lg:text-lg">
                  Fale agora com a UltraMunck. Orçamento rápido, direto e sem complicação.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.25}>
                <div className="mt-10">
                  <MagneticButton
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.4}
                  >
                    <span className="group flex items-center gap-4 bg-mustard-400 px-10 py-5 font-mono text-base font-medium uppercase tracking-[0.18em] text-industrial-950 transition-colors hover:bg-mustard-300 sm:text-lg">
                      <MessageCircle className="h-6 w-6" />
                      Falar pelo WhatsApp
                    </span>
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            {/* Contact details */}
            <Reveal direction="up" delay={0.3}>
              <div className="mt-12 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
                <InfoItem icon={<MapPin className="h-4 w-4" />} label="Endereço">
                  {company.address.street}
                  <br />
                  {company.address.district}, {company.address.city} - {company.address.state}
                  <br />
                  CEP {company.address.zip}
                </InfoItem>
                <InfoItem icon={<Phone className="h-4 w-4" />} label="WhatsApp">
                  {company.whatsapp.number}
                </InfoItem>
                <InfoItem icon={<Clock className="h-4 w-4" />} label="Horário">
                  {company.hours}
                </InfoItem>
                <InfoItem icon={<MessageCircle className="h-4 w-4" />} label="Instagram">
                  {company.instagram.handle}
                </InfoItem>
              </div>
            </Reveal>
          </div>

          {/* Right: Map */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative h-full min-h-[400px] overflow-hidden industrial-border">
              <iframe
                src={mapSrc}
                title="Mapa — UltraMunck"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale contrast-110"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
              />
              {/* Tech corners */}
              <div className="pointer-events-none absolute right-8 top-3 z-10 flex items-center gap-2 glass px-3 py-2">
                <MapPin className="h-3 w-3 text-mustard-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                  Piracicaba / SP
                </span>
              </div>
              <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-mustard-400/60" />
              <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-mustard-400/60" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-mustard-400/60" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-mustard-400/60" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 bg-industrial-900 p-5">
      <div className="flex items-center gap-2 text-mustard-400">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-industrial-300">
          {label}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-white">{children}</div>
    </div>
  );
}