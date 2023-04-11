import { ReactNode, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from './auth';

const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(user ? true : false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
