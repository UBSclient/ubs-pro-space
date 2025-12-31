import React, { useState } from 'react';
import { Eye, EyeOff, Wifi } from 'lucide-react';

interface BankCardProps {
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export const BankCard: React.FC<BankCardProps> = ({
  holderName,
  cardNumber,
  expiryDate,
  cvv,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formatCardNumber = (number: string) => {
    if (showDetails) {
      return number;
    }
    return number.replace(/\d(?=\d{4})/g, '•');
  };

  const formatExpiry = (date: string) => {
    if (showDetails) return date;
    return '••/••';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`flip-card w-full aspect-[1.586/1] cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        aria-label={isFlipped ? 'Voir le recto de la carte' : 'Voir le verso de la carte'}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      >
        <div className="flip-card-inner relative w-full h-full">
          {/* Front of Card */}
          <div className="flip-card-front absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground via-foreground/95 to-foreground/80 p-6 text-card flex flex-col justify-between card-shadow">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">UBS</span>
                </div>
                <span className="text-lg font-heading font-bold">UBS</span>
              </div>
              <Wifi className="w-6 h-6 rotate-90" />
            </div>

            {/* Chip */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-md">
                <div className="w-full h-full grid grid-cols-3 gap-0.5 p-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-yellow-600/30 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Card Number */}
            <div className="space-y-4">
              <p className="font-mono text-xl md:text-2xl tracking-wider">
                {formatCardNumber(cardNumber)}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-card/60 uppercase">Titulaire</p>
                  <p className="font-medium tracking-wide">{holderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-card/60 uppercase">Expire</p>
                  <p className="font-mono">{formatExpiry(expiryDate)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold italic text-card/90">VISA</span>
                  <span className="text-xs text-card/60">Business</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className="flip-card-back absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground via-foreground/95 to-foreground/80 flex flex-col card-shadow">
            {/* Magnetic Strip */}
            <div className="w-full h-12 bg-foreground/90 mt-6" />

            {/* Signature Strip & CVV */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-10 bg-muted/90 rounded flex items-center justify-end px-4">
                  <span className="font-mono text-foreground italic text-sm">
                    {holderName}
                  </span>
                </div>
                <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                  <span className="font-mono text-foreground font-bold">
                    {showDetails ? cvv : '•••'}
                  </span>
                </div>
              </div>

              <p className="text-card/60 text-xs mt-4 text-center">
                Cliquez pour retourner la carte
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-between items-center text-card/60 text-xs">
              <span>Service client: +41 44 234 1111</span>
              <span className="font-bold italic text-lg text-card/90">VISA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDetails(!showDetails);
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
        aria-label={showDetails ? 'Masquer les détails' : 'Afficher les détails'}
      >
        {showDetails ? (
          <>
            <EyeOff className="w-4 h-4" />
            Masquer les détails
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            Afficher les détails
          </>
        )}
      </button>
    </div>
  );
};
