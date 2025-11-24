import ModuleHeading from "@/components/module-heading";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Sparkles, ArrowLeft, Edit, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Show({ cardTemplate }) {
  const getPerkForStamp = (stampNumber) => {
    return cardTemplate.perks?.find(p => p.stampNumber === stampNumber);
  };

  const StampShape = ({ shape, isFilled, isReward, rewardText, color, details }) => {
    const fillColor = isFilled ? (cardTemplate.stampFilledColor || color) : cardTemplate.stampEmptyColor;
    const strokeColor = isFilled ? '#FFFFFF' : '#D1D5DB';
    const stampImageUrl = cardTemplate.stampImage ? `/${cardTemplate.stampImage}` : null;

    const shapes = {
      circle: (
        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg transition-all duration-300 hover:scale-110 w-full h-full">
          <defs>
            {stampImageUrl && (
              <pattern id="stampPattern" x="0" y="0" width="1" height="1">
                <image href={stampImageUrl} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>
          <circle cx="50" cy="50" r="45" fill={stampImageUrl && isFilled ? "url(#stampPattern)" : fillColor} stroke={strokeColor} strokeWidth="3" />
        </svg>
      ),
      star: (
        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg transition-all duration-300 hover:scale-110 w-full h-full">
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
            strokeWidth="3"
          />
        </svg>
      ),
      square: (
        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg transition-all duration-300 hover:scale-110 w-full h-full">
          <defs>
            {stampImageUrl && (
              <pattern id="stampPattern" x="0" y="0" width="1" height="1">
                <image href={stampImageUrl} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>
          <rect x="10" y="10" width="80" height="80" rx="12" fill={stampImageUrl && isFilled ? "url(#stampPattern)" : fillColor} stroke={strokeColor} strokeWidth="3" />
        </svg>
      ),
      hexagon: (
        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg transition-all duration-300 hover:scale-110 w-full h-full">
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
            strokeWidth="3"
          />
        </svg>
      )
    };

    return (
      <div className="relative group">
        {shapes[shape]}
        {isReward && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xs text-center px-1 leading-tight drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {rewardText}
            </span>
          </div>
        )}
        {isFilled && !isReward && !stampImageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={24} className="text-white animate-pulse" />
          </div>
        )}
        {/* Hover Tooltip for Details */}
        {isReward && details && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-4 shadow-xl whitespace-nowrap max-w-[250px] text-center">
              <div className="font-bold mb-1">{rewardText}</div>
              <div className="text-gray-300 text-xs">{details}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const logoUrl = cardTemplate.logo ? `/${cardTemplate.logo}` : null;
  const backgroundImageUrl = cardTemplate.backgroundImage ? `/${cardTemplate.backgroundImage}` : null;

  return (
    <AppLayout>
      <Head title={`${cardTemplate.heading} - Card Template`} />
      <ModuleHeading 
        title="Card Template Preview" 
        description="This is how customers will see your loyalty card"
      />

      <div className="mt-6 md:mt-8 lg:mt-10">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link href="/business/card-templates">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
          </Link>
          <Link href={`/business/card-templates/${cardTemplate.id}/edit`}>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Template
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </Button>
        </div>

        {/* Card Display */}
        <div className="flex justify-center items-center min-h-[70vh] py-8">
          <Card className="w-full max-w-2xl overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div
                className="rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundColor: cardTemplate.backgroundColor,
                  backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="p-8 sm:p-10 md:p-12 lg:p-16 backdrop-blur-sm" style={{ backgroundColor: backgroundImageUrl ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                  {/* Logo */}
                  {logoUrl && (
                    <div className="flex justify-center mb-6">
                      <img 
                        src={logoUrl} 
                        alt="Logo" 
                        className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full border-4 border-white shadow-2xl" 
                      />
                    </div>
                  )}

                  {/* Heading */}
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 tracking-wider"
                    style={{ color: cardTemplate.textColor }}
                  >
                    {cardTemplate.heading}
                  </h1>

                  {/* Subheading */}
                  <p
                    className="text-center text-base sm:text-lg md:text-xl mb-10 opacity-90"
                    style={{ color: cardTemplate.textColor }}
                  >
                    {cardTemplate.subheading}
                  </p>

                  {/* Stamps Grid */}
                  <div className="grid grid-cols-5 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10">
                    {Array.from({ length: cardTemplate.stampsNeeded }).map((_, index) => {
                      const stampNumber = index + 1;
                      const perk = getPerkForStamp(stampNumber);
                      // Show empty stamps in preview (customer view starts with 0 stamps)
                      const isFilled = false;
                      
                      return (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20">
                            <StampShape
                              shape={cardTemplate.stampShape}
                              isFilled={isFilled}
                              isReward={!!perk}
                              rewardText={perk?.reward}
                              color={perk ? perk.color : cardTemplate.stampColor}
                              details={perk?.details}
                            />
                          </div>
                          <span className="text-xs sm:text-sm md:text-base font-medium" style={{ color: cardTemplate.textColor }}>
                            {stampNumber}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mechanics */}
                  <div className="bg-white/95 backdrop-blur rounded-xl p-5 md:p-6 mb-6 md:mb-8 shadow-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 text-center">How it Works</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-800 text-center leading-relaxed">
                      {cardTemplate.mechanics}
                    </p>
                  </div>

                  {/* Rewards Summary */}
                  {cardTemplate.perks && cardTemplate.perks.length > 0 && (
                    <div className="bg-white/90 backdrop-blur rounded-xl p-5 md:p-6 mb-6 md:mb-8 shadow-lg">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">Rewards</h3>
                      <div className="space-y-2">
                        {cardTemplate.perks.map((perk, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                style={{ backgroundColor: perk.color }}
                              >
                                {perk.stampNumber}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{perk.reward}</p>
                                {perk.details && (
                                  <p className="text-xs text-gray-600">{perk.details}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t pt-5 md:pt-6" style={{ borderColor: cardTemplate.textColor + '40' }}>
                    <p
                      className="text-center text-xs sm:text-sm md:text-base opacity-90 font-medium"
                      style={{ color: cardTemplate.textColor }}
                    >
                      {cardTemplate.footer}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 max-w-2xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer View</h4>
                  <p className="text-sm text-gray-700">
                    This is exactly how your customers will see their loyalty card. All stamps start empty, 
                    and they'll fill up as customers earn rewards. Share your QR code to let customers access their digital loyalty cards!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}