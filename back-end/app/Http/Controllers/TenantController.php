<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tenant;
use App\Models\Customer;
use App\Models\Device;
use App\Http\Controllers\CihazController;
use App\Models\Dashboard;
use App\Models\Dataset;

class TenantController extends Controller
{
    public function customers($tenant_id){
        $tenant = Tenant::where('id',$tenant_id)->first();
        $customers = $tenant->customers;
        return $customers;

    }

    public function musteri_sayisi($tenant_id){
        $customers=$this->customers($tenant_id);
        $customerCount = count($customers);
        return $customerCount;
    }

    public function devices($tenant_id){
        $customers=$this->customers($tenant_id);
        
        $data=collect();
        foreach($customers as $customer){
            $devices=$customer->devices;
            if(!$devices->isEmpty()){
                $data=$data->concat($devices);
            }
            
        }
        return $data;
    }

    public function cihaz_sayisi($tenant_id){
        $devices=$this->devices($tenant_id);
        $count=count($devices);
        return $count;
    }

    public function dashboards($tenant_id)
    {
        $devices = $this->devices($tenant_id);
        $data = collect();
    
        foreach ($devices as $device) {
            $id=$device->id;
            $dashs = app(CihazController::class)->gostergeler($id);
    
            if (!$dashs->isEmpty()) {
                $data=$data->concat($dashs);
            }
        }
    
        return $data;
    }

    public function musteri_ekle(Request $REQUEST){
        $musteri=new Customer();
        $musteri->tenant_id=$REQUEST->tenant_id;
        $musteri->username=$REQUEST->email;
        $musteri->password=$REQUEST->password;
        $musteri->isim_soyisim=$REQUEST->isim_soyisim;
        $musteri->sehir_ulke=$REQUEST->sehir_ulke;
        $musteri->save();

        return $musteri;

    }

    public function cihaz_ekle(Request $req){
        $cihaz=new Device();
        $cihaz->musteri_id=$req->musteri_id;
        $cihaz->isim=$req->isim;
        $cihaz->tip=$req->tip;
        $cihaz->alarm_ust_sinir=$req->alarm_ust_sinir;
        $cihaz->alarm_alt_sinir=$req->alarm_alt_sinir;
        $cihaz->enlem=$req->enlem;
        $cihaz->boylam=$req->boylam;
        $cihaz->save();

        return $cihaz;

    }
    public function gostergeEkle(Request $req){
        $dash=new Dashboard();
        $dash->isim=$req->isim;
        $dash->musteri_id=$req->musteri_id;
        $dash->cihaz_id=$req->cihaz_id;
        $dash->widget_no=1;
        $dash->save();

        return $dash;
    }

    public function musteri_guncelle(Request $req, $musteri_id){
        $data = $req->all();
        $musteri = Customer::where('id',$musteri_id);
        $musteri->update($data);
        $new=Customer::where('id',$musteri_id)->first();
        return $new;
    }

    public function cihaz_guncelle(Request $req, $cihaz_id){
        $data = $req->all();
        $device = Device::where('id',$cihaz_id);
        $device->update($data);
        $new=Device::where('id',$cihaz_id)->first();
        return $new;
    }

    public function gosterge_guncelle(Request $req, $dash_id){
        $data = $req->all();
        $dash = Dashboard::where('id',$dash_id);
        $dash->update($data);
        $new=Dashboard::where('id',$dash_id)->first();
        return $new;
    }

    public function alarm_sayisi($tenant_id){
        $devices=$this->devices($tenant_id);

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
