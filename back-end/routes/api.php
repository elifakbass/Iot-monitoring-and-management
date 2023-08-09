<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MusteriController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CihazController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\GostergeController;
use App\Http\Controllers\AdminController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

#Route::apiResource('musteri', MusteriController::class);
Route::get('musteri_cihaz/{musteri_id}', [MusteriController::class,'musteri_cihaz']);
Route::post('login',[AuthController::class,'login']);
Route::put('alarm/{cihaz_id}',[CihazController::class,'kural_update']);
Route::get('dashboard/{cihaz_id}',[CihazController::class,'gostergeler']);
Route::get('data/{cihaz_id}',[CihazController::class,'veriler']);
Route::post('data',[DataController::class,'veri_ekle']);
Route::get('alarm_count/{musteri_id}',[DataController::class,'alarm_sayisi']);


#tenants api's
Route::get('musteriler/{tenant_id}',[TenantController::class,"customers"]);
Route::get('cihazlar/{tenant_id}',[TenantController::class,"devices"]);
Route::get('gostergeler/{tenant_id}',[TenantController::class,"dashboards"]);
Route::get('musteri_sayisi/{tenant_id}',[TenantController::class,"musteri_sayisi"]);
Route::get('cihaz_sayisi/{tenant_id}',[TenantController::class,"cihaz_sayisi"]);
Route::get('alarm/{tenant_id}',[TenantController::class,'alarm_sayisi']);


Route::post('musteri',[TenantController::class,"musteri_ekle"]);
Route::post('cihaz',[TenantController::class,"cihaz_ekle"]);
Route::post('gosterge',[TenantController::class,"gostergeEkle"]);

Route::put('musteri/{musteri_id}',[TenantController::class,"musteri_guncelle"]);
Route::put('cihaz/{cihaz_id}',[TenantController::class,"cihaz_guncelle"]);
Route::put('gosterge/{gosterge_id}',[TenantController::class,"gosterge_guncelle"]);

Route::delete('musteri/{musteri_id}',[MusteriController::class,"delete_oge"]);
Route::delete('cihaz/{cihaz_id}',[CihazController::class,"delete_oge"]);
Route::delete('gosterge/{gosterge_id}',[GostergeController::class,"delete_oge"]);


#admin api's
Route::get('tenantlar/{admin_id}',[AdminController::class,"tenants"]);
Route::post('tenant',[AdminController::class,"tenant_ekle"]);
Route::put('tenant/{tenant_id}',[AdminController::class,"tenant_guncelle"]);
Route::delete('tenant/{tenant_id}',[AdminController::class,"delete_oge"]);
