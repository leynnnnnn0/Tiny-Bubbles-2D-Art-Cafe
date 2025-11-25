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
        Schema::create('perk_claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->foreignId('loyalty_card_id')
                ->constrained('loyalty_cards')
                ->onDelete('cascade');
            $table->foreignId('perk_id')
                ->constrained('perks')
                ->onDelete('cascade');
            $table->integer('stamps_at_claim');
            $table->boolean('is_redeemed')
                ->default(false);
            $table->timestamp('redeemed_at')
                ->nullable();
            $table->foreignId('redeemed_by')
                ->nullable()->constrained('users')
                ->onDelete('set null');
            $table->text('remarks')
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perk_claims');
    }
};
