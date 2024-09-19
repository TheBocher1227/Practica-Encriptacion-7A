<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
 use Symfony\Component\HttpFoundation\Response;


class VerifyTwoFactorTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->codigoVerificado) {
            return $next($request);
        }

        abort(403, 'Unauthorized');
    }
}
