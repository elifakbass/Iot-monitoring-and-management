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
        Schema::create('devices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('musteri_id');
            $table->string('isim');
            $table->string('tip');
            $table->integer('alarm_ust_sinir');
            $table->integer('alarm_alt_sinir');
            $table->double('enlem');
            $table->double('boylam');
            $table->timestamps();

            $table->foreign('musteri_id')->references('id')->on('customers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cihaz');
    }
};
