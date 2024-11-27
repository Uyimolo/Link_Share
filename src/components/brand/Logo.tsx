import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.svg";
import Paragraph from "../text/Paragraph";
import cn from "@/utilities/cn";

type LogoProps = {
  showFullLogo?: boolean;
  className?: string;
  onClick?: () => void;
};

const Logo = ({ showFullLogo = false, className, onClick }: LogoProps) => {
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
          <Image src={logo} alt="logo" />

          <Paragraph className="text-3xl font-extrabold text-darkGray xl:text-4xl">
            LinkShare
          </Paragraph>
        </div>
      ) : (
        <Image
          src={logo}
          alt="logo"
          className={cn("cursor-pointer", className)}
          onClick={onClick}
        />
      )}
    </>
  );
};
export default Logo;
