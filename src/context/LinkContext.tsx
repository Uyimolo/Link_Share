import { LinkType } from "@/types/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { fetchDocumentData, saveUserLinks } from "@/services/firestoreService";
import { toast } from "sonner";
import { db } from "../../config/firebase";
import { doc } from "firebase/firestore";

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

type LinkContextType = {
  links: LinkType[] | null;
  setLinks: (links: LinkType[]) => void;
  linksFromDb: LinkType[] | null;
  saveLinks: (links: LinkType[]) => void;
  deleteLink: (linkId: string, userId: string) => void;
  isDirty: boolean;
  loading: boolean;
};
const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinkContext must be used within an AuthProvider");
  }
  return context;
};

export const LinkProvider = ({ children }: { children: ReactNode }) => {
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

  const deleteLink = async (linkId: string, userId: string) => {
    const updatedLinks = links?.filter(
      (link) => link.id !== linkId,
    ) as LinkType[];
    try {
      await saveUserLinks(userId, updatedLinks);
      setLinks(updatedLinks);
      setLinksFromDb(updatedLinks);
      setIsDirty(false);
      toast.success("Link deleted successfully");
    } catch {
      // console.error('Error deleting link:', error);
      toast.error("Failed to delete link");
    }
  };

  return (
    <LinkContext.Provider
      value={{
        links,
        setLinks,
        linksFromDb,
        saveLinks,
        isDirty,
        loading,
        deleteLink,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
