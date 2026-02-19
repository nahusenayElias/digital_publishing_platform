<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user()) {
            return response()->json(["message" => "Unauthenticated."], 401);
        }

        $user = $request->user();
        
        // Check multiple conditions
        $isAdmin = false;
        
        // Check 1: Database is_admin column
        if (isset($user->is_admin) && $user->is_admin == 1) {
            $isAdmin = true;
        }
        
        // Check 2: Email whitelist
        $adminEmails = ["admin@example.com", "max@email.com"];
        if (in_array($user->email, $adminEmails)) {
            $isAdmin = true;
        }
        
        // Check 3: isAdmin() method
        if (method_exists($user, 'isAdmin') && $user->isAdmin()) {
            $isAdmin = true;
        }
        
        if (!$isAdmin) {
            return response()->json([
                "message" => "Access denied. Admin privileges required.",
                "user_email" => $user->email
            ], 403);
        }
        
        return $next($request);
    }
}