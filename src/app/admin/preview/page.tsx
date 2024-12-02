"use client";
import PreviewLinksAndProfile from "@/components/preview/PreviewLinksAndProfile";
import { useAuthContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import React from "react";

import { motion } from "motion/react";

const Preview = () => {
  const { profileInfo } = useProfileInfo();
  const { loading } = useAuthContext();
  const { links } = useLinkContext();
  useProtectedRoute(true);

  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Animate gradient position
      transition: {
        duration: 8, // Smooth and slow animation
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      variants={gradientVariants}
      className="mx-4 rounded-xl lg:mx-0 lg:rounded-none"
    >
      {/* <Heading variant="h1" className="px-4 pt-6">
        Preview
      </Heading> */}

      <PreviewLinksAndProfile
        isPublic={false}
        links={links}
        loading={loading}
        profileInfo={profileInfo}
      />
    </motion.div>
  );
};

export default Preview;
