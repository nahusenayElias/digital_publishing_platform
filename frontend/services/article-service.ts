import { apiFetch } from './api';

export const ArticleService = {
  /* =======================
     PUBLIC (READ-ONLY)
  ======================= */

  async getFeatured() {
    const res = await apiFetch('/api/articles?status=published&featured=1');
    return Array.isArray(res) ? res : res.data || [];
  },

  async published() {
    const res = await apiFetch('/api/articles?status=published');
    return Array.isArray(res) ? res : res.data || [];
  },

  async getById(id: number) {
    const res = await apiFetch(`/api/articles/${id}`);
    return res.data || res;
  },

  /* =======================
     AUTHOR (AUTHENTICATED)
  ======================= */

  async myArticles() {
    const res = await apiFetch('/api/articles/me');
    return Array.isArray(res) ? res : res.data || [];
  },

  async create(data: {
    title: string;
    content: string;
    category_id: number;
    status: 'draft' | 'pending';
  }) {
    return apiFetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: {
    title?: string;
    content?: string;
    category_id?: number;
    status?: 'draft' | 'pending';
  }) {
    return apiFetch(`/api/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return apiFetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });
  },

  /* =======================
     ADMIN (MODERATION)
  ======================= */

  async adminAll() {
    const res = await apiFetch('/api/admin/articles');
    return Array.isArray(res) ? res : res.data || [];
  },

  // Add this method if you want a dedicated pending endpoint
  async pending() {
    const res = await apiFetch('/api/articles?status=pending');
    return Array.isArray(res) ? res : res.data || [];
  },

  async publish(id: number) {
    return apiFetch(`/api/admin/articles/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async reject(id: number) {
    return apiFetch(`/api/admin/articles/${id}/reject`, {
      method: 'PATCH',
    });
  },
};