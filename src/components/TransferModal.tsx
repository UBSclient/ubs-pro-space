import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (amount: number) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onTransfer,
}) => {
  const [formData, setFormData] = useState({
    beneficiaryLastName: '',
    beneficiaryFirstName: '',
    amount: '',
    iban: '',
    swift: '',
    label: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onTransfer(-amount);
    setIsProcessing(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        beneficiaryLastName: '',
        beneficiaryFirstName: '',
        amount: '',
        iban: '',
        swift: '',
        label: '',
      });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl card-shadow w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Nouveau virement
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
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Virement effectué !
              </h3>
              <p className="text-muted-foreground">
                Virement de {parseFloat(formData.amount).toLocaleString('fr-FR')} € effectué avec succès.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Nom du bénéficiaire
                  </label>
                  <input
                    type="text"
                    value={formData.beneficiaryLastName}
                    onChange={(e) =>
                      setFormData({ ...formData, beneficiaryLastName: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Prénom du bénéficiaire
                  </label>
                  <input
                    type="text"
                    value={formData.beneficiaryFirstName}
                    onChange={(e) =>
                      setFormData({ ...formData, beneficiaryFirstName: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Montant (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  IBAN
                </label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Code SWIFT
                </label>
                <input
                  type="text"
                  value={formData.swift}
                  onChange={(e) => setFormData({ ...formData, swift: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Libellé
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Traitement en cours…
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Effectuer le virement
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
