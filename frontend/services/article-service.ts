import { apiFetch } from '@/lib/api';

export class ArticleService {
  static async getAll() {
    const res = await apiFetch('/api/articles');
    return Array.isArray(res) ? res : res.data ?? [];
  }

  static async getFeatured() {
    const all = await this.getAll();
    return all.filter(article => article.featured);
  }
}