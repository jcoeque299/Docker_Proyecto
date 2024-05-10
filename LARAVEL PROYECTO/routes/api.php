<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SavedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/comments/{eventId}', [CommentController::class, 'index']);
Route::post('/comments', [CommentController::class, 'store']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

Route::get('/saved/{userId}', [SavedController::class, 'index']);
Route::post('/saved', [SavedController::class, 'store']);
Route::delete('/saved/{id}', [SavedController::class, 'destroy']);

Route::get('/tickets', [TicketController::class, 'index'])->middleware('checkRole:admin');
Route::post('/tickets', [TicketController::class, 'store']);
Route::delete('/tickets/{eventId}', [TicketController::class, 'destroy'])->middleware('checkRole:admin');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/user/role', [AuthController::class, 'getRole']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);