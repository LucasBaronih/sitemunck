'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => track('whatsapp_click', { location: 'floating' });

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Falar no WhatsApp"
      className={`group fixed bottom-5 right-5 z-[150] flex h-14 w-14 items-center justify-center bg-mustard-400 text-industrial-950 shadow-lg shadow-mustard-400/20 transition-all duration-500 hover:bg-mustard-300 sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'
      }`}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 animate-pulse-ring rounded-none border border-mustard-400" />
      <MessageCircle className="relative h-6 w-6" />

      {/* Tooltip (desktop) */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-industrial-900 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Falar no WhatsApp
      </span>
    </a>
  );
}
