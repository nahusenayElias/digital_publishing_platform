<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * PUBLIC: list all tags
     */
    public function index()
    {
        $tags = Tag::withCount('articles')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $tags
        ]);
    }

    /**
     * PUBLIC: view single tag by slug
     */
    public function show($slug)
    {
        $tag = Tag::where('slug', $slug)
            ->with(['articles' => function($query) {
                $query->where('status', 'published')
                      ->with(['author', 'category'])
                      ->latest()
                      ->take(20);
            }])
            ->withCount('articles')
            ->firstOrFail();

        return response()->json([
            'data' => $tag
        ]);
    }
}