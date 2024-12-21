"use client";
import MockPreviewCard from "../mockup-preview/MockPreviewCard";
// import PreviewHeader from "./PreviewHeader";

import Paragraph from "@/components/text/Paragraph";
import { LinkType, ProfileDetails } from "@/types/types";
import cn from "@/utilities/cn";
import { saveAnalyticsData } from "@/services/firestoreService";
import { useAuthContext } from "@/context/AuthContext";
import StaggeredRevealContainer from "../animation/StaggeredRevealContainer";
import StaggeredReveal from "../animation/StaggeredReveal";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CgMoreVertical } from "react-icons/cg";
import { toast } from "sonner";

type PreviewLinksAndProfileProps = {
  links: LinkType[] | null;
  loading: boolean;
  profileInfo: ProfileDetails | undefined;
  isPublic: boolean;
  userId?: string;
  publicUsername?: string | string[];
};

const PreviewLinksAndProfile = ({
  links,
  profileInfo,
  isPublic,
  userId,
  publicUsername,
}: PreviewLinksAndProfileProps) => {
  const { profilePicture } = profileInfo || {};
  const { username, user } = useAuthContext();

  const handleLinkClick = async (link: LinkType) => {
    try {
      if (userId && isPublic) {
        await saveAnalyticsData(userId, link.id);
        if (isPublic) {
          // window.open(link.url, "_blank");
        }
      } else {
        if (isPublic) {
          // window.open(link.url, "_blank");
        }
      }
    } catch (error) {
      console.error("Error saving analytics data:", error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="mx-auto h-screen w-full p-4">
  //       {!user && !loading && <PreviewHeader />}
  //       <div className="z-60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 self-center justify-self-center">
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "30% 70%", "0% 50%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const handleShareLink = async () => {
    if (!user) {
      toast.error("You need to be logged in to share your profile.");
      return;
    }

    // Define the user’s public profile URL based on users username
    const shareUrl = `https://linksharer.vercel.app/u/${username}`;

    // Check if navigator.share is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my Profile!`,
          text: `Here's a link to my link collection.`,
          url: shareUrl,
        });
        toast.success("Profile shared successfully!");
      } catch (error) {
        console.error("Error sharing profile:", error);
        toast.error("Failed to share profile.");
      }
    } else {
      // Fallback in case Web Share API is unsupported
      toast.info(
        "Sharing is not supported on this browser. Copy the link below:",
      );
      navigator.clipboard.writeText(shareUrl);
      toast.success("Profile link copied to clipboard!");
    }
  };

  return (
    <motion.div
      variants={gradientVariants}
      animate="animate"
      className={cn(
        "w-full space-y-4 px-4 lg:min-h-screen",
        isPublic
          ? "to-pink-400 min-h-screen bg-gradient-to-r from-deepBlue via-purple-800 bg-[length:200%_200%] pt-4 lg:bg-[length:300%_300%]"
          : "min-h-[80vh] rounded-xl bg-white pt-4 dark:bg-transparent lg:pt-10",
      )}
    >
      {/* top section */}
      {/* {isPublic && <PreviewHeader />} */}

      <div className="ml-auto mr-0 w-fit">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CgMoreVertical className="text text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {!isPublic && (
              <DropdownMenuItem onClick={handleShareLink}>
                Share link collection
              </DropdownMenuItem>
            )}
            {isPublic && userId === user?.uid ? (
              <>
                <DropdownMenuItem onClick={handleShareLink}>
                  Share link collection
                </DropdownMenuItem>
                <DropdownMenuItem className="grid">
                  report a problem
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem className="grid">
                  Join @{publicUsername} on Linkshare
                </DropdownMenuItem>
                <DropdownMenuItem className="grid">
                  Copy @{publicUsername} address
                </DropdownMenuItem>
                <DropdownMenuItem className="grid">
                  Report a problem
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/*  bottom section */}
      <div className="w-full space-y-10 rounded-xl py-6 pt-10">
        <div className="space-y-4">
          {/* profile image */}
          <div
            className={cn(
              "mx-auto aspect-square w-20",
              profilePicture
                ? "rounded-full bg-cover bg-center"
                : "grid place-content-center",
            )}
            style={{
              backgroundImage: profilePicture
                ? `url(${profilePicture})`
                : "none",
            }}
          ></div>

          {/* username*/}
          <div className="">
            {username && (
              <Paragraph
                className={cn(
                  "text-center",
                  isPublic ? "text-white" : "text-gray",
                )}
              >
                @{username}
              </Paragraph>
            )}
          </div>
        </div>

        {/* links */}
        {links && links.length > 0 && (
          <StaggeredRevealContainer className="mx-auto w-full max-w-2xl space-y-4">
            {links
              ?.filter((link) => link.isVisible)
              .map((link, index) => (
                <StaggeredReveal variants="slide down" key={index}>
                  <MockPreviewCard
                    onClick={() => handleLinkClick(link)}
                    link={link}
                    className={cn(
                      "rounded-2xl p-5",
                      !isPublic && "lg:dark:lighterNavy",
                    )}
                  />
                </StaggeredReveal>
              ))}
          </StaggeredRevealContainer>
        )}
      </div>
    </motion.div>
  );
};

export default PreviewLinksAndProfile;
