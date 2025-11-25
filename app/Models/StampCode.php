<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StampCode extends Model
{
    protected $fillable = [
        'loyalty_card_id',
        'business_id',
        'customer_id',
        'code',
        'used_at',
        'is_expired'
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function loyalty_card()
    {
        return $this->belongsTo(LoyaltyCard::class);
    }
}
