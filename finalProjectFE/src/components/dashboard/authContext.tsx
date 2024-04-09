import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  username: string;
  password: string; 
}
interface AuthContextType {
  user: User | null;
  login: (loginData: {email: string; username?: string; password: string}) => Promise<boolean>; 
  logout: () => void;
  isAuthenticated: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (loginData: {email: string; password: string}) => {
    // Backend login inteaction
    // not real email
    setUser({email: loginData.email, username: "testUser", password: loginData.password});
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
