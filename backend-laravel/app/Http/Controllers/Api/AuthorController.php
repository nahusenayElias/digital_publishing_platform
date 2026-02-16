<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * PUBLIC: list all authors with their published article count
     */
    public function index()
    {
        $authors = User::withCount(['articles' => function($query) {
                $query->where('status', 'published');
            }])
            ->having('articles_count', '>', 0)
            ->get()
            ->map(function($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->name,
                    'email' => $author->email,
                    'articles_count' => $author->articles_count,
                    'joined_at' => $author->created_at->format('Y-m-d')
                ];
            });

        return response()->json([
            'data' => $authors
        ]);
    }

    /**
     * PUBLIC: view single author with their published articles
     */
    public function show($id)
    {
        $author = User::with(['articles' => function($query) {
                $query->where('status', 'published')
                      ->with('category')
                      ->latest();
            }])
            ->findOrFail($id);

        return response()->json([
            'data' => [
                'id' => $author->id,
                'name' => $author->name,
                'email' => $author->email,
                'joined_at' => $author->created_at->format('Y-m-d'),
                'articles' => $author->articles,
                'total_articles' => $author->articles->count()
            ]
        ]);
    }
}