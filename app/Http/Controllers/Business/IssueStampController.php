<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\LoyaltyCard;
use App\Models\StampCode;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IssueStampController extends Controller
{
    public function index(Request $request)
    {
        $cards = LoyaltyCard::where('business_id', Auth::user()->business->id)
        ->whereDate('valid_until', '>', today())
            ->select('id', 'name')
            ->get();

        // Generate code if loyalty_card_id is provided
        if ($request->has('loyalty_card_id')) {
            $loyaltyCardId = $request->input('loyalty_card_id');
            
            // Validate that the card belongs to this business
            $cardExists = $cards->contains('id', $loyaltyCardId);
            
            if ($cardExists) {
                $code = $this->generate($loyaltyCardId);
            } else {
                $code = [
                    'success' => false,
                    'code' => '',
                    'qr_url' => '',
                    'created_at' => ''
                ];
            }
        } else {
            $code = [
                'success' => false,
                'code' => '',
                'qr_url' => '',
                'created_at' => ''
            ];
        }



        return Inertia::render('Business/IssueStamp/Index', [
            'code' => $code,
            'cards' => $cards,
            'loyalty_card_id' => $request->input('loyalty_card_id', null),
        ]);
    }

    private function generate($loyaltyCardId)
    {
        // Expire old unused codes
        StampCode::whereNull('used_at')
            ->where('created_at', '<=', Carbon::now()->subMinutes(15))
            ->update([
                'is_expired' => true
            ]);

        // Generate unique code
        do {
            $code = strtoupper(Str::random(8));
        } while (StampCode::where('code', $code)->exists());

        // Create stamp code
        $stampCode = StampCode::create([
            'business_id' => Auth::user()->business->id,
            'customer_id' => null,
            'loyalty_card_id' => $loyaltyCardId,
            'code' => $code,
            'used_at' => null,
            'is_expired' => false
        ]);

        return [
            'success' => true,
            'code' => $stampCode->code,
            'qr_url' => "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data={$stampCode->code}",
            'created_at' => $stampCode->created_at->format('M d, Y h:i A')
        ];
    }
}