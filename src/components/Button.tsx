import cn from '@/utilities/cn';
import React from 'react';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  size?: 'default' | 'small' | 'large';
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  icon?: React.ReactNode;
  block?: boolean;
  ghost?: boolean;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClickOutside?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tabIndex?: number;
  title?: string;
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
      : ' bg-lightestGray disabled:bg-lightestGray disabled:border-lighterBlue hover:bg-veryLightBlue border-[1px] border-blue text-blue hover:light disabled:text-lighterBlue';
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
