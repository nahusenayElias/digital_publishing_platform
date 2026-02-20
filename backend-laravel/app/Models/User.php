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
        'role', // Add role to fillable
        'is_admin', // Add is_admin to fillable
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean', // Cast is_admin to boolean
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
     * Check if user is admin using both methods
     */
    public function isAdmin(): bool
    {
        // First check the database is_admin column
        if ($this->is_admin) {
            return true;
        }
        
        // Then check the role column
        if ($this->role === 'admin') {
            return true;
        }
        
        // Finally, fallback to email check for backward compatibility
        $adminEmails = ['admin@example.com', 'max@email.com'];
        return in_array($this->email, $adminEmails);
    }

    /**
     * Check if user is author
     */
    public function isAuthor(): bool
    {
        return $this->role === 'author';
    }

    /**
     * Check if user is regular user
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Get user's role display name
     */
    public function getRoleDisplayAttribute(): string
    {
        return ucfirst($this->role ?? 'user');
    }
}