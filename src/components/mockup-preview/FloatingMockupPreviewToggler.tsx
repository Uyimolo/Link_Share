import { usePathname } from "next/navigation";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Paragraph from "../text/Paragraph";
const FloatingMockupPreviewToggler = ({
  setShowPreview,
  showPreview,
}: {
  setShowPreview: (showPreview: boolean) => void;
  showPreview: boolean;
}) => {
  const pathname = usePathname();

  // Hide the floating mockup preview toggle when on the /admin/analytics or /admin/preview routes
  return (
    <>
      {pathname === "/admin/analytics" || pathname === "/admin/preview" ? (
        <></>
      ) : (
        <div
          className="fixed bottom-16 right-1 z-50 cursor-pointer items-center rounded-full bg-deepBlue p-2 shadow-md shadow-black/30 transition duration-500 lg:hidden"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? (
            <div className="flex items-center gap-2">
              <FaTimes className="text-lg text-white" />
              <Paragraph className="text-white">Close</Paragraph>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaEye className="text-lg text-white" />
              <Paragraph className="text-white">Preview</Paragraph>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingMockupPreviewToggler;
