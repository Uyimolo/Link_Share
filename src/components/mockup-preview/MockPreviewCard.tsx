import { options } from '@/data/options';
import { LinkType } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import Paragraph from '../text/Paragraph';
import { FaArrowRight } from 'react-icons/fa';

const MockPreviewCard = ({ link }: { link: LinkType }) => {
  const linkIndex = options.findIndex((option) => option.value === link.title);
  const Icon = options[linkIndex].icon;
  return (
    <div>
      <Link
        href={link.url}
        className='bg-black p-3 w-full flex gap-2 rounded-md items-center'>
        <Icon className='text-white text-xs'  />
        <Paragraph variant='small' className='text-white'>{link.title}</Paragraph>
        <FaArrowRight className='text-white mr-0 text-xs ml-auto' />
      </Link>
    </div>
  );
};

export default MockPreviewCard;
