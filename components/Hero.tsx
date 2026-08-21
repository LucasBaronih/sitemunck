'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { company, getWhatsAppLink } from '@/data/company';
import { track } from '@/lib/analytics';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { VideoScroll } from '@/components/animations/VideoScroll';

export function Hero() {
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 700], [0, -120]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 900], [1, 1.15]);

  const [videoError, setVideoError] = useState(false);

  const handleWhatsApp = () => track('whatsapp_click', { location: 'hero' });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-industrial-950"
    >
      {/* Background video / fallback */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 z-0"
      >
        {!videoError ? (
          <VideoScroll
            src="/videos/hero.mp4"
            poster="/images/hero-poster.jpg"
            onError={() => setVideoError(true)}
            fallback={<HeroFallback />}
          />
        ) : (
          <HeroFallback />
        )}
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-industrial-950/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-industrial-950/80 via-transparent to-industrial-950/30" />
      <div className="absolute inset-0 z-10 grid-overlay opacity-60" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-industrial relative z-20 flex flex-col justify-center pt-20"
      >
        {/* Tech label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-mustard-400" />
          <span className="section-label">{company.tagline}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading-display max-w-5xl text-5xl leading-[0.88] sm:text-7xl lg:text-8xl xl:text-[9rem]"
        >
          {company.heroHeadline.split(' ').map((word, i) => (
            <span key={i} className="inline-block">
              {word === 'IMPOSSÍVEL.' ? (
                <span className="text-mustard-400">{word}</span>
              ) : (
                word
              )}
              {i < company.heroHeadline.split(' ').length - 1 && '\u00A0'}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-industrial-100 sm:text-lg"
        >
          {company.heroSubheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <MagneticButton
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.4}
          >
            <span className="group flex items-center gap-3 bg-mustard-400 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.18em] text-industrial-950 transition-all hover:bg-mustard-300">
              Solicitar Orçamento
              <span className="h-4 w-px bg-industrial-950/40 transition-all group-hover:h-6" />
            </span>
          </MagneticButton>
          <a
            href="#servicos"
            className="flex items-center gap-2 px-4 py-4 font-mono text-sm uppercase tracking-[0.18em] text-industrial-100 transition-colors hover:text-white"
          >
            Conhecer Serviços
          </a>
        </motion.div>

        {/* Tech data strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-industrial-300"
        >
          <span>LOC. MUNCK</span>
          <span className="h-1 w-1 bg-mustard-400" />
          <span>MICRO ESCAVADEIRAS</span>
          <span className="h-1 w-1 bg-mustard-400" />
          <span>CARGAS PESADAS</span>
          <span className="h-1 w-1 bg-mustard-400" />
          <span>PIRACICABA / SP</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-industrial-300">
            Scroll
          </span>
          <div className="flex h-10 w-[1px] justify-center bg-white/10">
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-3 w-[1px] bg-mustard-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Side tech indicators */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-industrial-400 [writing-mode:vertical-rl]">
          UltraMunck / 2025
        </span>
        <span className="h-12 w-px bg-white/10" />
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-industrial-900">
      {/* Cinematic gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-industrial-850 via-industrial-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Animated machine silhouette via CSS */}
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute left-1/2 top-1/3 h-[2px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-1/3 h-[40%] w-[2px] -translate-x-1/2 bg-gradient-to-b from-white/10 to-transparent" />

      {/* Volumetric light */}
      <div className="absolute -left-1/4 top-0 h-full w-1/2 bg-mustard-400/5 blur-[120px]" />
      <div className="absolute right-0 top-1/4 h-1/2 w-1/3 bg-white/5 blur-[100px]" />
    </div>
  );
}
