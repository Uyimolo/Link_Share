'use client';
import Paragraph from '@/components/text/Paragraph';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';
import cn from '@/utilities/cn';
type NavItemProps = {
  icon: IconType;
  label: string;
  link: string;
};

const NavItem = ({ navItem }: { navItem: NavItemProps }) => {
  const { icon, label, link } = navItem;
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const Icon = icon;
  return (
    <Link
      href={link}
      className={cn(
        'flex gap-2 px-7 py-3 rounded-lg items-center',
        isActive(link) ? 'bg-veryLightBlue' : '',
        label === 'Preview' && 'border border-blue'
      )}>
      <Icon
        className={cn(
          'text-lg',
          isActive(link) ? 'text-blue' : 'text-gray',
          label === 'Preview' && 'text-blue'
        )}
      />
      <Paragraph
        className={cn(
          'hidden md:block',
          isActive(link) ? 'text-blue' : 'text-gray'
        )}>
        {label}
      </Paragraph>
    </Link>
  );
};

export default NavItem;
