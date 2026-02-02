// app/categories/page.tsx
import { CategoryService } from '@/services/category-service';

export default async function CategoriesPage() {
  const categories = await CategoryService.getAll();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}