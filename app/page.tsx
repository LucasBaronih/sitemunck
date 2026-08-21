'use client';

import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CustomCursor } from '@/components/CustomCursor';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Impact } from '@/components/Impact';
import { Services } from '@/components/Services';
import { Fleet } from '@/components/Fleet';
import { Differentials } from '@/components/Differentials';
import { WhyUltraMunck } from '@/components/WhyUltraMunck';
import { Testimonials } from '@/components/Testimonials';
import { InstagramSection } from '@/components/InstagramSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Impact />
        <Services />
        <Fleet />
        <Differentials />
        <WhyUltraMunck />
        <Testimonials />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScrollProvider>
  );
}
