import { apiFetch } from '@/lib/api';

export class ArticleService {
  // articles
  static async getAll() {
    const res = await apiFetch('/api/articles');
    return Array.isArray(res) ? res : res.data ?? [];
  }

  // fetches featured articles
  static async getFeatured() {
    const articles = await this.getAll();

    // If backend supports "featured" flag
    return articles.filter((a: any) => a.featured === true);
  }

  // single article by slug
  static async getBySlug(slug: string) {
    return apiFetch(`/api/articles/${slug}`);
  }
}