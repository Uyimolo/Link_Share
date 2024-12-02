import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.svg";
import logoWhite from "@/assets/svgs/logowhite.svg";
import Paragraph from "../text/Paragraph";
import cn from "@/utilities/cn";

type LogoProps = {
  showFullLogo?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "white" | "default";
};

const Logo = ({
  showFullLogo = false,
  className,
  onClick,
  variant = "default",
}: LogoProps) => {
  return (
    <>
      {showFullLogo ? (
        <div
          onClick={onClick}
          className={cn(
            "flex w-fit cursor-pointer items-center gap-1",

            className,
          )}
        >
          {variant === "default" ? (
            <Image src={logo} alt="logo" />
          ) : (
            <Image src={logoWhite} alt="logo" />
          )}

          <Paragraph
            className={cn(
              "text-3xl font-extrabold lg:text-2xl xl:text-3xl",
              variant === "white" ? "text-white" : "text-darkGray",
            )}
          >
            LinkShare
          </Paragraph>
        </div>
      ) : variant === "default" ? (
        <Image
          src={logo}
          alt="logo"
          className={cn("cursor-pointer", className)}
          onClick={onClick}
        />
      ) : (
        <Image
          src={logoWhite}
          alt="logo"
          className={cn("cursor-pointer", className)}
          onClick={onClick}
        />
      )}
    </>
  );
};
export default Logo;
