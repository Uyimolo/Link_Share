"use client";
import Paragraph from "@/components/text/Paragraph";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import cn from "@/utilities/cn";
type NavItemProps = {
  icon: IconType;
  label: string;
  link?: string;
};

const NavItem = ({
  navItem,
  isLink,
  onClick,
  isTabActive,
}: {
  navItem: NavItemProps;
  isLink: boolean;
  onClick?: () => void;
  isTabActive?: boolean;
}) => {
  const { icon, label, link } = navItem;
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const Icon = icon;

  if (!isLink) {
    return (
      <div
        onClick={onClick}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-lg p-2 md:px-7",
          isTabActive ? "bg-veryLightBlue" : "",
          label === "Preview" && "border border-blue",
        )}
      >
        <Icon
          className={cn(
            "md:text-lg",
            isTabActive ? "text-blue" : "text-gray",
            label === "Preview" && "text-blue",
          )}
        />
        <Paragraph
          className={cn(
            "hidden lg:block",
            isTabActive ? "text-blue" : "text-gray",
          )}
        >
          {label}
        </Paragraph>
      </div>
    );
  }

  return (
    <>
      {link && (
        <Link
          href={link}
          className={cn(
            "flex items-center gap-2 rounded-lg p-3 md:px-7",
            isActive(link) ? "bg-veryLightBlue" : "",
            label === "Preview" && "border border-blue",
          )}
        >
          <Icon
            className={cn(
              "text-lg",
              isActive(link) ? "text-blue" : "text-gray",
              label === "Preview" && "text-blue",
            )}
          />
          <Paragraph
            className={cn(
              "hidden lg:block",
              isActive(link) ? "text-blue" : "text-gray",
            )}
          >
            {label}
          </Paragraph>
        </Link>
      )}
    </>
  );
};

export default NavItem;
