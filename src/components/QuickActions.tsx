import React from 'react';
import { Send, FileText, Settings, MessageCircle } from 'lucide-react';

interface QuickActionsProps {
  onTransfer: () => void;
  onInvoice: () => void;
  onSettings: () => void;
  onAssistance: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onTransfer,
  onInvoice,
  onSettings,
  onAssistance,
}) => {
  const actions = [
    {
      icon: Send,
      label: 'Virement',
      onClick: onTransfer,
      bgClass: 'bg-primary',
    },
    {
      icon: FileText,
      label: 'Facture',
      onClick: onInvoice,
      bgClass: 'bg-foreground',
    },
    {
      icon: Settings,
      label: 'Paramètres',
      onClick: onSettings,
      bgClass: 'bg-primary',
    },
    {
      icon: MessageCircle,
      label: 'Assistance',
      onClick: onAssistance,
      bgClass: 'bg-foreground',
    },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-3 md:grid md:grid-cols-4 min-w-max md:min-w-0">
        {actions.map((action, index) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`flex flex-col items-center gap-2 p-4 min-w-[100px] md:min-w-0 rounded-xl ${action.bgClass} text-card hover:opacity-90 transition-all duration-300 hover:scale-105 card-shadow`}
            style={{ animationDelay: `${index * 0.1}s` }}
            aria-label={action.label}
          >
            <action.icon className="w-6 h-6" />
            <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
