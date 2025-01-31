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
        Schema::create('votings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();

            $table->text('name');
            $table->text('password')->nullable();

            $table->string('url_token', 255)->nullable();

            $table->string('access_code', 255);

            $table->integer('user_id')->unsigned()->index()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

//            $table->integer('votes_count')->nullable();

            $table->boolean('login_required')->default(false);
            $table->text('allowed_voters')->nullable();

            $table->boolean('encrypted');

            $table->integer('start_method');
            $table->integer('close_method');
            $table->integer('display_method');

            $table->integer('valid_time')->nullable();
            $table->integer('display_time')->nullable();

            $table->boolean('snap_vote')->default(false);

            $table->dateTime('time_vote_started')->nullable();
            $table->dateTime('time_vote_stopped')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votings');
    }
};
