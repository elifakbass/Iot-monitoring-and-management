<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dataset;
use App\Models\Customer;

class DataController extends Controller
{
    public function veri_ekle(Request $request){
        $data=new Dataset;
        $data->cihaz_id=$request->input('cihaz_id');
        $data->deger=$request->input('deger');
        $data->alarm=$request->input('alarm');
        $data->save();
        return $data;
    }
    public function alarm_sayisi($musteri_id){
        $customer = Customer::where('id',$musteri_id)->first();
        $devices = $customer->devices;

        $startOfDay = date('Y-m-d 00:00:00');
        $endOfDay = date('Y-m-d 23:59:59');

        $data = collect();
        foreach($devices as $device){
            $query = Dataset::whereBetween('created_at', [$startOfDay, $endOfDay])
                ->where('cihaz_id', $device->id)
                ->pluck('alarm')
                ->sum();
            $data->push($query);
        }
        return $data->sum();

    }
}
