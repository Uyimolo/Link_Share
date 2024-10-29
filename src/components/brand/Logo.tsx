import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/logo.svg';
import fullLogo from '@/assets/images/logo_full.svg';

type LogoProps = {
  showFullLogo?: boolean;
  className?: string;
  onClick?: () => void;
};

const Logo = ({ showFullLogo = false, className, onClick }: LogoProps) => {
  return (
    <>
      {showFullLogo ? (
        <Image
          src={fullLogo}
          alt='logo'
          className={className}
          onClick={onClick}
        />
      ) : (
        <Image src={logo} alt='logo' className={className} onClick={onClick} />
      )}
    </>
  );
};
export default Logo;
