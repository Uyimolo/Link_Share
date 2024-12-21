"use client";
import Logo from "../brand/Logo";
import { FaLink } from "react-icons/fa";
import { IoEyeOutline, IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { FaChartBar } from "react-icons/fa6";
import { useState } from "react";
import AdminHeaderNavbar from "./AdminHeaderNavbar";
import { RxHamburgerMenu } from "react-icons/rx";
import cn from "@/utilities/cn";

const AdminRoutesSidebar = () => {
  const router = useRouter();
  const [showNavigation, setShowNavigation] = useState(false);

  const navItems = [
    {
      label: "Links",
      icon: FaLink,
      link: "/admin",
    },
    {
      label: "Profile Details",
      icon: CgProfile,
      link: "/admin/profile",
    },
    {
      label: "Analytics",
      icon: FaChartBar,
      link: "/admin/analytics",
    },
    {
      label: "Preview",
      icon: IoEyeOutline,
      link: "/admin/preview",
    },
    {
      label: "Settings",
      icon: IoSettings,
      link: "/admin/settings",
    },
  ];

  return (
    <div className="dark:bg-deepNavy relative z-10 mb-4 flex items-center justify-between border-b border-transparent bg-white p-4 dark:border-lightestGray/10 md:m-4 md:rounded-xl md:border lg:fixed lg:top-0 lg:m-0 lg:h-screen lg:w-[20%] lg:flex-col lg:items-start lg:justify-normal lg:rounded-none lg:bg-deepBlue lg:border-l-0 lg:border-t-0 lg:border-transparent lg:px-0 lg:dark:border-r lg:dark:border-lighterGray/10">
      <>
        <Logo
          showFullLogo
          className="hidden cursor-pointer lg:flex lg:px-3"
          variant="white"
          onClick={() => router.push("/")}
        />
        <Logo
          showFullLogo
          className="cursor-pointer lg:hidden"
          onClick={() => router.push("/")}
        />
      </>

      <AdminHeaderNavbar
        navItems={navItems}
        setShowNavigation={setShowNavigation}
        showNavigation={showNavigation}
      />

      <RxHamburgerMenu
        className={cn(
          "text-xl lg:hidden",
          showNavigation ? "text-white" : "text-darkGray dark:text-white",
        )}
        onClick={() => setShowNavigation(!showNavigation)}
      />
    </div>
  );
};

export default AdminRoutesSidebar;
