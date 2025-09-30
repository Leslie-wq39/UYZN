<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PartnerController;       // optional if not using HomeController aggregation
use App\Http\Controllers\FaqController;           // optional
use App\Http\Controllers\StoryController;         // optional
use App\Http\Controllers\EligibilityController;   // optional (mini-checker)

Route::get('/health', fn () => ['ok' => true]);

// Auth presence (Sanctum cookie-based)
Route::middleware('auth:sanctum')->get('/me', fn (Request $r) => $r->user());

// Search (basic shape)
Route::get('/search', [SearchController::class, 'index']);

// Newsletter + Contact
Route::post('/newsletter/subscribe', [NewsletterController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);

// Optional: status for footer
Route::get('/status', fn () => [
    'status' => 'ok',
    'version' => config('app.version', 'dev'),
    'time' => now()->toIso8601String(),
]);

// Public reads
Route::get('/opportunities', [OpportunityController::class, 'index']);
Route::get('/opportunities/{id}', [OpportunityController::class, 'show']);

// Auth endpoints (public)
Route::post('/register', [AuthController::class,'register'])->middleware('throttle:10,1');
Route::post('/login',    [AuthController::class,'login'])->middleware('throttle:20,1');

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/me',    [AuthController::class,'me']);
  Route::post('/logout',[AuthController::class,'logout']);

    // <<< move these inside the group
    Route::post('/opportunities/{id}/apply', [ApplicationController::class, 'apply']);
    Route::get('/my/applications', [ApplicationController::class, 'mine']);
});

// Homepage data
Route::get('/home/featured', [HomeController::class, 'featured']);
Route::get('/partners', [PartnerController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/stories', [StoryController::class, 'index']);

// Eligibility (lightweight)
Route::post('/eligibility/quick', [EligibilityController::class, 'quickCheck']);

// routes/api.php
Route::post('/partners/inquiry', [PartnerController::class, 'inquiry']);
