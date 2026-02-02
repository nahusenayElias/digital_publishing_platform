<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        // Return mock data for now
        $articles = [
            [
                'id' => 1,
                'title' => 'Getting Started with Laravel API Development',
                'slug' => 'getting-started-with-laravel-api',
                'excerpt' => 'Learn how to build robust APIs with Laravel for your Next.js applications.',
                'content' => 'Laravel provides an excellent foundation for building API-driven applications...',
                'author' => ['name' => 'John Doe', 'slug' => 'john-doe'],
                'category' => ['name' => 'Technology', 'slug' => 'technology'],
                'published_at' => now()->subDays(1)->toIso8601String(),
                'reading_time' => 5,
                'views' => 124,
                'featured_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
                'tags' => [
                    ['name' => 'Laravel', 'slug' => 'laravel', 'color' => '#FF2D20'],
                    ['name' => 'API', 'slug' => 'api', 'color' => '#3B82F6'],
                ]
            ],
            [
                'id' => 2,
                'title' => 'Modern Frontend Development with Next.js 15',
                'slug' => 'modern-frontend-with-nextjs-15',
                'excerpt' => 'Explore the latest features in Next.js 15 for building fast web applications.',
                'content' => 'Next.js 15 introduces several exciting features that improve developer experience...',
                'author' => ['name' => 'Jane Smith', 'slug' => 'jane-smith'],
                'category' => ['name' => 'Web Development', 'slug' => 'web-development'],
                'published_at' => now()->subDays(3)->toIso8601String(),
                'reading_time' => 8,
                'views' => 89,
                'featured_image' => 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop',
                'tags' => [
                    ['name' => 'Next.js', 'slug' => 'nextjs', 'color' => '#000000'],
                    ['name' => 'React', 'slug' => 'react', 'color' => '#61DAFB'],
                ]
            ],
            [
                'id' => 3,
                'title' => 'Building a Digital Publishing Platform',
                'slug' => 'building-digital-publishing-platform',
                'excerpt' => 'A complete guide to building a modern publishing platform with Laravel and Next.js.',
                'content' => 'In this tutorial, we will build a complete digital publishing platform...',
                'author' => ['name' => 'Alex Johnson', 'slug' => 'alex-johnson'],
                'category' => ['name' => 'Tutorial', 'slug' => 'tutorial'],
                'published_at' => now()->subDays(5)->toIso8601String(),
                'reading_time' => 12,
                'views' => 256,
                'featured_image' => 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop',
                'tags' => [
                    ['name' => 'Laravel', 'slug' => 'laravel', 'color' => '#FF2D20'],
                    ['name' => 'Next.js', 'slug' => 'nextjs', 'color' => '#000000'],
                    ['name' => 'Full Stack', 'slug' => 'full-stack', 'color' => '#10B981'],
                ]
            ],
        ];

        return response()->json([
            'data' => $articles,
            'meta' => [
                'total' => count($articles),
                'per_page' => 10,
                'current_page' => 1,
                'last_page' => 1,
            ]
        ]);
    }

    public function show($slug)
    {
        // Return a single article
        $article = [
            'id' => 1,
            'title' => 'Getting Started with Laravel API Development',
            'slug' => $slug,
            'excerpt' => 'Learn how to build robust APIs with Laravel for your Next.js applications.',
            'content' => '<h1>Building APIs with Laravel</h1><p>Laravel provides an excellent foundation for building API-driven applications. With built-in features like Eloquent ORM, middleware, and resource controllers, you can quickly create powerful APIs.</p><p>In this article, we\'ll explore:</p><ul><li>Setting up Laravel for API development</li><li>Creating RESTful endpoints</li><li>Implementing authentication with Sanctum</li><li>Handling CORS for frontend applications</li><li>Testing your API with Postman</li></ul>',
            'author' => [
                'name' => 'John Doe',
                'slug' => 'john-doe',
                'bio' => 'Senior backend developer with 8+ years of experience in Laravel and API development.',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
            ],
            'category' => [
                'name' => 'Technology',
                'slug' => 'technology',
                'description' => 'Articles about programming, frameworks, and software development'
            ],
            'published_at' => now()->subDays(1)->toIso8601String(),
            'reading_time' => 5,
            'views' => 125,
            'featured_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
            'tags' => [
                ['name' => 'Laravel', 'slug' => 'laravel', 'color' => '#FF2D20'],
                ['name' => 'API', 'slug' => 'api', 'color' => '#3B82F6'],
                ['name' => 'Backend', 'slug' => 'backend', 'color' => '#8B5CF6'],
            ]
        ];

        return response()->json(['data' => $article]);
    }

    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Article created successfully (demo)',
            'data' => $request->all(),
        ], 201);
    }

    public function update(Request $request, Article $article)
    {
        return response()->json([
            'message' => 'Article updated successfully (demo)',
            'data' => $request->all(),
        ]);
    }

    public function destroy(Article $article)
    {
        return response()->json([
            'message' => 'Article deleted successfully (demo)',
            'article_id' => $article->id,
        ]);
    }

    public function publish(Article $article)
    {
        return response()->json([
            'message' => 'Article published successfully (demo)',
            'article_id' => $article->id,
        ]);
    }

    public function unpublish(Article $article)
    {
        return response()->json([
            'message' => 'Article unpublished successfully (demo)',
            'article_id' => $article->id,
        ]);
    }
}
