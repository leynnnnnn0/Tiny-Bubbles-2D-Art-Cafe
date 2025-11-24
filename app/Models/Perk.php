<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perk extends Model
{
    /** @use HasFactory<\Database\Factories\PerkFactory> */
    use HasFactory;

    protected $fillable = [
        'loyalty_card_id',
        'stampNumber',
        'reward',
        'details',
        'color',
    ];

    public function loyaltyCard()
    {
        return $this->belongsTo(LoyaltyCard::class);
    }
}
