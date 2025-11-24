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
       Schema::create('qr_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->onDelete('cascade');
            $table->string('heading', 100);
            $table->text('subheading');
            $table->string('background_color', 7)->default('#FFFFFF');
            $table->string('text_color', 7)->default('#000000');
            $table->string('background_image')->nullable();
            $table->string('logo')->nullable();
            $table->timestamps();
            
            // Ensure one QR code per business
            $table->unique('business_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr_codes');
    }
};
