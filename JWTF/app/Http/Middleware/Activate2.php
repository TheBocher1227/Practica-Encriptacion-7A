<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class Activate2
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
        $user = User::where('email', $request->input('email'))->first();

        if ($user && $user->is_active) {
            return $next($request);
        }
        if($user && !$user->is_active){
        return response()->json(['error' => 'Cuenta no activa'], 401);
        }
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }
}
