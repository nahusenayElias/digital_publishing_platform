'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  role?: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  status: 'pending' | 'published' | 'rejected' | 'draft';
  created_at: string;
  category: {
    id: number;
    name: string;
  };
}

function MyArticlesContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

  useEffect(() => {
    // Get user info
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
    
    fetchMyArticles();
  }, []);

  const fetchMyArticles = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`${API_URL}/api/user/articles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login?redirect=/my-articles');
          return;
        }
        throw new Error('Failed to fetch articles');
      }

      const data = await res.json();
      setArticles(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'published': return '✅';
      case 'pending': return '⏳';
      case 'rejected': return '❌';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
        <p className="text-gray-500">Loading your articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
          <button 
            onClick={fetchMyArticles}
            className="mt-4 text-sm text-red-600 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header with Welcome Message and Logout */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-semibold">{user?.name || 'Author'}</span>! 👋
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Admin Panel button (only for admins) */}
          {(user?.is_admin || user?.role === 'admin') && (
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Admin Panel
            </button>
          )}
          
          {/* Dashboard button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Dashboard
          </button>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Write New Article Button (separate from header) */}
      <div className="mb-8">
        <Link
          href="/articles/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <span>+</span> Write New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed">
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles yet</h3>
          <p className="text-gray-500 mb-6">Start writing your first article and submit it for review.</p>
          <Link
            href="/articles/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write Your First Article
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <div 
              key={article.id} 
              className="border rounded-lg p-6 hover:shadow-lg transition bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">
                      {article.category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">
                      {new Date(article.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(article.status)}`}>
                  {getStatusIcon(article.status)} {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">
                {article.content}
              </p>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex gap-3">
                  <Link
                    href={`/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Article →
                  </Link>
                  {article.status === 'rejected' && (
                    <Link
                      href={`/articles/${article.id}/edit`}
                      className="text-yellow-600 hover:text-yellow-800 font-medium text-sm"
                    >
                      Edit & Resubmit
                    </Link>
                  )}
                  {article.status === 'draft' && (
                    <Link
                      href={`/articles/${article.id}/edit`}
                      className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                    >
                      Continue Editing
                    </Link>
                  )}
                </div>
                
                {article.status === 'pending' && (
                  <span className="text-xs text-gray-400">
                    Waiting for admin review
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyArticlesPage() {
  return (
    <AuthGuard>
      <MyArticlesContent />
    </AuthGuard>
  );
}