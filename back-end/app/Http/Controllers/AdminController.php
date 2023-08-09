<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Tenant;

class AdminController extends Controller
{
    public function tenants($admin_id){
        $admin = Admin::where('id',$admin_id)->first();
        $tenant = $admin->tenants;
        return $tenant;

    }

    public function tenant_ekle(Request $req){
        $tenant=new Tenant();
        $tenant->admin_id=$req->admin_id;
        $tenant->email=$req->email;
        $tenant->password=$req->password;
        $tenant->max_musteri_sayisi=$req->max_musteri_sayisi;
        $tenant->max_cihaz_sayisi=$req->max_cihaz_sayisi;

        $tenant->save();
        return $tenant;
    }

    public function tenant_guncelle( Request $req, $tenant_id){
        $data = $req->all();
        $tenant = Tenant::where('id',$tenant_id);
        $tenant->update($data);
        $new=Tenant::where('id',$tenant_id)->first();
        return $new;
       
    }

    public function delete_oge($tenant_id){
        $tenant=Tenant::where('id',$tenant_id)->first();

        if(!$tenant){
            return response()->json("error");
        }
        $tenant->delete();
        return response()->json("basarili");
    }
}
