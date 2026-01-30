<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = [
            [
                'id' => 1,
                'name' => 'John Doe',
                'slug' => 'john-doe',
                'bio' => 'Senior backend developer with 8+ years of experience in Laravel and API development.',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                'article_count' => 12,
                'expertise' => ['Laravel', 'API Development', 'PostgreSQL']
            ],
            [
                'id' => 2,
                'name' => 'Jane Smith',
                'slug' => 'jane-smith',
                'bio' => 'Frontend engineer specializing in React and Next.js with a focus on performance optimization.',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
                'article_count' => 8,
                'expertise' => ['React', 'Next.js', 'TypeScript']
            ],
            [
                'id' => 3,
                'name' => 'Alex Johnson',
                'slug' => 'alex-johnson',
                'bio' => 'Full-stack developer passionate about teaching and creating comprehensive tutorials.',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                'article_count' => 15,
                'expertise' => ['Full Stack', 'Tutorials', 'DevOps']
            ],
        ];

        return response()->json(['data' => $authors]);
    }

    public function show($slug)
    {
        $author = [
            'id' => 1,
            'name' => 'John Doe',
            'slug' => $slug,
            'bio' => 'Senior backend developer with 8+ years of experience in Laravel and API development. Passionate about clean code and scalable architecture.',
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            'article_count' => 12,
            'total_views' => 12500,
            'join_date' => '2022-03-15',
            'expertise' => ['Laravel', 'API Development', 'PostgreSQL', 'Redis', 'Docker'],
            'social_links' => [
                'twitter' => 'https://twitter.com/johndoe',
                'github' => 'https://github.com/johndoe',
                'linkedin' => 'https://linkedin.com/in/johndoe',
            ]
        ];

        return response()->json(['data' => $author]);
    }
}
