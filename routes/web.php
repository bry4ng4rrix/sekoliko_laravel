<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\InscriptionController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::resource('eleves', EleveController::class)->parameters(['eleves' => 'eleve']);
    Route::post('eleves/{eleve}/inscriptions', [InscriptionController::class, 'store'])->name('eleves.inscriptions.store');
});

require __DIR__.'/auth.php';
