<?php

namespace App\Http\Middleware;

//use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Closure;
use Illuminate\Support\Facades\Auth;
class Authenticate
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request, Closure $next, $guard = null): ?string
    {
        dump($guard);
        return $request->expectsJson() ? null : route('home');
    }
}
