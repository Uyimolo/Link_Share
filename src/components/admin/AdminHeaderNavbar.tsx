import { NavItem as NavItemType } from "@/types/types";
import React from "react";
import NavItem from "./navigation/NavItem";
import { FaGear } from "react-icons/fa6";
import cn from "@/utilities/cn";

const AdminHeaderNavbar = ({
  navItems,
  setShowSettings,
  setShowNavigation,
  showNavigation,
}: {
  navItems: NavItemType[];
  setShowSettings: (showSettings: boolean) => void;
  setShowNavigation: (showNavigation: boolean) => void;
  showNavigation: boolean;
}) => {
  return (
    <>
      {" "}
      <div className="hidden items-center gap-1 lg:flex">
        {navItems
          // .filter((item) => item.label !== "Settings")
          .map((item, index) => (
            <NavItem key={index} isLink={!!item.link} navItem={item} />
          ))}
      </div>
      <div className="hidden lg:flex" onClick={() => setShowSettings(true)}>
        <NavItem isLink={false} navItem={{ icon: FaGear, label: "Settings" }} />
      </div>
      {/* Mobile Navbar (Sidebar) */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-screen w-4/5 space-y-4 max-w-[250px] bg-white px-4 pt-28 transition duration-500 lg:hidden",
          showNavigation ? "translate-x-0" : "translate-x-full",
        )}
      >
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            isLink={!!item.link}
            navItem={item}
            onClick={() => setShowNavigation(false)}
          />
        ))}
        <div onClick={() => setShowSettings(true)}>
          <NavItem
            isLink={false}
            navItem={{ icon: FaGear, label: "Settings" }}
            onClick={() => setShowNavigation(false)}
          />
        </div>
      </div>
      {/* curtain */}
      <div
        className={cn(
          "fixed left-0 top-0 z-30 h-screen w-full bg-veryLightBlue/50 transition duration-1000",
          showNavigation ? "translate-x-0" : "translate-x-full",
        )}
        onClick={() => setShowNavigation(false)}
      />
    </>
  );
};

export default AdminHeaderNavbar;
