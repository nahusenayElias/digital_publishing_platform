<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\AuthController; 
use Illuminate\Support\Facades\Route;

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

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);

// Public
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{article}', [ArticleController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{author:slug}', [AuthorController::class, 'show']);
Route::get('/tags', [TagController::class, 'index']);

// Authenticated authors
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::get("/user/articles", [ArticleController::class, "userArticles"]);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
});

// Admin-only routes
Route::middleware(['auth:sanctum', 'admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/articles', [ArticleController::class, 'adminIndex']);
        Route::patch('/articles/{article}/publish', [ArticleController::class, 'adminPublish']);
        Route::patch('/articles/{article}/reject', [ArticleController::class, 'adminReject']);
    });