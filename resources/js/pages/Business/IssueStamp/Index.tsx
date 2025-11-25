import ModuleHeading from "@/components/module-heading";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StampCode {
  code: string;
  qr_url: string;
  created_at: string;
}

interface LoyaltyCard {
  id: number;
  name: string;
}

interface Props {
  code: {
    success: boolean;
    code: string;
    qr_url: string;
    created_at: string;
  };
  cards: LoyaltyCard[];
}

export default function Index({ code, cards }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>(
    cards.length > 0 ? cards[0].id.toString() : ""
  );
  const [error, setError] = useState<string | null>(null);

  const generateCode = () => {
    if (!selectedCardId) {
      setError("Please select a loyalty card");
      return;
    }

    setLoading(true);
    setError(null);

    router.get('/business/issue-stamp', { 
      loyalty_card_id: selectedCardId 
    });
    
    console.log('Code generation requested for card:', selectedCardId);
    setLoading(false);
  };

  const generateNewCode = () => {
    if (!selectedCardId) {
      setError("Please select a loyalty card");
      return;
    }

    setLoading(true);
    setError(null);

    router.get('/business/issue-stamp', { 
      loyalty_card_id: selectedCardId 
    });
    
    console.log('New code generation requested for card:', selectedCardId);
    setLoading(false);
  };

  return (
    <AppLayout>
      <Head title="Issue Stamp" />
      <div className="w-full max-w-2xl mx-auto sm:mt-6 md:mt-8 sm:px-6 lg:px-8">
        {!code.success ? (
          <div className="bg-white rounded-lg shadow p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="mb-4 sm:mb-6">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Ready to Issue a Stamp?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 px-2">
                Select a loyalty card and generate a unique code for your customer.
              </p>
            </div>

            {/* Loyalty Card Selection */}
            <div className="mb-6">
              <label htmlFor="loyalty-card" className="block text-sm font-medium text-gray-700 mb-2">
                Select Loyalty Card
              </label>
              {cards.length > 0 ? (
                <Select value={selectedCardId} onValueChange={setSelectedCardId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a loyalty card" />
                  </SelectTrigger>
                  <SelectContent>
                    {cards.map((card) => (
                      <SelectItem key={card.id} value={card.id.toString()}>
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                  No loyalty cards available. Please create a loyalty card first.
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={generateCode}
              disabled={loading || cards.length === 0}
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating..." : "Generate Code"}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 sm:p-8">
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-block p-2 bg-green-100 rounded-full mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                Code Generated Successfully
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Generated on {code.created_at}
              </p>
            </div>

            <div className="border-t border-b border-gray-200 py-4 sm:py-6 mb-4 sm:mb-6">
              <div className="flex justify-center mb-4 sm:mb-6">
                <img
                  src={code.qr_url}
                  alt="QR Code"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-2 border-gray-200 rounded-lg"
                />
              </div>

              <div className="text-center px-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Or enter code manually:
                </p>
                <div className="inline-block bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
                  <p className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-gray-900 tracking-wider break-all">
                    {code.code}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-yellow-800">
                    Important
                  </p>
                  <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                    This code will expire in 15 minutes if not used. Customer
                    must scan or enter the code in their app.
                  </p>
                </div>
              </div>
            </div>

            {/* Loyalty Card Selection for New Code */}
            <div className="mb-4">
              <label htmlFor="loyalty-card-new" className="block text-sm font-medium text-gray-700 mb-2">
                Select Loyalty Card for New Code
              </label>
              <Select value={selectedCardId} onValueChange={setSelectedCardId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a loyalty card" />
                </SelectTrigger>
                <SelectContent>
                  {cards.map((card) => (
                    <SelectItem key={card.id} value={card.id.toString()}>
                      {card.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateNewCode}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate New Code
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 px-2">
          <p>
            Customer should open their app and scan the QR code or enter the
            code manually.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}