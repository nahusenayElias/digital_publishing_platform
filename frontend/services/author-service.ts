import { apiFetch } from '@/lib/api';

export class AuthorService {
  static async getAll() {
    const res = await apiFetch('/api/authors');
    return Array.isArray(res) ? res : res.data ?? [];
  }

  static async getBySlug(slug: string) {
    return apiFetch(`/api/authors/${slug}`);
  }
}