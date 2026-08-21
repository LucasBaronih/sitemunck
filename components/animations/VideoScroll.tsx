'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoScrollProps {
  src: string;
  poster?: string;
  className?: string;
  fallback?: React.ReactNode;
  onError?: () => void;
}

/**
 * Scroll-controlled video (Apple/Tesla style scrubbing).
 * Uses GSAP ScrollTrigger to map scroll progress to video currentTime.
 * Falls back gracefully if video is missing or cannot load.
 * Respects prefers-reduced-motion (shows poster / first frame only).
 */
export function VideoScroll({ src, poster, className, fallback, onError }: VideoScrollProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Just show poster / first frame, no scrubbing
      video.currentTime = 0;
      return;
    }

    let rafId = 0;
    let scrollTrigger: any = null;

    const setup = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // Wait for metadata
        await new Promise<void>((resolve, reject) => {
          if (video.readyState >= 1) return resolve();
          video.addEventListener('loadedmetadata', () => resolve(), { once: true });
          video.addEventListener('error', () => reject(new Error('video error')), { once: true });
        });

        const duration = video.duration;
        if (!isFinite(duration) || duration <= 0) {
          setSupported(false);
          return;
        }

        scrollTrigger = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self: any) => {
            const progress = self.progress;
            video.currentTime = duration * progress;
          },
        });

        setLoaded(true);
      } catch {
        setSupported(false);
        onError?.();
      }
    };

    setup();

    return () => {
      cancelAnimationFrame(rafId);
      scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative h-full w-full', className)}>
      {supported ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-hidden="true"
          onError={() => {
            setSupported(false);
            onError?.();
          }}
        />
      ) : (
        <div className="h-full w-full">
          {fallback ?? (
            <div className="flex h-full w-full items-center justify-center bg-industrial-900">
              {poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
