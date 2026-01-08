import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import PopularPlaces from '@/components/home/PopularPlaces';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PopularPlaces />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
