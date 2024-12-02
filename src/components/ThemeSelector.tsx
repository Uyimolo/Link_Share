import { Button } from "./ui/button";
import { FaCaretDown, FaThermometer } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useThemeContext } from "@/context/ThemeContext";

const ThemeSelector = () => {
  const { updateTheme } = useThemeContext();
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative flex w-full justify-start hover:border hover:border-white bg-transparent p-3 text-white hover:bg-transparent ring-0 focus:ring-0 focus:outline-none"
        >
          <FaThermometer className="text-xl" />
          <span className="text-sm text-white">Theme</span>
          <FaCaretDown className="absolute right-3 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="px-2 dark:bg-darkGray">
        {/* <DropdownMenuLabel>Select a theme option</DropdownMenuLabel> */}
        <DropdownMenuItem onClick={() => updateTheme("light")}>
          Light mode
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => updateTheme("dark")}>
          Dark mode
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => updateTheme("system")}>
          System default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
