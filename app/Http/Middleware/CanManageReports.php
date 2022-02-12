<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CanManageReports
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

        if (   in_array( 'reports' ,  auth()->user()->permissionsNames())) {
            return $next($request);
        }

        else {
            return response()->json('you cant manage reports');
        }

    }
}
