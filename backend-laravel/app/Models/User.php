<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the articles authored by the user
     */
    public function articles()
    {
        return $this->hasMany(Article::class, 'user_id');
    }

    /**
     * Get published articles
     */
    public function publishedArticles()
    {
        return $this->articles()->where('status', 'published');
    }

    /**
     * Check if user is admin
     * You can modify this logic based on your needs
     */
    public function isAdmin(): bool
    {
        // Method 1: Check by email (simple)
        $adminEmails = ['admin@example.com', 'max@email.com', 'superadmin@example.com',  'max@email.com'];
        
        // Method 2: If you have a role column in users table
        // return $this->role === 'admin';
        
        // Method 3: Check if user has admin flag
        // return $this->is_admin === true;
        
        return in_array($this->email, $adminEmails);
    }
}