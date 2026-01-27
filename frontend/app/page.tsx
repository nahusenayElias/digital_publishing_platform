import { Hero } from '@/components/sections/Hero';
import { FeaturedArticles } from '@/components/sections/FeaturedArticles';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      <Features />
      <CTASection />
    </>
  );
}
