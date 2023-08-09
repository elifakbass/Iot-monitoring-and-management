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
        Schema::create('dashboards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('cihaz_id')->unsigned();
            $table->bigInteger('musteri_id')->unsigned();
            $table->string('isim');
            $table->integer('widget_no');
            $table->timestamps();

            $table->foreign('cihaz_id')->references('id')->on('devices')->onDelete('cascade');
            $table->index('cihaz_id');

            $table->foreign('musteri_id')->references('id')->on('customers')->onDelete('cascade');
            $table->index('musteri_id');
       
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dashboards');
    }
};
