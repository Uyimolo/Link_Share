'use client'
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import MockPreviewCard from "./MockPreviewCard";
import { useLinks } from "@/custom-hooks/useLinks";
import Paragraph from "../text/Paragraph";
import cn from "@/utilities/cn";
import { RxAvatar } from "react-icons/rx";
import { useAuthContext } from "@/context/AuthContext";

const MockupPreview = () => {
  const { links } = useLinks();
  const { profileInfo } = useProfileInfo();
  const { firstName, lastName, profilePicture, email } = profileInfo;
  const name = firstName && lastName ? `${firstName} ${lastName}` : "";
  const { username } = useAuthContext();

  return (
    <div className="sticky top-20 mx-auto aspect-[9/18] h-[80vh] max-h-[700px] rounded-[30px] bg-gradient-to-tr from-black to-black/70 p-1 shadow-xl shadow-black/70">
      {/* bezels */}
      <>
        <div className="absolute -right-1 top-20 h-8 w-1 rounded-r-md bg-black shadow-lg shadow-black"></div>
        <div className="absolute -right-1 top-[125px] h-8 w-1 rounded-r-md bg-black shadow-lg shadow-black"></div>

        <div className="absolute -right-1 top-[40%] h-8 w-1 -translate-y-1/2 rounded-r-md bg-black shadow-lg shadow-black"></div>
      </>

      {/* Mockup screen */}
      <div className="h-full overflow-hidden rounded-[25px] border border-gray bg-white p-3">
        {/* camera notch */}
        <div className="mx-auto mb-6 h-4 w-2/6 rounded-full border border-black bg-black"></div>

        {/* profile information */}
        <div className="mx-auto w-3/4 space-y-1">
          {name ? (
            <Paragraph className="text-center font-semibold capitalize text-darkGray lg:text-sm">
              {name}
            </Paragraph>
          ) : (
            <div className="h-2 w-full rounded bg-lighterGray"></div>
          )}
          {/* profile image */}
          <div
            className={cn(
              "mx-auto aspect-square w-20",
              profilePicture
                ? "rounded-full border-4 border-blue bg-cover bg-center"
                : "grid place-content-center",
            )}
            style={{
              backgroundImage: profilePicture
                ? `url(${profilePicture})`
                : "none",
            }}
          >
            {!profilePicture && (
              <RxAvatar className="rounded-full bg-lightestGray text-[110px] text-gray" />
            )}
          </div>

          {/* name and email */}
          <div className="">
            {username ? (
              <Paragraph className="text-center text-xs leading-none lg:text-sm">
                @{username}
              </Paragraph>
            ) : (
              <div className="mx-auto h-2 w-1/2 rounded bg-lighterGray"></div>
            )}

            {email ? (
              <Paragraph className="text-center text-xs xl:text-xs">
                {email}
              </Paragraph>
            ) : (
              <div className="mx-auto h-2 w-1/2 rounded bg-lighterGray"></div>
            )}
          </div>
        </div>

        {/* links */}
        <div className="pt-5">
          {links.length > 0 ? (
            <div className="custom-scrollbar h-[40vh] max-h-[600px] space-y-2 overflow-y-scroll">
              {links.map((link, index) => (
                <MockPreviewCard key={index} link={link} />
              ))}
            </div>
          ) : (
            <div className="space-y-2 pt-5">
              {[1, 2, 3, 4].map((placeholder, index) => (
                <div key={index} className="w-full bg-lighterGray p-5"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockupPreview;
