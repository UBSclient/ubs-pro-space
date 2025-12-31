import React from 'react';
import { UBSLogo } from './icons/UBSLogo';
import {
  X,
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onLogout,
  currentPage,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'card', label: 'Carte', icon: CreditCard },
    { id: 'investments', label: 'Investissements', icon: TrendingUp },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'help', label: 'Aide', icon: HelpCircle },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-foreground/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-card z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Menu principal"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <UBSLogo size="sm" />
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
