import React from 'react';

interface EditorialHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  alignment = 'left',
  className = ''
}) => {
  const alignClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-8 ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] mb-2 font-medium">
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#191B1A] font-bold tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-sm sm:text-base text-[#64645F] mt-2.5 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
