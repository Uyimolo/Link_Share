"use client";
import Logo from "../brand/Logo";
import { FaLink } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
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
      icon: CgProfile,
      link: "/admin/settings",
    },
  ];

  return (
    <div className="relative z-50 mb-4 flex items-center justify-between bg-white p-4 dark:bg-black dark:border-b dark:border-lightestGray/50 md:m-4 md:rounded-xl lg:fixed lg:top-0 lg:m-0 lg:h-screen lg:bg-deepBlue lg:w-[20%] lg:flex-col lg:items-start lg:justify-normal lg:rounded-none lg:bg-deepblue xl:w-[calc(20%)] xl:border-r">
      <>
        {/* <Logo className="lg:hidden" onClick={() => router.push("/")} /> */}
        <Logo
          showFullLogo
          className="hidden cursor-pointer lg:flex"
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
          "z-40 text-xl lg:hidden",
          showNavigation ? "text-white" : "text-darkGray dark:text-white",
        )}
        onClick={() => setShowNavigation(!showNavigation)}
      />
    </div>
  );
};

export default AdminRoutesSidebar;
