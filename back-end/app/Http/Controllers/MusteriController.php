<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Models\Device;
use App\Models\Customer;

class MusteriController extends Controller
{
    public function musteri_cihaz($musteri_id){
        $customer = Customer::where('id',$musteri_id)->first();
        $devices = $customer->devices;
        return $devices;
    }

    public function delete_oge($musteri_id){
        $customer=Customer::where('id',$musteri_id)->first();

        if(!$customer){
            return response()->json("error");
        }
        $customer->delete();
        return response()->json("basarili");
    }
}
