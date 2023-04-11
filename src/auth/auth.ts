import { createContext } from 'react';

interface AuthContextType {
  user: null;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});
