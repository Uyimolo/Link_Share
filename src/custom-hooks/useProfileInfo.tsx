"use client";
import { useAuthContext } from "@/context/AuthContext";
import {
  fetchDocumentData,
  // getProfileInfo,
  saveProfileDetails,
  saveProfilePicture,
} from "@/services/firestoreService";
import { ProfileDetails } from "@/types/types";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { db } from "../../config/firebase";

/**
 * Custom hook to manage profile information.
 * This hook fetches and updates the user's profile information from Firestore.
 * It also provides a function to update the profile picture and details.
 *
 * @returns An object containing the profile information, download progress, and a function to update the profile information.
 */
const useProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileDetails>({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [isProfileDetailsSaving, setIsProfileDetailsSaving] = useState(false);

  // monitor and fetch profile info from firebase
  useEffect(() => {
    if (user) {
      const unsubscribe = fetchDocumentData(
        doc(db, "users", user.uid),
        (data) => {
          setProfileInfo(data?.profileInfo);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    }
  }, [user]);

  /**
   * Updates the user's profile information.
   * This function deletes the existing profile picture (if there is any), uploads the new file,
   * saves the profile details to Firestore, and updates the profile information.
   */

  // NOTE REFACTOR TO CHECK IF PROFILE PICTURE WAS CHANGED BEFORE UPLOADING, IF NOT GO STRAIGHT TO SAVING THE INFO IN FIRESTORE. THIS HELPS PREVENT UNNECESSARY STORAGE WRITES AND REWRITES
  const saveProfileInformation = async (
    file: File,
    firstName: string,
    lastName: string,
    email?: string,
    bio?: string,
  ) => {
    if (loading) {
      toast.error(
        "Profile information is still loading. Please try again in a moment.",
      );
      return;
    }

    if (user) {
      setIsProfileDetailsSaving(true);
      try {
        // if no file is a dummy file, dont upload (get download url from the profileInfo object instead)
        const { fileURL } =
          file.name === "dummy.txt"
            ? await saveProfilePicture(file, user.uid)
            : { fileURL: profileInfo.profilePicture };

        // Save profile details to Firestore
        await saveProfileDetails(
          { profilePicture: fileURL, firstName, lastName, email, bio },
          user.uid,
        );
        toast.success("Profile information updated successfully");
      } catch (error) {
        console.error("Error updating profile information", error);
        toast.error("Error updating profile information");
      }
      setIsProfileDetailsSaving(false);
    }
  };

  return {
    profileInfo,
    downloadProgress,
    saveProfileInformation,
    isProfileDetailsSaving,
  };
};

export default useProfileInfo;
