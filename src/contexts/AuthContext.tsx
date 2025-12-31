import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  accountNumber: string;
  iban: string;
  bic: string;
  address: string;
  bankCode: string;
  branchCode: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  balance: number;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  name: 'SOPHIE PROVOST',
  accountNumber: 'CH93 0076 2011 6238 5295 7',
  iban: 'FR76 2573 3000 0100 0016 1501 27',
  bic: 'USBWCHZH80A',
  address: '25 Boulevard Longchamp 13001 Marseille France',
  bankCode: '25738',
  branchCode: '00011',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(730000);

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    if (username === '21679867' && password === '567888') {
      setIsAuthenticated(true);
      setUser(defaultUser);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, balance, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
