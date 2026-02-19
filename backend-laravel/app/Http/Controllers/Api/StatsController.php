<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'category_id',
        'user_id',
        'status',
        'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime'
    ];

    /**
     * Get the author of the article
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the category of the article
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Scope for published articles
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope for pending articles
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = \Str::slug($article->title);
            }
        });

        static::updating(function ($article) {
            if ($article->isDirty('title') && empty($article->slug)) {
                $article->slug = \Str::slug($article->title);
            }
        });
    }
}