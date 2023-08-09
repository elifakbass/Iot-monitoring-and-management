<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GostergeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dashboards')->insert([
            "cihaz_id"=>3,
            "musteri_id"=>2,
            "isim"=>"temp_MyDevice",
            "widget_no"=>3
        ]);
        
    }
}
