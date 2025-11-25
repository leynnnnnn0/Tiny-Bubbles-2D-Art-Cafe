<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoyaltyCard extends Model
{
    /** @use HasFactory<\Database\Factories\LoyaltyCardFactory> */
    use HasFactory;

    protected $fillable = [
        'business_id',
        'logo',
        'name',
        'heading',
        'subheading',
        'stampsNeeded',
        'mechanics',
        'backgroundColor',
        'textColor',
        'stampColor',
        'stampFilledColor',
        'stampEmptyColor',
        'stampImage',
        'backgroundImage',
        'footer',
        'stampShape',

    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function perks()
    {
        return $this->hasMany(Perk::class);
    }

    public function stamp_codes()
    {
        return $this->hasMany(StampCode::class);
    }
}
