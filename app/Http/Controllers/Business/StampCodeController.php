<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\StampCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StampCodeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $stampCodes = StampCode::where('business_id', Auth::user()->business->id)
            ->with('customer:id,username,email')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($customerQuery) use ($search) {
                            $customerQuery->where('username', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Business/StampCode/Index', [
            'stampCodes' => $stampCodes,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function record(Request $request)
    {
        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'exists:stamp_codes,code',
                function ($attribute, $value, $fail) {
                    $stampCode =  StampCode::where('code', $value)->first();
                    if (!$stampCode) {
                        $fail('The stamp code is invalid for this loyalty card.');
                    } elseif ($stampCode->is_expired) {
                        $fail('This stamp code has expired.');
                    } elseif ($stampCode->used_at !== null) {
                        $fail('This stamp code has already been used.');
                    }
                },
            ],
            'loyalty_card_id' => 'required|exists:loyalty_cards,id'
        ]);

        $stampCode = StampCode::where('code', $validated['code'])
            ->whereNull('used_at')
            ->where('is_expired', false)
            ->first();
            

        if (!$stampCode) {
            return response()->json(['success' => false, 'message' => 'Invalid or expired stamp code.'], 400);
        }
        $stampCode->update([
            'customer_id' => Auth::guard('customer')->user()->id,
            'used_at' => now(),
        ]);

        return back()->with([
            'success' => true,
            'active_card_id' => $stampCode->loyalty_card_id
        ]);
    }
}
