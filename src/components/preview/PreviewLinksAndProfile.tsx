"use client";
import MockPreviewCard from "../mockup-preview/MockPreviewCard";
import PreviewHeader from "./PreviewHeader";
import Loading from "../Loading";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { LinkType, ProfileDetails } from "@/types/types";
import { RxAvatar } from "react-icons/rx";
import cn from "@/utilities/cn";
import { saveAnalyticsData } from "@/services/firestoreService";
import { useAuthContext } from "@/context/AuthContext";

type PreviewLinksAndProfileProps = {
  links: LinkType[] | undefined;
  loading: boolean;
  profileInfo: ProfileDetails | undefined;
  isPublic: boolean;
  userId?: string;
};

const PreviewLinksAndProfile = ({
  links,
  loading,
  profileInfo,
  isPublic,
  userId,
}: PreviewLinksAndProfileProps) => {
  const { firstName, lastName, profilePicture, email } = profileInfo || {};
  const fullName = `${firstName || ""} ${lastName || ""}`;
  const { user } = useAuthContext();

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

  if (loading) {
    return (
      <div className="mx-auto h-screen w-full max-w-[1900px] p-4">
        {!user && !loading && <PreviewHeader />}
        <div className="z-60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 self-center justify-self-center">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen space-y-16 bg-white p-4 md:h-auto md:bg-transparent md:pb-80">
      {/* top section */}

      <PreviewHeader />

      {/*  bottom section */}
      <div className="relative space-y-8 md:mx-auto md:min-h-[500px] md:w-fit md:rounded-[24px] md:bg-white md:p-12 md:shadow-2xl">
        {/* profile image */}
        <div
          className={cn(
            "mx-auto aspect-square w-28",
            profilePicture
              ? "rounded-full border-4 border-blue bg-cover bg-center"
              : "grid place-content-center",
          )}
          style={{
            backgroundImage: profilePicture ? `url(${profilePicture})` : "none",
          }}
        >
          {!profilePicture && (
            <RxAvatar className="rounded-full bg-lightestGray text-[110px] text-gray" />
          )}
        </div>

        {/* name and email */}
        <div className="space-y-4">
          {/*  */}
          {fullName ? (
            <Heading
              variant="h1"
              className="text-center capitalize lg:text-2xl"
            >
              {fullName}
            </Heading>
          ) : (
            <div className="h-3 w-full rounded bg-lighterGray"></div>
          )}
          {email ? (
            <Paragraph className="text-center">{email}</Paragraph>
          ) : (
            <div className="mx-auto h-2 w-1/2 rounded bg-lighterGray"></div>
          )}
        </div>

        {/* links */}
        {links && links.length > 0 ? (
          <div className="mx-auto w-[237px] space-y-2">
            {links?.map((link, index) => (
              <MockPreviewCard
                onClick={() => handleLinkClick(link)}
                key={index}
                link={link}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto w-[237px] space-y-2 pt-10">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="w-[237px] bg-lighterGray p-5"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewLinksAndProfile;
