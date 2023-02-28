<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MandadosDisponibles;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    //Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('users', [AuthController::class, 'allUsers']);

//Rutas para mandados

Route::post('register-mandado', [MandadosDisponibles::class, 'registerMandado']);
Route::get('mandados-available', [MandadosDisponibles::class, 'getAllMandados']);
Route::get('user-mandados/{id}', [MandadosDisponibles::class, 'getMyMandado']);
Route::get('other-mandados/{id}', [MandadosDisponibles::class, 'getOtherMandado']);
Route::get('get-mandado-by-id/{id}', [MandadosDisponibles::class, 'getOneMandado']);