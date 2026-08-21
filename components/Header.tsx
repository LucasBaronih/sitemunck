'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
import { navLinks, company, getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/animations/MagneticButton';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleWhatsApp = () => track('whatsapp_click', { location: 'header' });
  const handleInstagram = () => track('instagram_click', { location: 'header' });

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-all duration-500',
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'border-b border-transparent py-5',
        )}
      >
        <div className="container-industrial flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className="group flex items-center gap-2"
            aria-label="UltraMunck — Início"
          >
            <span className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
              Ultra<span className="text-mustard-400">Munck</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300',
                    isActive ? 'text-white' : 'text-industrial-200 hover:text-white',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-mustard-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={company.instagram.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram UltraMunck"
              onClick={handleInstagram}
              className="text-industrial-200 transition-colors hover:text-mustard-400"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <MagneticButton href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <span className="group flex items-center gap-2 bg-mustard-400 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-industrial-950 transition-colors hover:bg-mustard-300">
                Solicitar Orçamento
              </span>
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 p-2 text-white lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col bg-industrial-950 lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-xl font-bold uppercase text-white">
                Ultra<span className="text-mustard-400">Munck</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="p-2 text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-2 px-5"
              aria-label="Navegação mobile"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.4 }}
                  className="flex items-baseline gap-4 border-b border-white/5 py-4"
                >
                  <span className="font-mono text-xs text-mustard-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-semibold uppercase text-white">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 px-5 pb-10">
              <a
                href={company.instagram.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleInstagram}
                className="flex items-center justify-center gap-2 border border-white/10 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white"
              >
                <Instagram className="h-4 w-4" />
                {company.instagram.handle}
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="flex items-center justify-center bg-mustard-400 py-4 font-mono text-sm font-medium uppercase tracking-[0.18em] text-industrial-950"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
