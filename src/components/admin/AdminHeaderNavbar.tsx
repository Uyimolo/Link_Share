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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import Confirm from "../Confirm";

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

  const LogoutConfirmation = (
    <Confirm
      isOpen={showLogoutConfirmation}
      header="Are you sure you want to log out?"
      content="This action will log you out of your
          account."
      rejectAction={() => setShowLogoutConfirmation(false)}
      acceptAction={logout}
    />
  );

  return (
    <>
      <div
        className={cn(
          "lg: fixed right-0 top-0 z-40 h-screen w-4/5 max-w-[250px] space-y-1 bg-deepBlue px-4 pt-10 transition duration-500 dark:bg-black lg:relative lg:w-full lg:max-w-none lg:overflow-x-hidden lg:px-0",
          showNavigation
            ? "translate-x-0 lg:translate-x-0"
            : "translate-x-full lg:translate-x-0",
        )}
      >
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            isLink={!!item.link}
            navItem={item}
            onClick={() => setShowNavigation(false)}
          />
        ))}{" "}
        <ThemeSelector />
        {/* <div className="mt-10 h-40 w-full rounded-xl border border-white"></div> */}
        {username && (
          <div className="pt-10">
            <div className="w-full rounded-xl border p-4">
              {/* profile picture and username */}
              <div className="flex items-center gap-2">
                {profileInfo.profilePicture !== "" && (
                  <Image
                    src={profileInfo.profilePicture}
                    alt="display image"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                )}

                <div className="w-4/5">
                  <Paragraph className="truncate text-white dark:text-white">
                    {`${profileInfo.firstName && profileInfo.firstName} ${profileInfo.lastName && profileInfo.lastName}`}
                  </Paragraph>

                  {username && (
                    <Paragraph className="overflow-ellipsis text-white dark:text-white">
                      @{username}
                    </Paragraph>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded border border-transparent p-1 hover:border-white">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-white" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setShowLogoutConfirmation(true)}
                    >
                      Logout @{username}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className=""></div>
            </div>
          </div>
        )}
      </div>

      {/* overlay */}
      <div
        className={cn(
          "fixed left-0 top-0 z-30 h-screen w-full bg-veryLightBlue/50 transition duration-1000 dark:bg-darkGray/70",
          showNavigation ? "translate-x-0" : "translate-x-full",
        )}
        onClick={() => setShowNavigation(false)}
      />

      {LogoutConfirmation}
    </>
  );
};

export default AdminHeaderNavbar;
