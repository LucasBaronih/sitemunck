'use client';

import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal direction="up">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-mustard-400" />
          <span className="section-label">{label}</span>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.05}>
        <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal direction="up" delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-industrial-200 sm:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
