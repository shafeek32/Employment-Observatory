import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'forest' | 'rust' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono uppercase tracking-wider text-xs font-semibold cursor-pointer transition-editorial border disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px] min-h-[36px]',
    md: 'px-5 py-2.5 text-xs min-h-[44px]',
    lg: 'px-7 py-3.5 text-sm min-h-[48px]'
  };

  const variantStyles = {
    primary: 'bg-[#191B1A] text-[#F7F5EF] border-[#191B1A] hover:bg-[#2A2D2B] active:bg-[#000000]',
    secondary: 'bg-[#F7F5EF] text-[#191B1A] border-[#E6E3DB] hover:border-[#191B1A] hover:bg-[#EFECE3] active:bg-[#E6E3DB]',
    forest: 'bg-[#176B52] text-[#F7F5EF] border-[#176B52] hover:bg-[#125541] active:bg-[#0E4233]',
    rust: 'bg-[#B84A35] text-[#F7F5EF] border-[#B84A35] hover:bg-[#9B3D2A] active:bg-[#823323]',
    ghost: 'bg-transparent text-[#64645F] border-transparent hover:text-[#191B1A] hover:bg-black/5 active:bg-black/10'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
