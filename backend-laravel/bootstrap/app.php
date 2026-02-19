<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Add HandleCors to API middleware group (covers all your /api/* routes)
        $middleware->appendToGroup('api', \Illuminate\Http\Middleware\HandleCors::class);
        // ✅ REGISTER admin middleware alias (THIS WAS MISSING)
$middleware->alias([
    'admin' => \App\Http\Middleware\AdminMiddleware::class,
    ]);
        
        // OR prepend globally (runs CORS first on ALL requests)
        // $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);
    })
    
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
