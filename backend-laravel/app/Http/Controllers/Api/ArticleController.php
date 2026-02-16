<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * PUBLIC: list published articles
     */
    public function index()
    {
        $articles = Article::with('author', 'category')
            ->where('status', 'published')
            ->latest()
            ->get();

        return response()->json([
            'data' => $articles,
        ]);
    }

    /**
     * PUBLIC: view single published article
     */
    public function show(Article $article)
    {
        abort_unless($article->status === 'published', 404);

        return response()->json([
            'data' => $article->load('author', 'category'),
        ]);
    }

    /**
     * AUTHOR: create article (draft or pending)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'content'     => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'status'      => 'in:draft,pending',
        ]);

        $article = Article::create([
            'title'       => $validated['title'],
            'slug'        => Str::slug($validated['title']),
            'content'     => $validated['content'],
            'category_id' => $validated['category_id'] ?? null,
            'status'      => $validated['status'] ?? 'draft',
            'user_id'     => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Article created',
            'data'    => $article,
        ], 201);
    }

    /**
     * AUTHOR: update own article
     */
    public function update(Request $request, Article $article)
    {
        abort_unless($article->user_id === $request->user()->id, 403);

        $article->update(
            $request->only('title', 'content', 'category_id', 'status')
        );

        return response()->json([
            'message' => 'Article updated',
            'data'    => $article,
        ]);
    }

    /**
     * AUTHOR: delete own article
     */
    public function destroy(Request $request, Article $article)
    {
        abort_unless($article->user_id === $request->user()->id, 403);

        $article->delete();

        return response()->json([
            'message' => 'Article deleted',
        ]);
    }

    /**
     * AUTHOR: get authenticated user's articles
     */
    public function userArticles(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthenticated'
                ], 401);
            }

            $articles = Article::with('category')
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'data' => $articles
            ]);

        } catch (\Exception $e) {
            \Log::error('Error in userArticles: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to fetch articles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: list ALL articles
     */
    public function adminIndex()
    {
        $articles = Article::with('author', 'category')
            ->latest()
            ->get();

        return response()->json([
            'data' => $articles,
        ]);
    }

    /**
     * ADMIN: publish article
     */
    public function adminPublish(Article $article)
    {
        $article->update([
            'status' => 'published',
        ]);

        return response()->json([
            'message' => 'Article published',
            'data' => $article,
        ]);
    }

    /**
     * ADMIN: reject article
     */
    public function adminReject(Article $article)
    {
        $article->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'message' => 'Article rejected',
            'data' => $article,
        ]);
    }
}