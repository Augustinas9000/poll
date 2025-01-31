<?php

use App\Http\Controllers\OAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'voting', 'middleware' => []], function() {
    Route::get('',              [\App\Http\Controllers\VotingController::class,       'getPolls']             )->name('voting.getPolls');
    Route::get('get',           [\App\Http\Controllers\VotingController::class,       'get']                   )->name('voting.get');
    Route::post('start',        [\App\Http\Controllers\VotingController::class,       'startVoting']           )->name('voting.start');
    Route::post('stop',         [\App\Http\Controllers\VotingController::class,       'stopVoting']            )->name('voting.stop');
    Route::post('create',       [\App\Http\Controllers\VotingController::class,       'createVoting']          )->name('voting.create');


});

Route::group(['prefix' => 'oauth'], function() {
    Route::get('login',                [OAuthController::class,       'redirectToLogin'])->name('oauth.login');
    Route::get('logout',               [OAuthController::class,       'logout']         )->name('oauth.logout');
    Route::post('finalizeLogin',       [OAuthController::class,       'login']          )->name('oauth.finalizeLogin');
    Route::get('loginPoll',           [OAuthController::class,       'loginPoll']          )->name('oauth.loginPoll');
});
