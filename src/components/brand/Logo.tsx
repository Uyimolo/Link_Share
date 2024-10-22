import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/logo.svg';
import fullLogo from '@/assets/images/logo_full.svg';

type LogoProps = {
  showFullLogo?: boolean;
  className?: string;
};

const Logo = ({ showFullLogo = false, className }: LogoProps) => {
  return (
    <>
      {showFullLogo ? (
        <Image src={fullLogo} alt='logo' className={className} />
      ) : (
        <Image src={logo} alt='logo' className={className} />
      )}
    </>
  );
};
export default Logo;
