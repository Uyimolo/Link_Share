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
  updateDoc,
  increment,
  arrayUnion,
  deleteDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { AnalyticsData, LinkType, ProfileDetails } from "@/types/types";
import { db, storage } from "../../config/firebase";
import { toast } from "sonner";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import countries from "i18n-iso-countries";

import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
// countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

/**
 * Fetches the links for a specified user in real-time.
 * @param userId - The ID of the user whose links are being fetched.
 * @param onLinksFetched - Callback to handle fetched links data.
 * @returns Function to unsubscribe from the snapshot listener.
 */

export const fetchDocumentData = (
  docRef: DocumentReference<DocumentData, DocumentData>,
  onDataFetched: (data: Record<string, any> | null) => void,
) => {
  const unsubscribe = onSnapshot(
    docRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        onDataFetched(data);
      } else {
        // console.log('No such document!');
        onDataFetched(null);
      }
    },
    (error) => {
      console.error("Error fetching document:", error);
    },
  );

  return unsubscribe;
};

export const deleteLink = async (
  userId: string | undefined,
  linkId: string,
) => {
  if (userId) {
    const userDocRef = doc(db, "users", userId, "links", linkId);
    await deleteDoc(userDocRef);
  }
};

/**
 * Saves user's links to Firestore with timestamp.
 * @param userId - The ID of the user whose links are being saved.
 * @param links - Array of link objects to save.
 */
export const saveUserLinks = async (userId: string, links: LinkType[]) => {
  const userDocRef = doc(db, "links", userId);
  try {
    await setDoc(
      userDocRef,
      {
        links: links,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    // console.log('Links saved successfully');
  } catch {
    // console.error('Error saving links:', error);
    toast.error("Error saving links");
  }
};

/**
 * Uploads a profile picture to Firebase Storage and tracks progress.
 * @param file - The file to upload.
 * @returns Promise resolving with the file URL and upload progress.
 */
export const saveProfilePicture = async (
  file: File,
  userId: string,
): Promise<{ fileURL: string; downloadProgress: number }> => {
  // i am setting the filename to user.uid
  // so that the old profile picture will be automatically replaced with the new one.
  // hence making my database cleaner and more efficient
  const storageRef = ref(storage, `profile-images/${userId}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    let downloadProgress = 0;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress as a percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        downloadProgress = progress;
      },
      (error) => {
        // console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        // Retrieve download URL on successful upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // console.log('File available at', downloadURL);

        resolve({ fileURL: downloadURL, downloadProgress });
      },
    );
  });
};

/**
 * Saves user profile details to Firestore.
 * @param profileInfo - Profile details to save.
 * @param userId - The ID of the user whose profile details are being saved.
 */
export const saveProfileDetails = async (
  profileInfo: ProfileDetails,
  userId: string,
) => {
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(
      userDocRef,
      {
        profileInfo: profileInfo,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    // console.log('Profile details saved successfully');
  } catch {
    // console.error('Error saving profile details:', error);
    toast.error("Error saving profile details");
  }
};

/**
 * Retrieves the hashed UID for a specified user.
 * @param userId - The ID of the user whose hashed UID is being fetched.
 * @returns Promise resolving with the hashed UID or null if not found.
 */
export const getHashedUID = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const docSnapShot = await getDoc(userRef);

  if (docSnapShot.exists()) {
    // console.log('Document data:', docSnapShot.data());
    return docSnapShot.data().uid.hashedUID;
  } else {
    // console.error('No such document!');
    return null;
  }
};

/**
 * Retrieves public user details based on hashed UID.
 * @param username - The username to query.
 * @returns Promise resolving with the user details or null if not found.
 */
export const getUserPublicDetails = async (username: string | string[]) => {
  try {
    // QUERY DB FOR USER INFO (PROFILE, USER ID) WITH USERNAME
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid.username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      // GET USER ID AND QUERY FOR LINKS
      const userId = userDoc.data().uid.originalUID;
      const linkDoc = doc(db, "links", userId);
      const linksSnapshot = await getDoc(linkDoc);

      // GET LINKS DATA
      const links = linksSnapshot.exists()
        ? (linksSnapshot.data().links as LinkType[])
        : [];

      return {
        profileInfo: userDoc.data().profileInfo,
        uid: userDoc.data().uid.originalUID,
        links: links,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

const cache = new Map();
const getGeolocationInfo = async () => {
  if (cache.has("locationData")) return cache.get("locationData");

  const token = process.env.NEXT_PUBLIC_GEOLOCATION_TOKEN;
  const response = await fetch(`https://ipinfo.io/json?token=${token}`);
  const locationData = await response.json();

  const result = {
    ip: locationData.ip, // The user's IP address
    city: locationData.city,
    region: locationData.region,
    countryCode: locationData.country,
  };

  cache.set("locationData", result);
  return result;
};

export const saveAnalyticsData = async (userId: string, linkId: string) => {
  try {
    const geolocationInfo = await getGeolocationInfo();
    if (geolocationInfo) {
      const deviceType = /Mobi|Android/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop";
      const visitorId = geolocationInfo.ip;

      const docRef = doc(db, "analytics", userId, "links", linkId);
      const docSnap = await getDoc(docRef);

      const analyticsUpdate = {
        id: linkId,
        clickCount: increment(1),
        lastClickDate: serverTimestamp(),
        [`deviceType.${deviceType}`]: increment(1),
        clickTrends: arrayUnion(new Date()), // Adds recent click time
        uniqueVisitors: arrayUnion(visitorId),
      };

      if (docSnap.exists()) {
        await updateDoc(docRef, analyticsUpdate);

        await updateDoc(docRef, {
          [`clickLocations.${geolocationInfo.countryCode}`]: increment(1),
        });
      } else {
        await setDoc(
          docRef,
          {
            id: linkId,
            clickCount: 1,
            lastClickDate: new Date(),
            clickLocations: {
              [geolocationInfo?.countryCode]: 1,
            },
            clickTrends: [new Date()],
            deviceType: {
              mobile: deviceType === "mobile" ? 1 : 0,
              desktop: deviceType === "desktop" ? 1 : 0,
            },
            uniqueVisitors: [visitorId],
          },
          { merge: true },
        );
      }
    }
    console.log("Analytics data saved");
  } catch (error) {
    console.error("Error saving analytics data:", error);
    toast.error("Error saving analytics data");
  }
};

export const getAnalyticsData = (
  userId: string,
  onAnalyticsDataFetched: (analyticsData: AnalyticsData[] | null) => void,
) => {
  try {
    if (userId) {
      const analyticsCollectionRef = collection(
        db,
        "analytics",
        userId,
        "links",
      );

      const unsubscribe = onSnapshot(
        analyticsCollectionRef,
        (snapshot) => {
          const analyticsDataArray = snapshot.docs.map(
            (doc) => doc.data() as AnalyticsData,
          );

          onAnalyticsDataFetched(
            analyticsDataArray.length ? analyticsDataArray : null,
          );
        },
        (error) => {
          console.error("Error getting analytics data:", error);
          onAnalyticsDataFetched(null);
        },
      );
      return unsubscribe;
    }
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    onAnalyticsDataFetched(null);
  }

  return () => {};
};

export const deleteAnalyticsData = async (userId: string, linkId: string) => {
  try {
    if (linkId) {
      const analyticsRef = doc(db, "users", userId, "analytics", linkId);

      await deleteDoc(analyticsRef);
    } else {
      console.log("no link");
    }
  } catch (error) {
    console.error("Error deleting analytics data:", error);
  }
};
