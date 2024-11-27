"use client";
import Logo from "../brand/Logo";
import { FaLink } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { FaChartBar } from "react-icons/fa6";
import { useState } from "react";
import AccountOptions from "./profile/AccountOptions";
import AdminHeaderNavbar from "./AdminHeaderNavbar";
import { RxHamburgerMenu } from "react-icons/rx";

const AdminRoutesHeader = () => {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
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
  ];

  return (
    <div className="relative mb-4 flex items-center justify-between bg-white p-4 md:m-4 md:rounded-xl">
      <>
        {/* <Logo className="lg:hidden" onClick={() => router.push("/")} /> */}
        <Logo
          showFullLogo
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
      </>

      <AdminHeaderNavbar
        navItems={navItems}
        setShowSettings={setShowSettings}
        setShowNavigation={setShowNavigation}
        showNavigation={showNavigation}
      />

      <RxHamburgerMenu
        className="z-40 lg:hidden text-xl"
        onClick={() => setShowNavigation(!showNavigation)}
      />

      {showSettings && (
        <AccountOptions closeModal={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default AdminRoutesHeader;
