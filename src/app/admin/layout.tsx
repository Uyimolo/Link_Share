"use client";
import AdminRoutesHeader from "@/components/admin/AdminRoutesHeader";
import MockupPreview from "@/components/mockup-preview/MockupPreview";
import { LinkProvider } from "@/context/LinkContext";
import cn from "@/utilities/cn";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [showPreview, setShowPreview] = useState(false);

  const pathname = usePathname();
  return (
    <div className="">
      <LinkProvider>
        <AdminRoutesHeader />
        <div
          className={cn(
            "px-4",
            pathname === "/admin/preview" || pathname === "/admin/analytics"
              ? ""
              : "gap-4 lg:grid lg:grid-cols-[40%,1fr]",
          )}
        >
          {pathname === "/admin/analytics" || pathname === "/admin/preview" ? (
            <div className=""> </div>
          ) : (
            <div
              className={cn(
                "",
                showPreview
                  ? "fixed bottom-0 left-0 top-0 z-30 grid w-screen place-content-center bg-lightestGray/50 backdrop-blur transition duration-1000 lg:relative lg:block lg:w-full lg:place-content-start lg:rounded-xl lg:bg-white lg:py-10 lg:backdrop-filter-none"
                  : "hidden lg:block lg:rounded-xl lg:bg-white lg:py-10",
              )}
            >
              <MockupPreview />
            </div>
          )}
          <div className="">{children}</div>
        </div>

        {pathname === "/admin/analytics" || pathname === "/admin/preview" ? (
          <></>
        ) : (
          <div
            className="fixed bottom-16 right-1 z-40 aspect-square cursor-pointer rounded-full bg-black p-2 lg:hidden"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <FaTimes className="text-lg text-white" />
            ) : (
              <FaEye className="text-lg text-white" />
            )}
          </div>
        )}
      </LinkProvider>
    </div>
  );
};

export default DashboardLayout;
