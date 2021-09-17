<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeoplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('peoples', function (Blueprint $table) {
            $table->id();

            $table->string('name', 250)->nullable();
            $table->string('taxpayer')->unique()->nullable();
            $table->string('phone', 13)->nullable();
            $table->string('email', 128)->unique()->nullable();
            $table->string('sex', 1)->nullable();
            $table->string('pregnant_woman', 1)->nullable();
            $table->date('birthday')->nullable();
            $table->string('street_name', 250)->nullable();
            $table->string('street_number', 32)->nullable();
            $table->string('city', 250)->nullable();
            $table->string('state', 2)->nullable();
            $table->string('zip', 32)->nullable();
            $table->string('active', 1)->nullable();
            $table->text('justification')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('peoples');
    }
}
