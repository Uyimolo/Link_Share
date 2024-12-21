import cn from "@/utilities/cn";
import React from "react";
import { IconType } from "react-icons";
import { FaSpinner } from "react-icons/fa6";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
  icon?: IconType;
  iconClassName?: string;
};

const Button = ({
  iconClassName,
  className,
  children,
  onClick,
  disabled,
  variant = "primary",
  type,
  loading = false,
  icon,
}: ButtonProps) => {
  const variantStyles = {
    primary: "bg-blue text-white disabled:bg-veryLightBlue hover:bg-lightBlue",
    secondary:
      "bg-lightestGray disabled:bg-lightestGray disabled:border-lighterBlue hover:bg-veryLightBlue border-[1px] border-blue text-blue hover:light disabled:text-lighterBlue",
    ghost: "bg-transparent hover:bg-veryLightBlue hover:text-gray",
    danger: "border-red border text-red hover:bg-red/20 bg-red/10",
  };

  // Default to 'danger' if the variant doesn't match any of the above
  const buttonClass = variantStyles[variant] || variantStyles.danger;

  const Icon = icon;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-semibold",
        buttonClass,
        className,
      )}
    >
      {loading ? (
        <FaSpinner className={cn("animate-spin text-xl", iconClassName)} /> // if loading show animated loading spinner icon
      ) : Icon ? (
        <Icon
          className={cn(
            "text-xl",
            variant === "primary" && "text-white",
            variant === "secondary" && "text-blue",
            variant === "ghost" && "text-gray",
            variant === "danger" && "text-red",
            iconClassName,
          )}
        /> // if not loading and icon is provided show icon
      ) : (
        <></> // show nothing
      )}
      {children}
    </button>
  );
};

export default Button;
