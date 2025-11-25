import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ChevronLeft, ChevronRight, User, Wallet, ShoppingCart, Plus, Camera, KeyboardIcon } from 'lucide-react';
import { router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Perk {
  id: number;
  stampNumber: number;
  reward: string;
  details: string | null;
  color: string;
}

interface LoyaltyCard {
  id: number;
  logo: string | null;
  name: string;
  heading: string;
  subheading: string;
  stampsNeeded: number;
  mechanics: string;
  backgroundColor: string;
  textColor: string;
  stampColor: string;
  stampFilledColor: string;
  stampEmptyColor: string;
  stampImage: string | null;
  backgroundImage: string | null;
  footer: string;
  stampShape: 'circle' | 'star' | 'square' | 'hexagon';
  perks: Perk[];
}

interface StampCode {
  id: number;
  loyalty_card_id: number;
  code: string;
  used_at: string;
  customer_id: number;
}

interface Props {
  cardTemplates: LoyaltyCard[];
  stampCodes: StampCode[];
  customer : string;
  active_card_id?: number;
}

export default function Index({ cardTemplates, stampCodes, customer, active_card_id }: Props) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [recordDialogOpen, setRecordDialogOpen] = useState(false);
  const [methodDialogOpen, setMethodDialogOpen] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const {flash} = usePage().props as any;

  const { data, setData, errors, post, processing, reset } = useForm({
    code: '',
    loyalty_card_id: cardTemplates[0]?.id || null,
  });



  const currentCard = cardTemplates[currentCardIndex];

  // Calculate stamps for current card
  const currentCardStamps = useMemo(() => {
    if (!stampCodes || !currentCard) return [];

    return stampCodes.filter(stamp => stamp.loyalty_card_id === currentCard.id);
  }, [stampCodes, currentCard]);

  const totalStamps = currentCardStamps?.length || 0;

  // Get perks/rewards for current card
  const currentCardPerks = useMemo(() => {

    return currentCard != undefined ? currentCard?.perks : [];
  }, [currentCard]);


  // Navigate cards
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cardTemplates.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cardTemplates.length) % cardTemplates.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const handleRecordStamp = () => {
    setMethodDialogOpen(true);
  };


  const handleManualEntry = () => {
    setMethodDialogOpen(false);
    setRecordDialogOpen(true);
    setData('loyalty_card_id', currentCard?.id);
  };

    
  const handleScanQR = async () => {
    setMethodDialogOpen(false);
    setScanDialogOpen(true);
    setScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error('Camera access denied. Please enable camera permissions.');
      setScanDialogOpen(false);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
    setScanDialogOpen(false);
  };

 const handleSubmitCode = (e: React.FormEvent) => {
  e.preventDefault();
  
  const cardIdToFind = data.loyalty_card_id; // Save it BEFORE reset()
  console.log('Submitting code for card ID:', cardIdToFind);
  
  post('/stamps/record', {
    onSuccess: (page) => {

      // Find and set the index BEFORE reset
      const index = cardTemplates.findIndex(card => card.id === page.props.flash.active_card_id);

      if (index !== -1) {
        setCurrentCardIndex(index);
      }
      
      reset(); // Reset AFTER using the data
      setRecordDialogOpen(false);
    },
    onError: (errors) => {
      if (errors.code) {
        toast.error(errors.code);
      } else {
        toast.error('Failed to record stamp. Please try again.');
      }
    }
  });
};

  const StampShape = ({ shape, isFilled, isReward, rewardText, color }: {
    shape: string;
    isFilled: boolean;
    isReward: boolean;
    rewardText?: string;
    color: string;
  }) => {
    const fillColor = isFilled ? (currentCard.stampFilledColor || color) : currentCard.stampEmptyColor;
    const strokeColor = isFilled ? '#FFFFFF' : '#D1D5DB';
    const stampImageUrl = currentCard.stampImage ? `/${currentCard.stampImage}` : null;

    const shapes: Record<string, JSX.Element> = {
      circle: (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            {stampImageUrl && (
              <pattern id="stampPattern" x="0" y="0" width="1" height="1">
                <image href={stampImageUrl} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>
          <circle cx="50" cy="50" r="45" fill={stampImageUrl && isFilled ? "url(#stampPattern)" : fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
      ),
      star: (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            {stampImageUrl && (
              <pattern id="stampPattern" x="0" y="0" width="1" height="1">
                <image href={stampImageUrl} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>
          <path
            d="M50 5 L55 20 L70 15 L70 30 L85 35 L75 47 L85 59 L70 64 L70 79 L55 74 L50 89 L45 74 L30 79 L30 64 L15 59 L25 47 L15 35 L30 30 L30 15 L45 20 Z"
            fill={stampImageUrl && isFilled ? "url(#stampPattern)" : fillColor}
            stroke={strokeColor}
            strokeWidth="2"
          />
        </svg>
      ),
      square: (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            {stampImageUrl && (
              <pattern id="stampPattern" x="0" y="0" width="1" height="1">
                <image href={stampImageUrl} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>
          <rect x="10" y="10" width="80" height="80" rx="12" fill={stampImageUrl && isFilled ? "url(#stampPattern)" : fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
      ),
      hexagon: (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            {stampImageUrl && (
              <pattern id="stampPattern" x="0" y="0" width="1" height="1">
                <image href={stampImageUrl} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>
          <path
            d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
            fill={stampImageUrl && isFilled ? "url(#stampPattern)" : fillColor}
            stroke={strokeColor}
            strokeWidth="2"
          />
        </svg>
      )
    };

    return (
      <div className="relative w-full h-full">
        {shapes[shape]}
        {isReward && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-[8px] text-center px-1 leading-tight drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              {rewardText}
            </span>
          </div>
        )}
        {isFilled && !isReward && !stampImageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={16} className="text-white animate-pulse" />
          </div>
        )}
      </div>
    );
  };

  const getPerkForStamp = (stampNumber: number) => {
    return currentCardPerks.find(p => p.stampNumber === stampNumber);
  };

  const logoUrl = currentCard?.logo ? `/${currentCard.logo}` : null;
  const backgroundImageUrl = currentCard?.backgroundImage ? `/${currentCard.backgroundImage}` : null;

  if (!cardTemplates || cardTemplates.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <nav className="flex gap-8">
                <button className="text-black font-semibold border-b-2 border-black pb-1">
                  Home
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
           

                 <DropdownMenu>
  <DropdownMenuTrigger>
          <User className="w-5 h-5 text-gray-600 cursor-pointer" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={() => router.post('/customer/logout')}>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-bold text-black mb-8 sm:text-4xl text-xl">{customer} 👋</h1>
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No loyalty cards available yet.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <nav className="flex gap-8">
              <button className="text-black font-semibold border-b-2 border-black pb-1">
                Home
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleRecordStamp}
              className="bg-black text-white hover:bg-gray-800"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record Stamp
            </Button>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        

                      <DropdownMenu>
  <DropdownMenuTrigger>
          <User className="w-5 h-5 text-gray-600 cursor-pointer" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={() => router.post('/customer/logout')}>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
            </div>

            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="sm:text-4xl text-lg  font-bold text-black mb-8">
          {customer}  👋
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Loyalty Card with Carousel */}
          <Card className="lg:col-span-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">{currentCard.name.toUpperCase()}</CardTitle>
              {cardTemplates.length > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevCard}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-500">
                    {currentCardIndex + 1} / {cardTemplates.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextCard}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-3xl font-bold text-black mb-1">
                  {totalStamps} <span className="text-gray-400">/ {currentCard.stampsNeeded}</span>
                </div>
                <div className="text-sm text-gray-500">Total Stamps Accumulated</div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(totalStamps / currentCard.stampsNeeded) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* The Loyalty Card */}
              <div
                className="rounded-lg shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: currentCard.backgroundColor,
                  backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="p-6 backdrop-blur-sm" style={{ backgroundColor: backgroundImageUrl ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                  {/* Logo */}
                  {logoUrl && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={logoUrl} 
                        alt="Logo" 
                        className="h-16 w-16 object-cover rounded-full border-3 border-white shadow-xl" 
                      />
                    </div>
                  )}

                  {/* Heading */}
                  <h3
                    className="text-xl font-bold text-center mb-1 tracking-wider"
                    style={{ color: currentCard.textColor }}
                  >
                    {currentCard.heading}
                  </h3>

                  {/* Subheading */}
                  <p
                    className="text-center text-xs mb-5 opacity-90"
                    style={{ color: currentCard.textColor }}
                  >
                    {currentCard.subheading}
                  </p>

                  {/* Stamps Grid */}
                  <div className="grid grid-cols-5 gap-2 mb-4"> 
                    {Array.from({ length: currentCard.stampsNeeded }).map((_, index) => {
                      const stampNumber = index + 1;
                      const perk = getPerkForStamp(stampNumber);
                      const isFilled = index < totalStamps;
                      
                      return (
                        <div key={index} className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10">
                            <StampShape
                              shape={currentCard.stampShape}
                              isFilled={isFilled}
                              isReward={!!perk}
                              rewardText={perk?.reward}
                              color={perk ? perk.color : currentCard.stampColor}
                            />
                          </div>
                          <span className="text-[9px] font-medium" style={{ color: currentCard.textColor }}>
                            {stampNumber}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mechanics */}
                  <div className="bg-white/95 backdrop-blur rounded-lg p-3 mb-3 shadow-lg">
                    <p className="text-[10px] text-gray-800 text-center leading-relaxed">
                      {currentCard.mechanics}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t pt-2" style={{ borderColor: currentCard.textColor + '40' }}>
                    <p
                      className="text-center text-[9px] opacity-90 font-medium"
                      style={{ color: currentCard.textColor }}
                    >
                      {currentCard.footer}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Stamps for Current Card */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Stamps</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {currentCardStamps.length > 0 ? (
                <div className="space-y-4">
                  {currentCardStamps.map((stamp) => (
                    <div key={stamp.id} className="flex items-center gap-3 border-b pb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-black">{currentCard.name}</div>
                        <div className="text-xs text-gray-700">{formatDate(stamp.used_at)}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs mb-1 bg-green-100 text-green-800 hover:bg-green-100">
                          Success
                        </Badge>
                        <div className="text-xs text-gray-500">1 Stamp</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-gray-500">No stamps collected yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Awards Awaiting for Current Card */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Awards Awaiting</h2>
        </div>

        <Card className="border-gray-200">
          <CardContent className="p-6 space-y-4">
            {currentCardPerks.length > 0 ? (
              currentCardPerks.map((perk) => (
                <div key={perk.id} className="flex items-center border-b gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: perk.color }}
                  >
                    {perk.stampNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-black">{perk.reward}</h3>
                    <p className="text-xs text-gray-500">Unlock at {perk.stampNumber} stamps</p>
                    {perk.details && (
                      <p className="text-sm text-gray-600 mt-1">{perk.details}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-black">{perk.stampNumber}</span>
                      <span className="text-sm text-gray-500">Stamps</span>
                    </div>
                    {totalStamps >= perk.stampNumber && (
                      <Badge className="mt-2 bg-green-500 text-white hover:bg-green-600">
                        Unlocked!
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No rewards available for this card</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Method Selection Dialog */}
      <Dialog open={methodDialogOpen} onOpenChange={setMethodDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Stamp</DialogTitle>
            <DialogDescription>
              Choose how you want to record your stamp
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              onClick={handleScanQR}
              className="h-32 flex flex-col gap-3"
              variant="outline"
            >
              <Camera className="w-8 h-8" />
              <span>Scan QR Code</span>
            </Button>
            <Button
              onClick={handleManualEntry}
              className="h-32 flex flex-col gap-3"
              variant="outline"
            >
              <KeyboardIcon className="w-8 h-8" />
              <span>Enter Manually</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manual Entry Dialog */}
      <Dialog open={recordDialogOpen} onOpenChange={setRecordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Stamp Code</DialogTitle>
            <DialogDescription>
              Enter the code provided by the business
            </DialogDescription>
          </DialogHeader>
          <div onSubmit={handleSubmitCode}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Stamp Code</Label>
                <Input
                  id="code"
                  placeholder="Enter code here"
                  value={data.code}
                  onChange={(e) => setData('code', e.target.value)}
                  className="uppercase"
                  required
                />
                { errors.code && (
                  <div className="text-sm text-destructive">{errors.code}</div>
                ) }
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRecordDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitCode} disabled={processing}>
                {processing ? 'Recording...' : 'Record Stamp'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Scanner Dialog */}
      <Dialog open={scanDialogOpen} onOpenChange={(open) => {
        if (!open) stopCamera();
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Position the QR code within the frame
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-white rounded-lg"></div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Note: QR scanning functionality requires additional QR code detection library
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={stopCamera}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}