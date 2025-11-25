<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CustomerAuthController extends Controller
{
    /**
     * Show login form
     */
    public function index(Request $request)
    {
        // Optional: Get business from query parameter or subdomain
        $businessId = $request->query('token');
        $business = $businessId ? Business::where('qr_token', $businessId)->firstOrFail() : null;

        return Inertia::render('Customer/Auth/Login', [
            'business' => $business,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle login with rate limiting
     */
    public function login(Request $request)
    {
        $this->checkTooManyFailedAttempts($request);

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('customer')->attempt(
            $credentials, 
            $request->boolean('remember')
        )) {
            $request->session()->regenerate();
            RateLimiter::clear($this->throttleKey($request));
            
            return redirect()->intended(route('customer.dashboard'));
        }

        RateLimiter::hit($this->throttleKey($request));

        throw ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }

    /**
     * Show registration form
     */
    public function showRegister(Request $request)
    {

        // Optional: Pre-select business from query parameter
        $businessId = $request->query('business');
        $selectedBusiness = Business::where('qr_token', $businessId)->firstOrFail();

        return Inertia::render('Customer/Auth/Register', [
            'selectedBusiness' => $selectedBusiness,
        ]);
    }

    /**
     * Handle registration
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'username' => 'required|string|max:255|unique:customers,username',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $customer = Customer::create([
            'business_id' => $validated['business_id'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::guard('customer')->login($customer);

        return redirect()->route('customer.dashboard');
    }

    /**
     * Handle logout
     */
    public function logout(Request $request)
    {
        Auth::guard('customer')->logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('customer.login');
    }

    /**
     * Get the rate limiting throttle key
     */
    protected function throttleKey(Request $request): string
    {
        return strtolower($request->input('email')) . '|' . $request->ip();
    }

    /**
     * Check if too many failed login attempts
     */
    protected function checkTooManyFailedAttempts(Request $request): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }
}