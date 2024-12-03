import { NavItem as NavItemType } from "@/types/types";
import React from "react";
import NavItem from "./navigation/NavItem";
import cn from "@/utilities/cn";

import ThemeSelector from "../ThemeSelector";

const AdminHeaderNavbar = ({
  navItems,
  setShowNavigation,
  showNavigation,
}: {
  navItems: NavItemType[];
  setShowNavigation: (showNavigation: boolean) => void;
  showNavigation: boolean;
}) => {
  return (
    <>
      <div
        className={cn(
          "lg: fixed right-0 top-0 z-40 h-screen w-4/5 max-w-[250px] space-y-2 bg-deepBlue dark:bg-black px-4 pt-28 transition duration-500 lg:relative lg:w-full lg:max-w-none lg:space-y-4 lg:overflow-x-hidden lg:px-0",
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
      </div>

      {/* overlay */}
      <div
        className={cn(
          "fixed left-0 top-0 z-30 h-screen w-full bg-veryLightBlue/50 dark:bg-darkGray/70 transition duration-1000",
          showNavigation ? "translate-x-0" : "translate-x-full",
        )}
        onClick={() => setShowNavigation(false)}
      />
    </>
  );
};

export default AdminHeaderNavbar;
