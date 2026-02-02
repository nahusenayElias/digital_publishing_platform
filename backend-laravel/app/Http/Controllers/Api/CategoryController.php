<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = [
            ['id' => 1, 'name' => 'Technology', 'slug' => 'technology', 'description' => 'Tech news and tutorials', 'article_count' => 12],
            ['id' => 2, 'name' => 'Business', 'slug' => 'business', 'description' => 'Business insights and trends', 'article_count' => 8],
            ['id' => 3, 'name' => 'Science', 'slug' => 'science', 'description' => 'Scientific discoveries', 'article_count' => 6],
            ['id' => 4, 'name' => 'Web Development', 'slug' => 'web-development', 'description' => 'Frontend and backend development', 'article_count' => 15],
            ['id' => 5, 'name' => 'Design', 'slug' => 'design', 'description' => 'UI/UX and graphic design', 'article_count' => 7],
            ['id' => 6, 'name' => 'Tutorial', 'slug' => 'tutorial', 'description' => 'Step-by-step guides', 'article_count' => 10],
        ];

        return response()->json(['data' => $categories]);
    }

    public function show($slug)
    {
        $category = [
            'id' => 1,
            'name' => 'Technology',
            'slug' => $slug,
            'description' => 'Articles about programming, frameworks, software development, and tech innovations.',
            'article_count' => 12,
            'popular_tags' => [
                ['name' => 'Laravel', 'slug' => 'laravel', 'article_count' => 5],
                ['name' => 'Next.js', 'slug' => 'nextjs', 'article_count' => 4],
                ['name' => 'React', 'slug' => 'react', 'article_count' => 6],
                ['name' => 'API', 'slug' => 'api', 'article_count' => 8],
            ]
        ];

        return response()->json(['data' => $category]);
    }
}
