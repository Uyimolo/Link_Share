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
import { auth, db, storage } from '../../config/firebase';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { deleteObject, ref } from 'firebase/storage';
import { ProfileDetails } from '@/types/types';
import { getErrorMessage } from '@/data/firebaseErrors';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  registerNewUser: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  handleAccountDeletion: (profileInfo: ProfileDetails) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const { profileInfo } = useProfileInfo();

  // Monitors auth state changes and sets current user
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
  }, []);

  const registerNewUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      // creates a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;

      // Hashes the user id
      const hashedUID = nanoid(10);

      // Saves the user profile in Firestore for use in the public page
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
      const firebaseError = error as FirebaseError;
      const errorMessage = getErrorMessage(firebaseError.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        setUser(auth.currentUser);
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error('Signin error', error);
      const firebaseError = error as FirebaseError;
      const errorMessage = getErrorMessage(firebaseError.code);
      toast.error(errorMessage);
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

  const handleAccountDeletion = async (profileInfo: ProfileDetails) => {
    const user = auth.currentUser;
    if (!user) return;

    const userId = user.uid;

    try {
      // Step 1: Delete profile picture
      if (profileInfo?.profilePicture) {
        const pictureRef = ref(storage, profileInfo.profilePicture);
        await deleteObject(pictureRef);
        console.log('Profile picture deleted.');
      }

      // Step 2: Delete Firestore user document
      const documentRef = doc(db, 'users', userId);
      deleteDoc(documentRef);
      console.log('User document deleted.');
      toast.success('Data deleted successfully');

      // Step 3: Delete Firebase Authentication user account
      await user.delete();
      console.log('User account deleted.');
      toast.success('Account deleted successfully.');

      // Redirect or show success message as needed
    } catch (error) {
      console.error('Error during account deletion:', error);
      // Optional: Show error message to user or retry mechanism
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerNewUser,
        login,
        logout,
        handleAccountDeletion,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
