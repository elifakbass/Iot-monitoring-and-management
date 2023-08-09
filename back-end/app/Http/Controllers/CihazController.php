<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;

class CihazController extends Controller
{
    public function kural_update(Request $request,$cihaz_id){

        $data = $request->all();
        $post = Device::where('id',$cihaz_id);
        $post->update($data);
        $device=Device::where('id',$cihaz_id)->first();
        return $device;

    }
    public function gostergeler($id){
        $device=Device::where('id',$id)->first();
        $dash=$device->dashboards;
        if($dash){
            return $dash;
        }

    }
    public function veriler($id){
        $device=Device::where('id',$id)->first();
        $data=$device->datasets;

        if ($data->count() > 10) {
            $lastTenData = $data->take(10);
        } else {
            $lastTenData = $data;
        }
        return $lastTenData;

    }
    public function delete_oge($cihaz_id){
        $device=Device::where('id',$cihaz_id)->first();

        if(!$device){
            return response()->json("error");
        }
        $device->delete();
        return response()->json("basarili");

    }
}
