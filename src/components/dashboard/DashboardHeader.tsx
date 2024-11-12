"use client";
import Logo from "../brand/Logo";
import { FaLink } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import NavItem from "./navigation/NavItem";
import { useRouter } from "next/navigation";
import { FaChartBar } from "react-icons/fa6";

const DashboardHeader = ({
  tabIndex,
  setTabIndex,
}: {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}) => {
  const router = useRouter();

  const tabs = [
    {
      label: "Links",
      icon: FaLink,
    },
    {
      label: "Profile Details",
      icon: CgProfile,
    },
    {
      label: "Analytics",
      icon: FaChartBar,
    },
    {
      label: "Preview",
      icon: IoEyeOutline,
    },
  ];

  const previewTabIndex = tabs.findIndex((tab) => tab.label === "Preview");

  return (
    <div className="mb-4 flex justify-between bg-white p-4 md:m-4 md:rounded-xl">
      <>
        <Logo className="lg:hidden" onClick={() => router.push("/")} />
        <Logo
          showFullLogo
          className="hidden cursor-pointer lg:flex"
          onClick={() => router.push("/")}
        />
      </>

      <div className="items center flex">
        {tabs
          .filter((tab) => tab.label !== "Preview")
          .map((tab, index) => (
            <NavItem
              key={index}
              isLink={false}
              navItem={tab}
              isTabActive={index === tabIndex}
              onClick={() => setTabIndex(index)}
            />
          ))}
      </div>

      <NavItem
        isLink={false}
        isTabActive={tabIndex === previewTabIndex}
        navItem={tabs[previewTabIndex]}
        onClick={() => setTabIndex(previewTabIndex)}
      />
    </div>
  );
};

export default DashboardHeader;
