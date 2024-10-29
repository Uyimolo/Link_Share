import { options } from '@/data/options';
import { LinkType } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import Paragraph from '../text/Paragraph';
import { FaArrowRight } from 'react-icons/fa';
import cn from '@/utilities/cn';

const MockPreviewCard = ({ link }: { link: LinkType }) => {
  // Find the corresponding icon and color for the link title from the options array.
  const linkIndex = options.findIndex((option) => option.value === link.title);
  const Icon = options[linkIndex].icon;
  const color = options[linkIndex].color || '#000000';
  return (
    <div>
      <Link
        href={link.url}
        style={{ backgroundColor: color }}
        className={cn(
          'p-3 w-full flex gap-2 rounded-md items-center',
          color === '#FFFFFF' && 'border border-black'
        )}>
        <Icon
          className={cn(
            'text-xl',
            color === '#FFFFFF' ? 'text-black' : 'text-white'
          )}
        />
        <Paragraph
          variant='small'
          className={cn(color === '#FFFFFF' ? 'text-black' : 'text-white')}>
          {link.title}
        </Paragraph>
        <FaArrowRight className='text-white mr-0 text-xs ml-auto' />
      </Link>
    </div>
  );
};

export default MockPreviewCard;
