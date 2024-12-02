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
        'text-gray dark:text-white',
        variant === 'small' ? 'text-xs' : 'text-sm',
        className
      )}
      onClick={onClick}
      style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
