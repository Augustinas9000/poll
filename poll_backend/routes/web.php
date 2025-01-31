<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::group(['domain' => env('APP_DOMAIN','')], function () {

    Route::get('/', 'App\Http\Controllers\HomeController@home')->name('home');

//    Route::get('/user/login', function () {
//        return view('angular');
//    })->name('login');
});

Route::get('/', function () {
    return view('angular');
});
