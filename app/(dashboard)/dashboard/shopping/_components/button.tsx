import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
  size?: 'md';
  isActive?: boolean;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isActive = false,
  ...props
}: ButtonProps) => {
  const baseStyles = 'rounded-full transition-colors duration-300';
  
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 hover:bg-gray-300',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const activeStyles = isActive ? variants.primary : variants.secondary;
  const variantStyles = isActive !== undefined ? activeStyles : variants[variant];
  
  return (
    <button
      className={twMerge(
        baseStyles,
        variantStyles,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}; 