"use client";
import AdminRoutesSidebar from "@/components/admin/AdminRoutesSidebar";
import FloatingMockupPreviewToggler from "@/components/mockup-preview/FloatingMockupPreviewToggler";
import MockupPreview from "@/components/mockup-preview/MockupPreview";
import Modal from "@/components/Modal";
import { LinkProvider } from "@/context/LinkContext";
import cn from "@/utilities/cn";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [showPreview, setShowPreview] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    scrollTo(0, 0);
    setShowPreview(false);
  }, [pathname]);

  return (
    <>
      <LinkProvider>
        <div className="min-h-screen lg:grid lg:grid-cols-[20%,1fr]">
          <AdminRoutesSidebar />
          <div className=""></div>
          <div
            className={cn(
              "",
              pathname === "/admin/preview" || pathname === "/admin/analytics"
                ? ""
                : "lg:grid lg:grid-cols-[1fr,33%] xl:grid-cols-[1fr,35%] 2xl:grid-cols-[1fr,35%]",
            )}
          >
            <div className="">{children}</div>

            {/* Show mockup preview as a modal in screens less than 1280px wide */}
            <div className="lg:hidden">
              <Modal
                isOpen={showPreview}
                animationVariant="slideUp"
                className="w-full"
              >
                <MockupPreview />
              </Modal>
            </div>

            {/* Show mockup preview as part of page main content in wider screens */}
            <div className="hidden bg-white dark:bg-black lg:block">
              <MockupPreview />
            </div>
          </div>

          <FloatingMockupPreviewToggler
            showPreview={showPreview}
            setShowPreview={setShowPreview}
          />
        </div>
      </LinkProvider>
    </>
  );
};

export default DashboardLayout;
