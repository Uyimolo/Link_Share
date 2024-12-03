"use client";
import AdminRoutesSidebar from "@/components/admin/AdminRoutesSidebar";
import MockupPreview from "@/components/mockup-preview/MockupPreview";
import Paragraph from "@/components/text/Paragraph";
import { LinkProvider } from "@/context/LinkContext";
import cn from "@/utilities/cn";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [showPreview, setShowPreview] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    scrollTo(0, 0);
    setShowPreview(false)
  }, [pathname]);

  return (
    <>
      <LinkProvider>
        <div className="min-h-screen dark:bg-black lg:grid lg:grid-cols-[20%,1fr] xl:grid-cols-[20%,1fr]">
          <AdminRoutesSidebar />
          <div className=""></div>
          <div
            className={cn(
              "",
              pathname === "/admin/preview" || pathname === "/admin/analytics"
                ? ""
                : "lg:grid xl:grid-cols-[1fr,30%]",
            )}
          >
            <div className="">{children}</div>

            {pathname === "/admin/analytics" ||
            pathname === "/admin/preview" ? (
              <div className=""> </div>
            ) : (
              <div
                className={cn(
                  "",
                  showPreview
                    ? "fixed bottom-0 left-0 top-0 z-30 grid w-screen place-content-center bg-lightestGray/50 pt-8 backdrop-blur transition duration-1000 dark:bg-black xl:relative xl:block xl:w-full xl:place-content-start xl:rounded-xl xl:bg-white xl:py-10 xl:backdrop-filter-none"
                    : "hidden lg:bg-white dark:bg-black xl:block xl:py-10",
                )}
                >
                <MockupPreview />
              </div>
            )}
          </div>

          {pathname === "/admin/analytics" || pathname === "/admin/preview" ? (
            <></>
          ) : (
            <div
              className="fixed bottom-16 right-1 z-40 cursor-pointer items-center rounded-full bg-black p-2 shadow-md shadow-black/30 transition duration-500 xl:hidden"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? (
                <FaTimes className="text-lg text-white" />
              ) : (
                <div className="flex gap-2">
                  <FaEye className="text-lg text-white" />
                  <Paragraph className="text-white">Preview</Paragraph>
                </div>
              )}
            </div>
          )}
        </div>
      </LinkProvider>
    </>
  );
};

export default DashboardLayout;
