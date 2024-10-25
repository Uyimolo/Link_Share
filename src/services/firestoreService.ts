// services/firestoreService.ts
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { LinkType } from '@/types/types';
import { db } from '../../config/firebase';
import { toast } from 'sonner';

// Fetch user's links from Firestore
export const getUserLinks = (
  userId: string,
  onLinksFetched: (links: LinkType[]) => void
) => {
  const userDocRef = doc(db, 'users', userId);

  const unsubscribe = onSnapshot(
    userDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        onLinksFetched(data.links || []);
      } else {
        console.log('No such document!');
        onLinksFetched([]);
      }
    },
    (error) => {
      console.error('Error fetching document:', error);
    }
  );

  return unsubscribe;
};

// Save links to Firestore
export const saveUserLinks = async (userId: string, links: LinkType[]) => {
  const userDocRef = doc(db, 'users', userId);

  try {
    await setDoc(
      userDocRef,
      {
        links: links,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log('Links saved successfully');
  } catch (error) {
    console.error('Error saving links:', error);
    toast.error('Error saving links');
  }
};
