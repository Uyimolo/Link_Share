import cn from '@/utilities/cn';
import React from 'react';

type HeadingProps = {
  variant: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Heading = ({
  variant,
  children,
  className,
  style,
  onClick,
}: HeadingProps) => {
  const HeadingTag = variant; // Dynamically set the HTML tag based on the variant prop

  return (
    <HeadingTag
      className={cn(
        'text-2xl md:text-[32px] font-bold text-darkGray',
        className
      )}
      style={style}
      onClick={onClick}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
