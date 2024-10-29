import cn from '@/utilities/cn';
import React from 'react';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary' | 'danger';
};

const Button = ({
  className,
  children,
  onClick,
  disabled,
  variant = 'primary',
  type,
}: ButtonProps) => {
  const typeStyles =
    variant === 'primary'
      ? 'bg-blue text-white disabled:bg-veryLightBlue hover:bg-lightBlue'
      : variant === 'secondary'
      ? ' bg-lightestGray disabled:bg-lightestGray disabled:border-lighterBlue hover:bg-veryLightBlue border-[1px] border-blue text-blue hover:light disabled:text-lighterBlue'
      : 'border-red border text-red hover:bg-red/20 bg-red/10';
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'px-7 py-[11px] font-semibold rounded-lg w-full',
        typeStyles,
        className
      )}>
      {children}
    </button>
  );
};

export default Button;
