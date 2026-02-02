<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\TagController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'service' => 'Digital Publishing Platform API',
        'version' => '1.0.0',
        'timestamp' => now()->toIso8601String(),
        'endpoints' => [
            'articles' => '/api/articles',
            'categories' => '/api/categories',
            'authors' => '/api/authors',
            'tags' => '/api/tags',
        ]
    ]);
});

// Test endpoint
Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'frontend_url' => env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000'),
        'timestamp' => now()->toDateTimeString(),
    ]);
});

// Public API routes
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{article:slug}', [ArticleController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{author:slug}', [AuthorController::class, 'show']);
Route::get('/tags', [TagController::class, 'index']);

// Protected routes (for future authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
    Route::post('/articles/{article}/publish', [ArticleController::class, 'publish']);
    Route::post('/articles/{article}/unpublish', [ArticleController::class, 'unpublish']);
});
