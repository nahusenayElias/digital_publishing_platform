import { apiFetch } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
}

export const AuthService = {
  async login(email: string, password: string) {
    const response = await apiFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    
    return response;
  },

  async logout() {
    try {
      await apiFetch('/api/logout', {
        method: 'POST',
      });
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.is_admin || false;
  },
};