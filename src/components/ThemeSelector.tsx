import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useThemeContext } from "@/context/ThemeContext";
import { CgMoon, CgSun } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { cn } from "@/lib/utils";

const ThemeSelector = ({ isDropdown = true }: { isDropdown?: boolean }) => {
  const { updateTheme, theme } = useThemeContext();
  const iconClass = "text-white text-xl";
  const themeIcon =
    theme === "dark" ? (
      <CgMoon className={iconClass} />
    ) : theme === "light" ? (
      <CgSun className={iconClass + "text-yellow-500"} />
    ) : (
      <IoSettings className={iconClass} />
    );

  return (
    <>
      {isDropdown ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-transparent focus:outline-none focus:ring-0"
            >
              {themeIcon}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="px-2 dark:bg-lightNavy">
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
      ) : (
        <div className="flex h-full w-full items-center justify-between gap-1 overflow-hidden rounded-xl border border-lighterGray/30 p-1">
          <div
            className={cn(
              "w-full rounded-lg py-2 transition duration-300",
              theme === "light"
                ? "bg-black/30"
                : "bg-transparent hover:bg-lighterNavy",
              theme === "dark" && "hover:bg-lighterNavy/70",
            )}
            onClick={() => updateTheme("light")}
          >
            <CgSun className="mx-auto text-xl text-amber-400" />
          </div>

          <div
            className={cn(
              "w-full rounded-lg py-2 transition duration-300",
              theme === "system"
                ? "bg-black/30"
                : "bg-transparent hover:bg-lighterNavy",
              theme === "dark" && "hover:bg-lighterNavy/70",
            )}
            onClick={() => updateTheme("system")}
          >
            <IoSettings className="mx-auto text-xl text-white" />
          </div>

          <div
            className={cn(
              "w-full rounded-lg py-2 transition duration-300",
              theme === "dark"
                ? "bg-lighterNavy"
                : "bg-transparent hover:bg-lighterNavy/70",
            )}
            onClick={() => updateTheme("dark")}
          >
            <CgMoon className="mx-auto text-xl text-lightBlue" />
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector;
