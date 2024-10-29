'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../../config/firebase';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Add empty dependency array to run effect only on mount

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user; // Get the new user

      // Hash the UID after ensuring the user is created
      const hashedUID = nanoid(10);

      // Save the user profile in Firestore
      await setDoc(
        doc(db, 'users', newUser.uid),
        {
          uid: {
            hashedUID: hashedUID,
            originalUID: newUser.uid,
          },
        },
        { merge: true }
      );

      setUser(newUser);
      toast.success('Account created successfully');
    } catch (error) {
      console.error('Registration error', error);
      // Handle specific error types for better user feedback
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          toast.error('Invalid email address.');
        } else if (error.code === 'auth/user-not-found') {
          toast.error('User not found.');
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password.');
        } else {
          toast.error('Failed to create account. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Signin error', error);
      toast.error('Sign in failed. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error while logging out', error);
      toast.error('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
