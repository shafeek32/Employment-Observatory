import React from 'react';

interface HairlineCardProps {
  children: React.ReactNode;
  className?: string;
  badge?: string;
  variant?: 'white' | 'ivory' | 'ink';
}

export const HairlineCard: React.FC<HairlineCardProps> = ({
  children,
  className = '',
  badge,
  variant = 'white'
}) => {
  const bgStyles = {
    white: 'bg-white text-[#191B1A]',
    ivory: 'bg-[#F7F5EF] text-[#191B1A]',
    ink: 'bg-[#191B1A] text-[#F7F5EF]'
  };

  return (
    <div className={`relative border border-[#E6E3DB] ${bgStyles[variant]} p-5 sm:p-7 ${className}`}>
      {badge && (
        <div className="absolute -top-2.5 left-5 bg-[#191B1A] text-[#F7F5EF] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest font-medium">
          {badge}
        </div>
      )}
      {children}
    </div>
  );
};
