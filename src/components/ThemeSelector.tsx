import { Button } from "./ui/button";
import { FaThermometer } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useThemeContext } from "@/context/ThemeContext";
import { RxCaretDown } from "react-icons/rx";

const ThemeSelector = () => {
  const { updateTheme } = useThemeContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative flex w-full justify-start border border-transparent bg-transparent p-3 text-white ring-0 hover:border-white hover:bg-transparent focus:outline-none focus:ring-0"
        >
          <FaThermometer className="text-xl" />
          <span className="text-sm text-white">Theme</span>
          <RxCaretDown className="absolute right-3 text-lg" />
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
