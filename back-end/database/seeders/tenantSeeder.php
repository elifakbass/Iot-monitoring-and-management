<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tenants=['tenant1@gmail.com','tenant2@gmail.com'];
        foreach($tenants as $tenant){

        DB::table('tenants')->insert([
            "admin_id"=>1,
            "email"=>$tenant ,
            "password"=>md5("123456"),
            "max_musteri_sayisi"=>25,
            "max_cihaz_sayisi"=>25
        ]);
        }
    }
}
