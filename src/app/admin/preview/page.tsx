"use client";
import PreviewLinksAndProfile from "@/components/preview/PreviewLinksAndProfile";
import { useAuthContext } from "@/context/AuthContext";
import { useLinks } from "@/custom-hooks/useLinks";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import React from "react";

const Preview = () => {
  const { profileInfo } = useProfileInfo();
  const { loading } = useAuthContext();
  const { links } = useLinks();
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
