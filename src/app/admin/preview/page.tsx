"use client";
import PreviewLinksAndProfile from "@/components/preview/PreviewLinksAndProfile";
import { useAuthContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import React from "react";

const Preview = () => {
  const { profileInfo } = useProfileInfo();
  const { loading } = useAuthContext();
  const { links } = useLinkContext();
  useProtectedRoute(true);
  return (
    <>
      {
        <PreviewLinksAndProfile
          isPublic
          links={links}
          loading={loading}
          profileInfo={profileInfo}
        />
      }
    </>
  );
};

export default Preview;
