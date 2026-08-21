import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { company } from '@/data/company';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ultramunck.com.br'),
  title: {
    default: 'UltraMunck | Locação de Muncks e Micro Escavadeiras em Piracicaba',
    template: '%s | UltraMunck',
  },
  description:
    'UltraMunck — locação de muncks e micro escavadeiras em Piracicaba/SP. Especializados em transporte e movimentação de cargas pesadas com atendimento rápido e seguro.',
  keywords: [
    'locação de munck',
    'locação de micro escavadeira',
    'munck Piracicaba',
    'micro escavadeira Piracicaba',
    'transporte de cargas pesadas',
    'movimentação de cargas',
    'UltraMunck',
    'aluguel de munck',
    'aluguel de micro escavadeira',
  ],
  authors: [{ name: 'UltraMunck' }],
  creator: 'UltraMunck',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ultramunck.com.br',
    siteName: 'UltraMunck',
    title: 'UltraMunck | Locação de Muncks e Micro Escavadeiras em Piracicaba',
    description:
      'Especializados em transporte e movimentação de cargas pesadas. Atendimento rápido e seguro para sua obra ou projeto.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UltraMunck — Locação de Muncks e Micro Escavadeiras',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UltraMunck | Locação de Muncks e Micro Escavadeiras em Piracicaba',
    description:
      'Especializados em transporte e movimentação de cargas pesadas. Atendimento rápido e seguro.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ultramunck.com.br',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.bio,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: 'BR',
    },
    telephone: '+5519999214954',
    url: 'https://ultramunck.com.br',
    sameAs: [company.instagram.link],
    openingHours: 'Mo-Fr 08:00-17:00',
    areaServed: 'Piracicaba e região',
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="noise-overlay bg-noise" />
        {children}
      </body>
    </html>
  );
}
