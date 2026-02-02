import { Hero } from '@/components/sections/Hero';
import { FeaturedArticles } from '@/components/sections/FeaturedArticles';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';
import { CategoryService } from '@/services/category-service';
import { ArticleService } from '@/services/article-service';

export default async function HomePage() {
  // Fetch data from backend
  const categories = await CategoryService.getAll();
  const featuredArticles = await ArticleService.getFeatured();

  return (
    <>
      <Hero />
      <FeaturedArticles articles={featuredArticles} />
      <Features />
      <CTASection />

      <section className="max-w-7xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}