import cn from "@/utilities/cn";
import React from "react";
import { FaSpinner } from "react-icons/fa6";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
};

const Button = ({
  className,
  children,
  onClick,
  disabled,
  variant = "primary",
  type,
  loading = false,
}: ButtonProps) => {
  const variantStyles =
    variant === "primary"
      ? "bg-blue text-white disabled:bg-veryLightBlue hover:bg-lightBlue"
      : variant === "secondary"
        ? " bg-lightestGray disabled:bg-lightestGray disabled:border-lighterBlue hover:bg-veryLightBlue border-[1px] border-blue text-blue hover:light disabled:text-lighterBlue"
        : variant === "ghost"
          ? "bg-transparent hover:bg-veryLightBlue hover:text-gray"
          : "border-red border text-red hover:bg-red/20 bg-red/10";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-semibold",
        variantStyles,
        className,
      )}
    >
      {loading && <FaSpinner className="animate-spin text-xl" />}
      {children}
    </button>
  );
};

export default Button;
