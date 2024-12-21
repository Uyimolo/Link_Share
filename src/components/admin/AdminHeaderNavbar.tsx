"use client";
import { NavItem as NavItemType } from "@/types/types";
import React, { useState } from "react";
import NavItem from "./navigation/NavItem";
import cn from "@/utilities/cn";

import ThemeSelector from "../ThemeSelector";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import Image from "next/image";
import Paragraph from "../text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import Confirm from "../Confirm";
import { ScrollArea } from "../ui/scroll-area";
import Button from "../Button";
import { TbLogout } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa6";

const AdminHeaderNavbar = ({
  navItems,
  setShowNavigation,
  showNavigation,
}: {
  navItems: NavItemType[];
  setShowNavigation: (showNavigation: boolean) => void;
  showNavigation: boolean;
}) => {
  const { profileInfo } = useProfileInfo();
  const { username, logout } = useAuthContext();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirmation(false);
  };

  const LogoutConfirmation = (
    <Confirm
      isOpen={showLogoutConfirmation}
      header="Are you sure you want to log out?"
      content="This action will log you out of your
          account."
      rejectAction={() => setShowLogoutConfirmation(false)}
      acceptAction={handleLogout}
    />
  );

  return (
    <>
      {/* overlay for slide in mobile navigation */}
      <div
        className={cn(
          "fixed left-0 top-0 grid h-screen w-full bg-veryLightBlue/50 transition duration-1000 dark:bg-darkGray/70",
          showNavigation
            ? "translate-x-0 lg:hidden"
            : "translate-x-full lg:hidden",
        )}
        onClick={() => setShowNavigation(false)}
      />

      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-4/5 max-w-[250px] space-y-1 bg-deepBlue transition duration-500 dark:bg-deepNavy lg:relative lg:z-0 lg:w-full lg:max-w-none",
          showNavigation
            ? "translate-x-0 lg:translate-x-0"
            : "translate-x-full lg:translate-x-0",
        )}
      >
        <ScrollArea className="h-screen">
          <RxHamburgerMenu
            className={cn(
              "absolute right-4 top-7 text-xl lg:hidden",
              showNavigation ? "text-white" : "text-darkGray dark:text-white",
            )}
            onClick={() => setShowNavigation(!showNavigation)}
          />

          <div>
            {/* profile picture and username */}
            <div className="mb-4 flex items-center gap-2 border-b border-lighterGray/10 px-4 pb-4 pt-12">
              {profileInfo && profileInfo.profilePicture !== "" ? (
                <Image
                  src={profileInfo?.profilePicture}
                  alt="display image"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              ) : (
                <div className="grid aspect-square h-10 w-10 place-content-center overflow-hidden rounded-full border">
                  <FaUser className="text-2xl text-white" />
                </div>
              )}

              <div className="w-fit xl:w-4/5">
                {profileInfo?.firstName || profileInfo?.lastName ? (
                  <div className="">
                    <Paragraph className="w-fit truncate text-xs text-white dark:text-white lg:mx-auto xl:mx-0">
                      Hello 👋
                    </Paragraph>
                    <Paragraph className="w-fit truncate text-white dark:text-white lg:mx-auto xl:mx-0">
                      {`${profileInfo.firstName && profileInfo.firstName} ${profileInfo.lastName && profileInfo.lastName[0]}.`}
                    </Paragraph>
                  </div>
                ) : (
                  <div className="">
                    <Paragraph className="w-fit truncate text-xs text-white dark:text-white lg:mx-auto xl:mx-0">
                      Hello 👋
                    </Paragraph>
                    {username ? (
                      <Paragraph className="w-fit truncate text-white dark:text-white lg:mx-auto xl:mx-0">
                        @{username}
                      </Paragraph>
                    ) : (
                      <div className="my-1.5 h-2 w-16 rounded bg-lighterGray/30"></div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                isLink={!!item.link}
                navItem={item}
                onClick={() => setShowNavigation(false)}
              />
            ))}{" "}
            {/* <div className="mt-10 h-40 w-full rounded-xl border border-white"></div> */}
            <div className="sticky bottom-4 mt-20 self-end">
              <div className="px- mt-4 w-full space-y-4 rounded-xl border-t border-lightestGray/10 px-4 py-4 2xl:mt-32">
                <ThemeSelector isDropdown={false} />

                <Button
                  icon={TbLogout}
                  variant="ghost"
                  onClick={() => setShowLogoutConfirmation(true)}
                  className="group justify-start gap-2 truncate border border-transparent px-4 text-white hover:border-red hover:bg-transparent hover:text-red"
                  iconClassName="text-white text-2xl group-hover:text-red"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {LogoutConfirmation}
    </>
  );
};

export default AdminHeaderNavbar;
