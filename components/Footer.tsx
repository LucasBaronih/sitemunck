'use client';

import { Instagram } from 'lucide-react';
import { company, navLinks, getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-industrial-950 py-16">
      <div className="container-industrial">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl font-bold uppercase text-white">
              Ultra<span className="text-mustard-400">Munck</span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-industrial-300">
              {company.bio}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <span className="section-label">/ Navegação</span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.18em] text-industrial-200 transition-colors hover:text-mustard-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="section-label">/ Contato</span>
            <p className="text-sm leading-relaxed text-industrial-200">
              {company.address.full}
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'footer' })}
              className="font-mono text-sm text-white transition-colors hover:text-mustard-400"
            >
              {company.whatsapp.number}
            </a>
            <a
              href={company.instagram.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('instagram_click', { location: 'footer' })}
              className="flex items-center gap-2 font-mono text-sm text-white transition-colors hover:text-mustard-400"
            >
              <Instagram className="h-4 w-4" />
              {company.instagram.handle}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-400">
            © {year} UltraMunck. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-500">
            Locação de Muncks e Micro Escavadeiras — Piracicaba / SP
          </p>
        </div>
      </div>
    </footer>
  );
}
