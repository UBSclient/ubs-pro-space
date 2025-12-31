import React, { useState } from 'react';
import { X, CheckCircle, Zap, Phone, Wifi, Droplets } from 'lucide-react';

interface Invoice {
  id: string;
  provider: string;
  amount: number;
  icon: React.ElementType;
  dueDate: string;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: (amount: number) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  onPay,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '1', provider: 'EDF', amount: 89.50, icon: Zap, dueDate: '15/01/2026' },
    { id: '2', provider: 'Orange', amount: 49.99, icon: Phone, dueDate: '20/01/2026' },
    { id: '3', provider: 'Free Mobile', amount: 19.99, icon: Wifi, dueDate: '25/01/2026' },
    { id: '4', provider: 'Veolia', amount: 45.00, icon: Droplets, dueDate: '28/01/2026' },
  ]);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [paidIds, setPaidIds] = useState<string[]>([]);

  const handlePay = async (invoice: Invoice) => {
    setPayingId(invoice.id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onPay(-invoice.amount);
    setPaidIds([...paidIds, invoice.id]);
    setPayingId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl card-shadow w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Mes factures
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {invoices.map((invoice) => {
            const isPaid = paidIds.includes(invoice.id);
            const isPaying = payingId === invoice.id;

            return (
              <div
                key={invoice.id}
                className={`p-4 rounded-xl border ${
                  isPaid ? 'border-success/30 bg-success/5' : 'border-border bg-muted/50'
                } flex items-center justify-between`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isPaid ? 'bg-success/10' : 'bg-primary/10'
                    }`}
                  >
                    {isPaid ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <invoice.icon className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{invoice.provider}</p>
                    <p className="text-sm text-muted-foreground">
                      Échéance : {invoice.dueDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground mb-1">
                    {invoice.amount.toLocaleString('fr-FR')} €
                  </p>
                  {isPaid ? (
                    <span className="text-sm text-success font-medium">Payée</span>
                  ) : (
                    <button
                      onClick={() => handlePay(invoice)}
                      disabled={isPaying}
                      className="px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg font-medium hover:bg-primary/90 disabled:opacity-70 transition-colors"
                    >
                      {isPaying ? 'Paiement...' : 'Payer'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
