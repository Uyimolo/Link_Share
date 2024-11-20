import { options } from "@/data/options";
import { LinkType } from "@/types/types";
import React from "react";
import Paragraph from "../text/Paragraph";
import { FaArrowRight } from "react-icons/fa";
import cn from "@/utilities/cn";
import { FaEarthOceania } from "react-icons/fa6";

const MockPreviewCard = ({
  link,
  onClick,
}: {
  link: LinkType;
  onClick?: () => void;
}) => {
  // Find the corresponding icon and color for the link title from the options array.
  const linkIndex = options.findIndex((option) => option.value === link.title);
  const Icon = options[linkIndex]?.icon;
  const color = options[linkIndex]?.color || "#000000";
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-md p-4",
        color === "#FFFFFF" && "border border-black",
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            "text-xl",
            color === "#FFFFFF" ? "text-black" : "text-white",
          )}
        />
      ) : (
        <FaEarthOceania
          className={cn(
            "text-xl",
            color === "#FFFFFF" ? "text-black" : "text-white",
          )}
        />
      )}
      <Paragraph
        variant="small"
        className={cn(color === "#FFFFFF" ? "text-black" : "text-white")}
      >
        {link.title}
      </Paragraph>
      <FaArrowRight className="ml-auto mr-0 text-xs text-white" />
    </div>
  );
};

export default MockPreviewCard;
