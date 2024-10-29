import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { LinkType, ProfileDetails } from '@/types/types';
import { db, storage } from '../../config/firebase';
import { toast } from 'sonner';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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

export const getProfileInfo = (
  userId: string,
  onProfileInformationFetched: (profileInfo: ProfileDetails) => void
) => {
  const userDocRef = doc(db, 'users', userId);

  const emptyProfileInfo = {
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  const unsubscribe = onSnapshot(
    userDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        onProfileInformationFetched(data.profileInfo || emptyProfileInfo);
      } else {
        console.log('No such document!');
        onProfileInformationFetched(emptyProfileInfo);
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

export const saveProfilePicture = async (
  file: File
): Promise<{ fileURL: string; downloadProgress: number }> => {
  const storageRef = ref(
    storage,
    `${Math.floor(Date.now() + Math.random() * 10000)}` + file.name
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    let downloadProgress = 0;

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track progress percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        downloadProgress = progress;
      },
      (error) => {
        // Handle any errors that may occur
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        // Get download URL once upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
        resolve({ fileURL: downloadURL, downloadProgress });
      }
    );
  });
};

export const saveProfileDetails = async (
  profileInfo: ProfileDetails,
  userId: string
) => {
  const userDocRef = doc(db, 'users', userId);

  try {
    await setDoc(
      userDocRef,
      {
        profileInfo: profileInfo,
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

export const getHashedUID = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const docSnapShot = await getDoc(userRef);

  if (docSnapShot.exists()) {
    console.log('Document data:', docSnapShot.data());
    return docSnapShot.data().uid.hashedUID;
  } else {
    console.error('No such document!');
    return null;
  }
};

export const getUserPublicDetails = async (hashedUID: string | string[]) => {
  try {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where('uid.hashedUID', '==', hashedUID));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      console.log(userDoc.data());
      return { ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
};

export const getProfileInfoAndLinksForPublicPage = async (userId: string) => {
  const publicDocRef = doc(db, 'users', userId);
  const publicDocSnapShot = await getDoc(publicDocRef);
  if (!publicDocSnapShot.exists()) {
    console.error('No such document!');
    return null;
  }
  console.log(publicDocSnapShot.data());
  return {
    ...publicDocSnapShot.data()?.profileInfo,
    ...publicDocSnapShot.data()?.links,
  };
};
