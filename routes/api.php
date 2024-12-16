<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Lightit\Backoffice\Users\App\Controllers\DeleteUserController;
use Lightit\Backoffice\Users\App\Controllers\GetUserController;
use Lightit\Backoffice\Users\App\Controllers\ListUserController;
use Lightit\Backoffice\Users\App\Controllers\StoreUserController;

use Lightit\Cities\App\Controllers\DeleteCityController;
use Lightit\Cities\App\Controllers\GetCityController;
use Lightit\Cities\App\Controllers\ListCityController;
use Lightit\Cities\App\Controllers\StoreCityController;
use Lightit\Cities\App\Controllers\UpdateCityController;

use Lightit\Airlines\App\Controllers\DeleteAirlineController;
use Lightit\Airlines\App\Controllers\GetAirlineController;
use Lightit\Airlines\App\Controllers\ListAirlineController;
use Lightit\Airlines\App\Controllers\StoreAirlineController;
use Lightit\Airlines\App\Controllers\UpdateAirlineController;

use Lightit\Flights\App\Controllers\DeleteFlightController;
use Lightit\Flights\App\Controllers\GetFlightController;
use Lightit\Flights\App\Controllers\ListFlightController;
use Lightit\Flights\App\Controllers\StoreFlightController;
use Lightit\Flights\App\Controllers\UpdateFlightController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/
Route::prefix('users')
    ->group(static function () {
        Route::get('/', ListUserController::class);
        Route::get('/{user}', GetUserController::class)->withTrashed();
        Route::post('/', StoreUserController::class);
        Route::delete('/{user}', DeleteUserController::class);
    });

Route::prefix('cities')
    ->group(static function () {
        Route::get('/', ListCityController::class);
        Route::get('/{city}', GetCityController::class);
        Route::post('/', StoreCityController::class);
        Route::put('/{city}', UpdateCityController::class);
        Route::delete('/{city}', DeleteCityController::class);
    }); 

Route::prefix('airlines')
    ->group(static function () {
        Route::get('/', ListAirlineController::class);
        Route::get('/{airline}', GetAirlineController::class);
        Route::post('/', StoreAirlineController::class);
        Route::put('/{airline}', UpdateAirlineController::class);
        Route::delete('/{airline}', DeleteAirlineController::class);
    });

Route::prefix('flights')
    ->group(static function () {
        Route::get('/', ListFlightController::class);
        Route::get('/{flight}', GetFlightController::class);
        Route::post('/', StoreFlightController::class);
        Route::put('/{flight}', UpdateFlightController::class);
        Route::delete('/{flight}', DeleteFlightController::class);
    });
