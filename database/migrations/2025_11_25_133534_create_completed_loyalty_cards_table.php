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
        Schema::create('completed_loyalty_cards', function (Blueprint $table) {
               $table->id();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('loyalty_card_id')->constrained('loyalty_cards')->onDelete('cascade');
            $table->integer('stamps_collected');
            $table->timestamp('completed_at');
            $table->integer('card_cycle')->default(1);
            $table->json('stamps_data')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('completed_loyalty_cards');
    }
};
