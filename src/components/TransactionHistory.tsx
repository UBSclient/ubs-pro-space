import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export interface Transaction {
  id: string;
  date: string;
  label: string;
  amount: number;
  type: 'credit' | 'debit';
  status?: 'approved' | 'rejected';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onAddTransaction?: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 4);

  const formatAmount = (amount: number, type: 'credit' | 'debit') => {
    const formatted = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(Math.abs(amount));
    return type === 'credit' ? `+ ${formatted}` : `- ${formatted}`;
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-card rounded-2xl card-shadow overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-bold text-foreground">
          Historique des transactions
        </h3>
      </div>

      <div className="divide-y divide-border">
        {displayedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${
              transaction.status === 'rejected' ? 'bg-destructive/5' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.status === 'rejected'
                    ? 'bg-destructive/10 text-destructive'
                    : transaction.type === 'credit'
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {transaction.status === 'rejected' ? (
                  <AlertCircle className="w-5 h-5" />
                ) : transaction.type === 'credit' ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm md:text-base">
                  {transaction.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(transaction.date)}
                  {transaction.status === 'rejected' && (
                    <span className="ml-2 text-destructive font-medium">• Refusé</span>
                  )}
                </p>
              </div>
            </div>
            <span
              className={`font-semibold text-sm md:text-base ${
                transaction.status === 'rejected'
                  ? 'text-destructive line-through'
                  : transaction.type === 'credit'
                  ? 'text-success'
                  : 'text-destructive'
              }`}
            >
              {formatAmount(transaction.amount, transaction.type)}
            </span>
          </div>
        ))}
      </div>

      {transactions.length > 4 && (
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 py-2 text-primary font-medium hover:underline"
          >
            {showAll ? (
              <>
                Voir moins <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Voir tout ({transactions.length}) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
