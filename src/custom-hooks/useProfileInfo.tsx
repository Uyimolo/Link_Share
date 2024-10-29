import { useAuthContext } from '@/context/AuthContext';
import {
  getProfileInfo,
  saveProfileDetails,
  saveProfilePicture,
} from '@/services/firestoreService';
import { ProfileDetails } from '@/types/types';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { storage } from '../../config/firebase';

const useProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileDetails>({
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(profileInfo);
  }, [profileInfo]);

  useEffect(() => {
    if (user) {
      const unsubscribe = getProfileInfo(user.uid, (profileInfo) => {
        setProfileInfo(profileInfo);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const saveProfileInformation = async (
    file: File,
    firstName: string,
    lastName: string,
    email?: string
  ) => {
    if (loading) {
      toast.error(
        'Profile information is still loading. Please try again in a moment.'
      );
      return;
      }
      
    if (user) {
      try {
        // Delete the existing profile picture if it exists
        if (profileInfo.profilePicture) {
          const oldPictureRef = ref(storage, profileInfo.profilePicture);
          await deleteObject(oldPictureRef);
          console.log('Old profile picture deleted successfully');
        }

        // Wait for the new file upload and URL retrieval to complete
        const { fileURL, downloadProgress } = await saveProfilePicture(file);
        setDownloadProgress(downloadProgress);

        // Save profile details to Firestore after downloadURL is available
        await saveProfileDetails(
          { profilePicture: fileURL, firstName, lastName, email },
          user.uid
        );
        toast.success('Profile information updated successfully');
      } catch (error) {
        console.error('Error updating profile information', error);
        toast.error('Error updating profile information');
      }
    }
  };

  return { profileInfo, downloadProgress, saveProfileInformation };
};

export default useProfileInfo;
