import { thumbnailIcons } from "@/data/thumbnailIcons";
import { LinkType } from "@/types/types";
import React from "react";
import Paragraph from "../text/Paragraph";
import { FaArrowRight } from "react-icons/fa";
import cn from "@/utilities/cn";
import { FaEarthOceania } from "react-icons/fa6";

const MockPreviewCard = ({
  link,
  onClick,
  className,
}: {
  link: LinkType;
  onClick?: () => void;
  className?: string;
}) => {
  // Find the corresponding icon and color for the link title from the options array.
  const linkIndex = thumbnailIcons.findIndex(
    (option) =>
      option.name.toLowerCase() === link.title.toLowerCase() ||
      link.url.toLowerCase().includes(option.name.toLowerCase()),
  );

  const iconFromDb = thumbnailIcons.find((thumbnail) => thumbnail.name === link.icon)?.icon

  const Icon = iconFromDb ||  thumbnailIcons[linkIndex]?.icon;
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-md bg-darkGray p-4",
        className,
      )}
    >
      {Icon ? (
        <Icon className={cn("text-xl text-white dark:text-white")} />
      ) : (
        <FaEarthOceania className={cn("text-xl text-white dark:text-white")} />
      )}
      <Paragraph
        variant="small"
        className="w-full text-center capitalize text-white"
      >
        {link.title}
      </Paragraph>
      <FaArrowRight className="ml-auto mr-0 text-xs text-white" />
    </div>
  );
};

export default MockPreviewCard;
