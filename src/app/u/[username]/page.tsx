"use client";
import { getUserPublicDetails } from "@/services/firestoreService";
import { LinkType, ProfileDetails } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import PreviewLinksAndProfile from "@/components/preview/PreviewLinksAndProfile";

interface PublicProfileData {
  profileInfo: ProfileDetails;
  links: LinkType[];
}

const UserProfileAndLinks = () => {
  const [profileData, setProfileData] = useState<PublicProfileData | null>(
    null,
  );
  const [userId, setUserId] = useState("");
  const params = useParams();

  const username = params.username;

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      if (username) {
        try {
          const originalUIDData = await getUserPublicDetails(username);
          if (originalUIDData) {
            const { profileInfo, links, uid } = originalUIDData;

            setProfileData({ links: links, profileInfo: profileInfo });
            setUserId(uid);
          }
        } catch (error) {
          console.error("Error fetching profile and links:", error);
        }
      }
    };

    fetchProfileAndLinks();
  }, [username]);

  const { profileInfo, links } = profileData || {};

  return (
    <PreviewLinksAndProfile
      isPublic={true}
      userId={userId}
      profileInfo={profileInfo}
      links={links}
      loading={!profileInfo}
    />
  );
};

export default UserProfileAndLinks;
