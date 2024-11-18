"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { LinkType } from "@/types/types";
import {
  fetchDocumentData,
  // getUserLinks,
  saveUserLinks,
} from "../services/firestoreService";
import { toast } from "sonner";
import { doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const areLinksEqual = (
  arr1: LinkType[] | null,
  arr2: LinkType[] | null,
) => {
  if (arr1?.length !== arr2?.length) {
    return false;
  }

  if (arr1 && arr2) {
    return arr1.every((link1, index) => {
      const link2 = arr2[index];
      return (
        link1.id === link2.id &&
        link1.url === link2.url &&
        link1.title === link2.title
      );
    });
  }
};

export const useLinks = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<LinkType[] | null>([]);
  const [linksFromDb, setLinksFromDb] = useState<LinkType[] | null>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Compare offline links state to links saved database to update isDirty state
    const validLinks = links?.filter((link) => link.title && link.url) || [];

    if (linksFromDb) {
      setIsDirty(!areLinksEqual(validLinks, linksFromDb));
    }
  }, [links, linksFromDb]);

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchDocumentData(
        doc(db, "links", user.uid),
        (fetchedLinks) => {
          if (fetchedLinks) {
            setLinks(fetchedLinks?.links);
            setLinksFromDb(fetchedLinks?.links);
          } else {
            setLinks([]);
            setLinksFromDb([]);
          }
          setLoading(false);
        },
      );

      return () => unsubscribe();
    }
  }, [user]);

  const saveLinks = async (updatedLinks: LinkType[]) => {
    if (user) {
      // (isDirty) means there are unsaved changes
      if (isDirty) {
        try {
          await saveUserLinks(user.uid, updatedLinks);
          toast.success("Links saved successfully");
          setLinksFromDb(updatedLinks);

          // once links from db and the offline links are the same isDirty should be updated to false
          setIsDirty(false);
        } catch {
          // console.error('Error saving links:', error);
          toast.error("Failed to save links");
        }
      } else {
        toast.warning("No changes detected");
      }
    }
  };

  return { links, setLinks, linksFromDb, saveLinks, isDirty, loading };
};
