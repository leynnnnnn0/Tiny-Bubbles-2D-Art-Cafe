<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @page {
            margin: 0;
            padding: 0;
            size: 8.5in 11in;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        body {
            font-family: 'DejaVu Sans', sans-serif;
        }
        
        @media print {
            html, body {
                width: 8.5in;
                height: 11in;
            }
        }
    </style>
</head>
<body>
    <div class="w-screen h-screen relative overflow-hidden"
         style="{{ $backgroundImage ? "background-image: url('{$backgroundImage}'); background-size: cover; background-position: center;" : "background-color: {$backgroundColor};" }}">
        
        @if($backgroundImage)
            <div class="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        @endif
        
        <div class="relative h-full flex flex-col items-center justify-center p-16 border-[1rem]"
             style="border-color: {{ $textColor }};">
            
            <!-- Heading -->
            <h1 class="text-9xl font-serif italic mt-10"
                style="color: {{ $textColor }};">
                {{ $heading }}
            </h1>

            <!-- Subheading -->
            <p class="text-center text-3xl mb-16 whitespace-pre-line leading-relaxed"
               style="color: {{ $textColor }};">
                {{ $subheading }}
            </p>

            <!-- QR Code -->
            <div class="w-80 h-80 bg-white p-4 mb-16 shadow-2xl">
                @if($qrUrl)
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data={{ $qrUrl }}" 
                         alt="QR Code" 
                         class="w-full h-full object-contain">
                @else
                    <div class="w-full h-full bg-gray-300 flex items-center justify-center text-xl text-gray-600">
                        QR Code Preview
                    </div>
                @endif
            </div>

            <!-- Logo -->
            <div class="p-6 w-64 h-64 flex items-center justify-center"
                 style="border-color: {{ $textColor }};">
                @if($logo && file_exists($logo))
                    <img src="{{ $logo }}" alt="Logo" class="max-w-full max-h-full object-contain">
                @else
                    <div class="text-center font-bold text-3xl" style="color: {{ $textColor }};">
                        <div>YOUR</div>
                        <div>LOGO</div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</body>
</html>