<?php

use App\Http\Controllers\Business\CardTempalateController;
use App\Http\Controllers\Business\CustomerController;
use App\Http\Controllers\Business\DashboardController;
use App\Http\Controllers\Business\QRStudioController;
use App\Http\Controllers\Business\IssueStampController;
use App\Http\Controllers\Business\StampCodeController;
use App\Http\Controllers\Customer\CustomerAuthController;
use App\Http\Controllers\Customer\DashboardController as CustomerDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('business')->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/card-templates', CardTempalateController::class);
    Route::get('/qr-studio', [QRStudioController::class, 'index']);
    Route::get('/qr-studio/download', [QRStudioController::class, 'download']);
    Route::post('/qr-studio/update', [QRStudioController::class, 'update']);
    Route::resource('/customers', CustomerController::class);
    Route::get('/issue-stamp', [IssueStampController::class, 'index']);
    Route::get('/stamp-codes', [StampCodeController::class, 'index']);
});

});

Route::post('/stamps/record', [StampCodeController::class, 'record'])
    ->name('customer.stamps.record');

// Customer Authentication Routes
Route::prefix('customer')->name('customer.')->group(function () {
    
    // Guest routes (not authenticated)
    Route::middleware('guest:customer')->group(function () {
        // Login
        Route::get('/login', [CustomerAuthController::class, 'index'])
            ->name('login');
        
        Route::post('/login', [CustomerAuthController::class, 'login']);
        
        // Register
        Route::get('/register', [CustomerAuthController::class, 'showRegister'])
            ->name('register');
        
        Route::post('/register', [CustomerAuthController::class, 'register']);
    });
    
    // Authenticated customer routes
    Route::middleware('auth:customer')->group(function () {
        // Logout
        Route::post('/logout', [CustomerAuthController::class, 'logout'])
            ->name('logout');
        
        // Dashboard
        Route::get('/dashboard', [CustomerDashboardController::class, 'index'])->name('dashboard');
        
        // Add more customer routes here...
    });
});

require __DIR__.'/settings.php';
