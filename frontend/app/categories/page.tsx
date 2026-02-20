import { CategoryService } from '@/services/category-service';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await CategoryService.getAll();

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">Categories</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-gray-600 mb-4">{category.description}</p>
              )}
              <div className="flex items-center text-sm text-blue-600">
                <span>View Articles</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}