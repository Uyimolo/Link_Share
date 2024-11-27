import cn from "@/utilities/cn";
import React from "react";
import { FaSpinner } from "react-icons/fa6";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary" | "danger";
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
  const typeStyles =
    variant === "primary"
      ? "bg-blue text-white disabled:bg-veryLightBlue hover:bg-lightBlue"
      : variant === "secondary"
        ? " bg-lightestGray disabled:bg-lightestGray disabled:border-lighterBlue hover:bg-veryLightBlue border-[1px] border-blue text-blue hover:light disabled:text-lighterBlue"
        : "border-red border text-red hover:bg-red/20 bg-red/10";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full rounded-lg px-7 text-sm py-[11px] font-semibold flex items-center justify-center gap-2",
        typeStyles,
        className,
      )}
    >
     {loading && <FaSpinner className="animate-spin text-xl"/>}
      {children}
    </button>
  );
};

export default Button;
