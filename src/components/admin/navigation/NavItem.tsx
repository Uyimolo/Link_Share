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
          "flex w-full cursor-pointer items-center gap-2 rounded-lg border border-transparent p-3 hover:border-lightBlue md:pr-7",
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
        <Paragraph className={cn("", isTabActive ? "text-blue" : "text-gray")}>
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
            "group flex items-center gap-2 rounded-lg border border-transparent px-3 py-3 dark:hover:bg-gray hover:border-white md:w-full md:pr-7",
            isActive(link) ? "bg-white dark:bg-gray" : "",

            // label === "Preview" && "border border-blue",
          )}
          onClick={onClick}
        >
          <Icon
            className={cn(
              "text-lg",
              isActive(link) ? "text-blue" : "text-white",
              // label === "Preview" && "text-blue",
            )}
          />
          <Paragraph
            className={cn("", isActive(link) ? "text-blue" : "text-white")}
          >
            {label}
          </Paragraph>
        </Link>
      )}
    </>
  );
};

export default NavItem;
