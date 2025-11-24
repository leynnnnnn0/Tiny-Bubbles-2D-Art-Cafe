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
        Schema::create('loyalty_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->onDelete('cascade');
            $table->string('logo')->nullable();
            $table->string('heading');
            $table->string('subheading')->nullable();
            $table->integer('stampsNeeded');
            $table->text('mechanics')->nullable();
            $table->string('backgroundColor')->default('#FFFFFF');
            $table->string('textColor')->default('#000000');
            $table->string('stampColor')->default('#FF0000');
            $table->string('stampFilledColor')->default('#FF0000');
            $table->string('stampEmptyColor')->default('#CCCCCC');
            $table->string('stampImage')->nullable();
            $table->string('backgroundImage')->nullable();
            $table->string('footer')->nullable();
            $table->string('stampShape')->default('circle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loyalty_cards');
    }
};
