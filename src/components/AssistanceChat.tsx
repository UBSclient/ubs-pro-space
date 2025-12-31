import React, { useState } from 'react';
import { X, Send, ArrowLeft, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AssistanceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssistanceChat: React.FC<AssistanceChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bienvenue sur l\'assistance UBS. Comment pouvons-nous vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Merci pour votre message. Un conseiller va prendre en charge votre demande dans les plus brefs délais.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl card-shadow w-full max-w-md h-[600px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-primary text-primary-foreground rounded-t-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-heading font-bold">Assistance UBS</h2>
              <p className="text-sm text-primary-foreground/70">En ligne</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-muted text-foreground rounded-tl-none'
                    : 'bg-primary text-primary-foreground rounded-tr-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.isBot ? 'text-muted-foreground' : 'text-primary-foreground/70'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Votre message..."
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              aria-label="Envoyer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
