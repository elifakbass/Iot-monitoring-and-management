<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CihazSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        
        DB::table('devices')->insert([
            'musteri_id'=>2,
            'isim'=>'myDevice',
            'tip'=>'default',
            'alarm_ust_sinir'=>100,
            'alarm_alt_sinir'=>0,
            'enlem'=>37.94950727725232, 
            'boylam'=>32.46451559661182
        ]);
            
       
    }
}
