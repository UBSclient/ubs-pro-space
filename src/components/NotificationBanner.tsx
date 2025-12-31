import React, { useState } from 'react';
import { X, Rocket } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4 card-shadow">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Rocket className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm md:text-base text-foreground">
          <span className="font-semibold">Nouveauté :</span> découvrez l'impact environnemental de vos dépenses professionnelles !
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
        aria-label="Fermer la notification"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
};
