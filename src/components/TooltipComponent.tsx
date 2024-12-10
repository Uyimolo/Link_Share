import cn from "@/utilities/cn";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "./ui/tooltip";
import { ReactNode } from "react";

const TooltipComponent = ({
  content,
  onClick,
  triggerChildren,
  className,
  onKeyDown,
}: {
  content: ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  triggerChildren: ReactNode;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "grid aspect-square w-8 place-content-center rounded-xl hover:bg-lighterGray dark:hover:bg-black",
            className,
          )}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          {triggerChildren}{" "}
        </TooltipTrigger>
        <TooltipContent className="text-xs text-gray dark:text-white">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
