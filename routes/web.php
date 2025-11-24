<?php

use App\Http\Controllers\Business\CardTempalateController;
use App\Http\Controllers\Business\DashboardController;
use App\Http\Controllers\Business\QRStudioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::prefix('business')->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('/card-templates', CardTempalateController::class);
    Route::get('/qr-studio', [QRStudioController::class, 'index']);
    Route::get('/qr-studio/download', [QRStudioController::class, 'download']);
    Route::post('/qr-studio/update', [QRStudioController::class, 'update']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
