'use client';
import React from 'react';
import Logo from '../brand/Logo';
import { FaLink } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import NavItem from './navigation/NavItem';
import { IconType } from 'react-icons';

type NavigationItemsType = {
  icon: IconType;
  label: string;
  link: string;
}[];

const DashboardHeader = () => {
  const navigationItems: NavigationItemsType = [
    {
      label: 'Links',
      icon: FaLink,
      link: '/dashboard',
    },
    {
      label: 'Profile Details',
      icon: CgProfile,
      link: 'dashboard/profile',
    },
    {
      label: 'Preview',
      icon: IoEyeOutline,
      link: '/dashboard/preview',
    },
  ];

  return (
    <div className='flex justify-between p-6 mb-6 bg-white md:m-4 md:rounded-xl'>
      <>
        <Logo className='md:hidden' />
        <Logo showFullLogo className='hidden md:block' />
      </>

      <div className='flex items center'>
        <NavItem navItem={navigationItems[0]} />
        <NavItem navItem={navigationItems[1]} />
      </div>

      <NavItem navItem={navigationItems[2]} />
    </div>
  );
};

export default DashboardHeader;
