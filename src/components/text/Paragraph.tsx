import cn from '@/utilities/cn';
import React from 'react';

type ParagraphProps = {
  variant?: 'base' | 'small';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Paragraph = ({
  className,
  onClick,
  style,
  children,
  variant = 'base',
}: ParagraphProps) => {
  return (
    <p
      className={cn(
        'text-gray',
        variant === 'small' ? 'text-xs' : 'text-[0.94rem] md:text-base',
        className
      )}
      onClick={onClick}
      style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
