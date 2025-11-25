<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\LoyaltyCard;
use App\Models\StampCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $customer = Auth::guard('customer')->user();

        $cardTemplates = LoyaltyCard::with(['perks'])
            ->where('business_id', $customer->business_id)
            ->get();

        $stampCodes = StampCode::where('customer_id', $customer->id)
            ->whereNotNull('used_at')
            ->latest()
            ->get();

        return inertia('Customer/Dashboard/Index', [
            'cardTemplates' => $cardTemplates,
            'stampCodes' => $stampCodes,
            'customer' => $this->greetingByTime() . ', ' . strtoupper($customer->username),
        ]);
    }

    function greetingByTime()
    {
        $hour = now()->format('H');

        if ($hour < 12) {
            return 'Good morning';
        } elseif ($hour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }
}
