import React from 'react';
import { X, Moon, Sun, Globe, Bell, Shield, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl card-shadow w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-xl font-heading font-bold text-foreground">Paramètres</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Apparence
            </h3>
            <div className="bg-muted rounded-xl p-1 flex">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'bg-card text-foreground card-shadow'
                    : 'text-muted-foreground'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="font-medium">Clair</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-card text-foreground card-shadow'
                    : 'text-muted-foreground'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-medium">Sombre</span>
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Langue
            </h3>
            <button className="w-full flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Français</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Notifications push</span>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Sécurité
            </h3>
            <button className="w-full flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Changer le mot de passe</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
