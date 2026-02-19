<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * PUBLIC: list all categories
     */
    public function index()
    {
        $categories = Category::withCount('articles')
            ->get();

        return response()->json([
            'data' => $categories
        ]);
    }

    /**
     * PUBLIC: view single category by slug
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->with(['articles' => function($query) {
                $query->where('status', 'published')
                      ->with('author')
                      ->latest()
                      ->take(10);
            }])
            ->withCount('articles')
            ->firstOrFail();

        return response()->json([
            'data' => $category
        ]);
    }
}