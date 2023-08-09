<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('tenant_id')->unsigned();
            $table->index('tenant_id');
            $table->string('username');
            $table->string('password');
            $table->string('isim_soyisim');
            $table->string('sehir_ulke');

            $table->timestamps();


            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('musteri');
    }
};
