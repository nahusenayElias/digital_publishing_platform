<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = [
            ['id' => 1, 'name' => 'Laravel', 'slug' => 'laravel', 'color' => '#FF2D20', 'article_count' => 12],
            ['id' => 2, 'name' => 'Next.js', 'slug' => 'nextjs', 'color' => '#000000', 'article_count' => 8],
            ['id' => 3, 'name' => 'React', 'slug' => 'react', 'color' => '#61DAFB', 'article_count' => 15],
            ['id' => 4, 'name' => 'API', 'slug' => 'api', 'color' => '#3B82F6', 'article_count' => 10],
            ['id' => 5, 'name' => 'TypeScript', 'slug' => 'typescript', 'color' => '#3178C6', 'article_count' => 7],
            ['id' => 6, 'name' => 'Tailwind CSS', 'slug' => 'tailwind-css', 'color' => '#06B6D4', 'article_count' => 9],
            ['id' => 7, 'name' => 'Full Stack', 'slug' => 'full-stack', 'color' => '#10B981', 'article_count' => 6],
            ['id' => 8, 'name' => 'Tutorial', 'slug' => 'tutorial', 'color' => '#8B5CF6', 'article_count' => 11],
        ];

        return response()->json(['data' => $tags]);
    }
}
