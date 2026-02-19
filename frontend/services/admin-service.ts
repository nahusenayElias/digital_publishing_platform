import { apiFetch } from './api';

export const AdminService = {
  // Fetch all articles for admin dashboard
  getArticles() {
    return apiFetch('/api/admin/articles');
  },

  // Publish an article
  publishArticle(id: number) {
    return apiFetch(`/api/admin/articles/${id}/publish`, {
      method: 'PATCH',
    });
  },

  // Reject an article
  rejectArticle(id: number) {
    return apiFetch(`/api/admin/articles/${id}/reject`, {
      method: 'PATCH',
    });
  },
};