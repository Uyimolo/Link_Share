'use client';
import { getUserPublicDetails } from '@/services/firestoreService';
import { LinkType, ProfileDetails } from '@/types/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import PreviewLinksAndProfile from '@/components/preview/PreviewLinksAndProfile';

interface PublicProfileData {
  profileInfo: ProfileDetails;
  links: LinkType[];
}

const UserProfileAndLinks = () => {
  const [profileData, setProfileData] = useState<PublicProfileData | null>(
    null
  );
  const params = useParams();

  const hashedUID = params.id;

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      if (hashedUID) {
        try {
          const originalUIDData = await getUserPublicDetails(hashedUID);
          if (originalUIDData) {
            const { profileInfo, links } = originalUIDData;

            setProfileData({ links: links, profileInfo: profileInfo });
          }
        } catch (error) {
          console.error('Error fetching profile and links:', error);
        }
      }
    };

    fetchProfileAndLinks();
  }, [hashedUID]);

  const { profileInfo, links } = profileData || {};

  return (
    <PreviewLinksAndProfile profileInfo={profileInfo} links={links} loading={!profileInfo} />
  )
};

export default UserProfileAndLinks;
