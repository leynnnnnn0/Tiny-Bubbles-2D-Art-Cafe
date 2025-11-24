<?php
namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\QrCode as ModelsQrCode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Spatie\LaravelPdf\Facades\Pdf as PDF;

class QRStudioController extends Controller
{
    public function index()
    {
       $qrCode = Auth::user()->business->qr_code;
        
        return Inertia::render('Business/QRStudio/Index', [
            'qrCode' => $qrCode
        ]);
    }

    public function download()
    {
        $qrCode = Auth::user()->business->qr_code;

        $data = [
            'heading' => $qrCode->heading ?? 'Loyalty Program',
            'subheading' => $qrCode->subheading ?? 'Join our loyalty program by scanning the QR code',
            'backgroundColor' => $qrCode->background_color ?? '#FFFFFF',
            'textColor' => $qrCode->text_color ?? '#000000',
            'qrUrl' => 'https://google.com',
            'logo' => $qrCode->logo ? public_path($qrCode->logo) : null,
            'backgroundImage' =>  $qrCode->background_image ? public_path($qrCode->background_image) : null,
        ];

        $pdf = PDF::view('pdf.qr-code', $data);
        
        
        return $pdf->download("qr-code.pdf");
    }

    public function update(Request $request)
    {
        $business = Auth::user()->business;
        // Validation
        $validated = $request->validate([
            'heading' => 'required|string|max:100',
            'subheading' => 'required|string|max:500',
            'backgroundColor' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'textColor' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
            'backgroundImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB
        ], [
            'heading.required' => 'Heading is required',
            'heading.max' => 'Heading must not exceed 100 characters',
            'subheading.required' => 'Subheading is required',
            'subheading.max' => 'Subheading must not exceed 500 characters',
            'backgroundColor.regex' => 'Background color must be a valid hex color',
            'textColor.regex' => 'Text color must be a valid hex color',
            'logo.image' => 'Logo must be an image file',
            'logo.max' => 'Logo file size must not exceed 5MB',
            'backgroundImage.image' => 'Background image must be an image file',
            'backgroundImage.max' => 'Background image file size must not exceed 10MB',
        ]);


        // Prepare data for updateOrCreate
        $data = [
            'heading' => $validated['heading'],
            'subheading' => $validated['subheading'],
            'background_color' => $validated['backgroundColor'],
            'text_color' => $validated['textColor'],
        ];

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $logoPath = $this->uploadImage($request->file('logo'), 'uploads/qr-codes/logos');
            if ($logoPath) {
                $data['logo'] = $logoPath;
            }
        }

        // Handle background image upload
        if ($request->hasFile('backgroundImage')) {
            $backgroundPath = $this->uploadImage($request->file('backgroundImage'), 'uploads/qr-codes/backgrounds');
            if ($backgroundPath) {
                $data['background_image'] = $backgroundPath;
            }
        }

        // Update or create QR code settings
         ModelsQrCode::updateOrCreate(
            ['business_id' => $business->id],
            $data
        );

        return redirect()->back()->with('success', 'QR Code settings saved successfully!');
    }


        /**
     * Upload image file to public folder
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $folder
     * @return string|null
     */
    private function uploadImage($file, $folder)
    {
        try {
            $extension = $file->getClientOriginalExtension();
            
            // Validate image type
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                throw new \Exception('Invalid image type');
            }

            // Generate unique filename
            $filename = uniqid() . '_' . time() . '.' . $extension;

            // Create directory if it doesn't exist
            $directory = public_path($folder);
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            // Move the file
            $file->move($directory, $filename);

            // Return the relative path for database storage
            return $folder . '/' . $filename;
        } catch (\Exception $e) {
            Log::error('Image upload failed: ' . $e->getMessage());
            return null;
        }
    }

   
}