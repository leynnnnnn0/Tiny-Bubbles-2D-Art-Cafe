<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    /** @use HasFactory<\Database\Factories\StaffFactory> */
    use HasFactory;

    protected $fillable = [ 
        'business_id',
        'branch',
        'username',
        'password',
        'remarks',
        'is_active'
    ];

    protected $table = 'staff';

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
