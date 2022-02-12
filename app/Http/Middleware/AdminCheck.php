<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;


class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        if ( Auth::check() && !auth()->user()->role === 'super_admin'){
            return response()->json('you are not super admin');
        }
        return $next($request);

    }
}
