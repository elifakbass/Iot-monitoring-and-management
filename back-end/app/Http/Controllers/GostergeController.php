<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Dashboard;

class GostergeController extends Controller
{
    //
    public function delete_oge($cihaz_id){
        $dash=Dashboard::where('id',$cihaz_id)->first();

        if(!$dash){
            return response()->json("error");
        }
        $dash->delete();
        return response()->json("basarili");
    }
}
