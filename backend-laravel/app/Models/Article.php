<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'status',
        'user_id',
        'category_id',
    ];

    // Author
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}