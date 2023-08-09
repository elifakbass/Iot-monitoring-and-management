<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;
use App\Models\Tenant;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    public function login(Request $request){
        $user = Customer::where("username", $request->username)->first();
        $tenant=1;

    if (!$user) {
        $tenant = Tenant::where("email", $request->username)->first();
        if ($tenant  && md5($request->password)===$tenant->password) {
          
            return response()->json([
                "type" => "tenant",
                "data" => $tenant
            ]);
            
        }

    }
    if(!$tenant){
        $admin = Admin::where("email", $request->username)->first();
        if ($admin  && md5($request->password)===$admin->password) {
          
            return response()->json([
                "type" => "admin",
                "data" => $admin
            ]);
            
        }

    }
    else{
        if ($user  && md5($request->password)===$user->password) {
          
            return response()->json([
                "type" => "customer",
                "data" => $user
            ]);
            
        }
    }


        
        return response()->json("error");
        
   
    }
}
