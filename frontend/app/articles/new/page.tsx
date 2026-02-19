'use client';

import { useState, useEffect } from 'react';
import { ArticleService } from '@/services/article-service';
import { CategoryService } from '@/services/category-service';
import AuthGuard from '@/components/AuthGuard';
import { useRouter } from 'next/navigation';

type Category = {
  id: number;
  name: string;
};

function NewArticleContent() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.getAll();
      
      if (Array.isArray(res)) {
        setCategories(res);
      } else {
        console.error('Unexpected categories response:', res);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setFetchError('Failed to load categories');
      setCategories([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!content.trim()) {
      alert('Please enter content');
      return;
    }
    
    if (!categoryId) {
      alert('Please select a category');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await ArticleService.create({
        title: title.trim(),
        content: content.trim(),
        category_id: categoryId,
        status: 'pending',
      });
      
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setContent('');
      setCategoryId(undefined);

      // Redirect to my articles after 2 seconds
      setTimeout(() => {
        router.push('/my-articles');
      }, 2000);

    } catch (err) {
      console.error('Failed to submit article:', err);
      alert(err instanceof Error ? err.message : 'Failed to submit article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header with back button */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Write New Article</h1>
        <p className="text-gray-600 mt-2">
          Share your knowledge with the community. Articles will be reviewed by admins before publishing.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">Article submitted successfully!</p>
              <p className="text-sm">Redirecting to your articles...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {fetchError && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{fetchError}</span>
          </div>
          <button 
            onClick={fetchCategories}
            className="mt-2 text-sm text-yellow-700 underline"
          >
            Retry loading categories
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter a catchy title for your article"
            disabled={loading || success}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {title.length}/255 characters
          </p>
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={categoryId || ''}
            onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            disabled={loading || categories.length === 0 || success}
            required
          >
            <option value="">
              {categories.length === 0 ? 'No categories available' : 'Select a category'}
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {categories.length === 0 && !fetchError && (
            <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
          )}
        </div>

        {/* Content Field */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-mono"
            placeholder="Write your article content here... (Markdown supported)"
            disabled={loading || success}
            required
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Supports Markdown formatting</span>
            <span>{content.length} characters</span>
          </div>
        </div>

        {/* Preview Section */}
        {(title || content) && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Preview
            </h2>
            {title && (
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            )}
            {content && (
              <div className="prose max-w-none">
                {content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            disabled={loading || categories.length === 0 || success}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Submit for Review
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setContent('');
              setCategoryId(undefined);
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
            disabled={loading || success}
          >
            Clear Form
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-medium text-blue-800">About the review process</h4>
              <p className="text-sm text-blue-700 mt-1">
                After submission, your article will be reviewed by our admin team. 
                You can track the status in your <a href="/my-articles" className="underline">My Articles</a> page.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function NewArticlePage() {
  return (
    <AuthGuard>
      <NewArticleContent />
    </AuthGuard>
  );
}