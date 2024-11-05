import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/logo.svg';
import Paragraph from '../text/Paragraph';
import cn from '@/utilities/cn';

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
          className={cn(
            'flex gap-1 items-center w-fit cursor-pointer',
            className
          )}>
          <Image src={logo} alt='logo' onClick={onClick} />

          <Paragraph className='xl:text-4xl text-darkGray text-3xl font-extrabold '>
            LinkShare
          </Paragraph>
        </div>
      ) : (
        <Image
          src={logo}
          alt='logo'
          className={cn('cursor-pointer', className)}
          onClick={onClick}
        />
      )}
    </>
  );
};
export default Logo;
