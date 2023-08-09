<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MusteriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
        DB::table('customers')->insert([
            "tenant_id"=>1,
            "username"=>'esraturul@gmail.com',
            "password"=>md5("123456"),
            "isim_soyisim"=>"Esra Turul",
            "sehir_ulke"=>"Ankara/Türkiye",
        ]);
    }
}
