"use client";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import MockPreviewCard from "./MockPreviewCard";
import Paragraph from "../text/Paragraph";
import cn from "@/utilities/cn";
import { RxAvatar } from "react-icons/rx";
import { useAuthContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import { usePathname } from "next/navigation";

const MockupPreview = () => {
  const { links, loading } = useLinkContext();
  const { profileInfo } = useProfileInfo();

  // provides fallback incase no profile info is returned
  const emptyProfileObject = {
    firstName: "",
    lastName: "",
    profilePicture: "",
    email: "",
  };

  const { profilePicture, bio } = profileInfo || emptyProfileObject;
  const { username } = useAuthContext();

  const pathname = usePathname();

  // if loading links or the admin is accessing the analytics or preview pages, do not render the mockup
  if (
    pathname === "/admin/analytics" ||
    pathname === "/admin/preview" ||
    loading
  ) {
    return;
  }

  return (
    <>
      <div
        className={cn(
          "top-24 z-30 mx-auto aspect-[9/18] h-[80vh] max-h-[500px] w-[calc(100vw-32px)] max-w-[260px] rounded-[30px] from-black to-black/70 p-1 shadow-xl shadow-black/40 dark:from-deepBlue dark:to-blue lg:sticky lg:top-20 lg:max-w-[240px] lg:bg-gradient-to-tr lg:shadow-black/70 xl:max-h-[550px] xl:max-w-[260px] 2xl:max-w-[280px]",
        )}
      >
        {/* bezels */}
        <>
          <div className="absolute -right-1 top-20 hidden h-8 w-1 rounded-r-md bg-black shadow-lg shadow-black lg:block"></div>
          <div className="absolute -right-1 top-[125px] hidden h-8 w-1 rounded-r-md bg-black shadow-lg shadow-black lg:block"></div>

          <div className="absolute -right-1 top-[40%] hidden h-8 w-1 -translate-y-1/2 rounded-r-md bg-black shadow-lg shadow-black lg:block"></div>
        </>

        {/* Mockup screen */}
        <div className="h-full overflow-hidden rounded-[25px] border-gray bg-white px-2 py-10 dark:bg-lighterGray lg:border lg:p-2">
          {/* camera notch */}
          <div className="mx-auto mb-6 hidden h-4 w-2/6 rounded-full border border-black bg-black lg:block"></div>

          {/* profile information */}
          <div className="mx-auto space-y-2">
            {/* profile image */}
            <div
              className={cn(
                "mx-auto aspect-square w-20 overflow-hidden",
                profilePicture
                  ? "rounded-full bg-cover bg-center"
                  : "grid place-content-center",
              )}
              style={{
                backgroundImage: profilePicture
                  ? `url(${profilePicture})`
                  : "none",
              }}
            >
              {!profilePicture && (
                <RxAvatar className="rounded-full text-[80px] text-gray" />
              )}
            </div>

            {/* username */}
            <div className="space-y-1">
              {username ? (
                <Paragraph className="text-center text-xs leading-none dark:text-darkGray lg:text-sm">
                  @{username}
                </Paragraph>
              ) : (
                <div className="mx-auto h-2 w-1/2 rounded bg-lighterGray"></div>
              )}

              {bio ? (
                <Paragraph className="rounded p-2 px-0 text-xs dark:text-darkGray xl:text-xs">
                  {bio}
                </Paragraph>
              ) : (
                <div className="mx-auto h-2 w-1/2 rounded bg-lighterGray"></div>
              )}
            </div>
          </div>

          {/* links */}
          <div className="pt-5">
            {links && links.length > 0 ? (
              <div className="custom-scrollbar h-[40vh] max-h-[500px] space-y-2 overflow-y-auto">
                {links.filter(link => link.isVisible).map((link, index) => (
                  <MockPreviewCard key={index} link={link} />
                ))}
              </div>
            ) : (
              <div className="space-y-2 pt-5">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="w-full bg-lighterGray p-5"></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MockupPreview;
