"use client";
import Logo from "../brand/Logo";
import { FaLink } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import NavItem from "./navigation/NavItem";
import { useRouter } from "next/navigation";
import { FaChartBar, FaGear, } from "react-icons/fa6";
import { useState } from "react";
import AccountOptions from "./profile/AccountOptions";

const AdminRoutesHeader = () => {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

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
    <div className="mb-4 flex justify-between items-center bg-white p-4 md:m-4 md:rounded-xl">
      <>
        <Logo className="lg:hidden" onClick={() => router.push("/")} />
        <Logo
          showFullLogo
          className="hidden cursor-pointer lg:flex"
          onClick={() => router.push("/")}
        />
      </>

      <div className="items-center flex">
        {navItems
          // .filter((item) => item.label !== "Settings")
          .map((item, index) => (
            <NavItem key={index} isLink={!!item.link} navItem={item} />
          ))}
      </div>
      <div className="" onClick={() => setShowSettings(true)}>
        <NavItem
          isLink={false}
          navItem={{ icon: FaGear, label: "Settings" }}
        />
      </div>

      {showSettings && (
        <AccountOptions closeModal={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default AdminRoutesHeader;
