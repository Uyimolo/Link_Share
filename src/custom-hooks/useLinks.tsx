import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { LinkType } from '@/types/types';
import { getUserLinks, saveUserLinks } from '../services/firestoreService';
import { toast } from 'sonner';

 const areLinksEqual = (arr1: LinkType[], arr2: LinkType[]) => {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((link1, index) => {
    const link2 = arr2[index];
    return (
      link1.id === link2.id &&
      link1.url === link2.url &&
      link1.title === link2.title
    );
  });
};

export const useLinks = () => {
  const { user } = useAuthContext();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [linksFromDb, setLinksFromDb] = useState<LinkType[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Compare the links state with the links from the database to update `isDirty`
    const validLinks = links.filter((link) => link.title && link.url);
    setIsDirty(!areLinksEqual(validLinks, linksFromDb));
  }, [links, linksFromDb]);

  useEffect(() => {
    if (user) {
      const unsubscribe = getUserLinks(user.uid, (fetchedLinks) => {
        setLinks(fetchedLinks);
        setLinksFromDb(fetchedLinks);
        setIsDirty(false);
      });

      // Cleanup Firestore listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const saveLinks = async (updatedLinks: LinkType[]) => {
    if (user) {
      if (isDirty) {
        try {
          await saveUserLinks(user.uid, updatedLinks);
          toast.success('Links saved successfully');
          setLinksFromDb(updatedLinks);
          setIsDirty(false);
        } catch (error) {
          console.error('Error saving links:', error);
          toast.error('Failed to save links');
        }
      } else {
        toast.warning('No changes detected');
      }
    }
  };

  return { links, setLinks, linksFromDb, saveLinks, isDirty };
};
