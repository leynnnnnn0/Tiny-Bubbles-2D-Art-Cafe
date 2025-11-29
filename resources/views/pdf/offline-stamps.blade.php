<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Loyalty Program Stamp Tickets</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        @page {
            margin: 8mm;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 8pt;
            color: #333;
        }
        
        .page-header {
            text-align: center;
            margin-bottom: 6px;
            padding-bottom: 4px;
            border-bottom: 2px solid #F4B942;
        }
        
        .page-header h1 {
            font-size: 14pt;
            color: #F4B942;
            margin-bottom: 2px;
        }
        
        .page-header p {
            font-size: 7pt;
            color: #666;
        }
        
        .instructions {
            background: #FEF3C7;
            border-left: 3px solid #F59E0B;
            padding: 4px 6px;
            margin-bottom: 6px;
            font-size: 6.5pt;
            line-height: 1.2;
        }
        
        .instructions strong {
            color: #B45309;
        }
        
        .tickets-container {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
        
        .ticket-row {
            display: table-row;
        }
        
        .ticket {
            display: table-cell;
            width: 50%;
            border: 1.5px dashed #CBD5E1;
            padding: 4px;
            position: relative;
            page-break-inside: avoid;
            vertical-align: top;
        }
        
        .ticket:nth-child(odd) {
            border-right: 0.75px dashed #CBD5E1;
        }
        
        .ticket:nth-child(even) {
            border-left: 0.75px dashed #CBD5E1;
        }
        
        .ticket-header {
            text-align: center;
            margin-bottom: 2px;
            padding-bottom: 2px;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .ticket-header h2 {
            font-size: 8pt;
            color: #F4B942;
            font-weight: 600;
            margin-bottom: 0px;
        }
        
        .ticket-header .business-name {
            font-size: 6.5pt;
            color: #6B7280;
            font-weight: normal;
        }
        
        .ticket-content {
            display: table;
            width: 100%;
        }
        
        .left-section, .right-section {
            display: table-cell;
            vertical-align: middle;
        }
        
        .left-section {
            width: 45%;
            padding-right: 5px;
            border-right: 1px solid #E5E7EB;
        }
        
        .right-section {
            width: 55%;
            padding-left: 5px;
            text-align: center;
        }
        
        .code-label {
            font-size: 6.5pt;
            color: #6B7280;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.3px;
            margin-bottom: 1px;
        }
        
        .code-value {
            font-size: 12pt;
            font-weight: 700;
            color: #1F2937;
            letter-spacing: 1.5px;
            font-family: 'Courier New', monospace;
            word-break: break-all;
            line-height: 1.1;
        }
        
        .register-label {
            font-size: 6.5pt;
            color: #6B7280;
            margin-bottom: 1px;
            font-weight: 600;
        }
        
        .qr-code {
            margin: 1px auto;
        }
        
        .qr-code img {
            width: 65px;
            height: 65px;
            display: block;
            margin: 0 auto;
        }
        
        .url-text {
            font-size: 5.5pt;
            color: #F4B942;
            word-break: break-all;
            line-height: 1.1;
            margin-top: 1px;
        }
        
        .scissors {
            position: absolute;
            bottom: 1px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 7pt;
            color: #9CA3AF;
        }
        
        .cut-guide {
            font-size: 6pt;
            color: #9CA3AF;
            text-align: center;
            margin-top: 3px;
        }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>{{ $businessName }}</h1>
        <p>Customer Loyalty Program Stamp Tickets</p>
    </div>
    
    <div class="instructions">
        <strong>Instructions:</strong> Cut along the dashed lines to separate tickets. Distribute to customers. They scan the QR code or enter the stamp code to register for your loyalty program.
    </div>
    
    <div class="tickets-container">
        @foreach(array_chunk($tickets, 2) as $rowTickets)
        <div class="ticket-row">
            @foreach($rowTickets as $ticket)
            <div class="ticket">
                <div class="ticket-header">
                    <h2>Join Our Loyalty Program</h2>
                    <div class="business-name">{{ $businessName }}</div>
                </div>
                
                <div class="ticket-content">
                    <div class="left-section">
                        <div class="code-label">Stamp Code</div>
                        <div class="code-value">{{ $ticket['code'] }}</div>
                    </div>
                    
                    <div class="right-section">
                        <div class="register-label">Scan to Register</div>
                        <div class="qr-code">
                            <img src="{{ $ticket['qr_code_base64'] }}" alt="QR Code">
                        </div>
                        <div class="url-text">{{ $registrationLink }}</div>
                    </div>
                </div>
                
                <div class="scissors">✂</div>
            </div>
            @endforeach
            
            @if(count($rowTickets) == 1)
            <div class="ticket" style="border: none;"></div>
            @endif
        </div>
        @endforeach
    </div>
    
    <div class="cut-guide">
        Cut along dashed lines ✂ • Generated on {{ date('M d, Y') }}
    </div>
</body>
</html>