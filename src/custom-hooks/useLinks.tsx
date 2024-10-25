// hooks/useLinks.ts
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { LinkType } from '@/types/types';
import { getUserLinks, saveUserLinks } from '../services/firestoreService';

export const useLinks = () => {
  const { user } = useAuthContext();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [linksFromDb, setLinksFromDb] = useState<LinkType[]>([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = getUserLinks(user.uid, (fetchedLinks) => {
        setLinks(fetchedLinks);
        setLinksFromDb(fetchedLinks);
      });

      // Cleanup Firestore listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const saveLinks = async (updatedLinks: LinkType[]) => {
    if (user) {
      await saveUserLinks(user.uid, updatedLinks);
    }
  };

  return { links, setLinks, linksFromDb, saveLinks };
};
