<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();

            $table->integer('type')->unsigned();
            $table->text('title');

            $table->integer('position')->nullable();

            $table->integer('voting_id')->unsigned()->index()->nullable();
            $table->foreign('voting_id')->references('id')->on('votings')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
