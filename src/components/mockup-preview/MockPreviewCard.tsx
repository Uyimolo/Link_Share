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
  className,
}: {
  link: LinkType;
  onClick?: () => void;
  className?: string;
}) => {
  // Find the corresponding icon and color for the link title from the options array.
  const linkIndex = options.findIndex((option) => option.value === link.title);
  const Icon = options[linkIndex]?.icon;
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer bg-darkGray items-center gap-2 rounded-md p-4",
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
        className='text-white capitalize w-full text-center'
      >
        {link.title}
      </Paragraph>
      <FaArrowRight className="ml-auto mr-0 text-xs text-white" />
    </div>
  );
};

export default MockPreviewCard;
