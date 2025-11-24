<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    /** @use HasFactory<\Database\Factories\BusinessFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'contact_email',
        'contact_phone',
    ];

    public function loyaltyCards()
    {
        return $this->hasMany(LoyaltyCard::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
