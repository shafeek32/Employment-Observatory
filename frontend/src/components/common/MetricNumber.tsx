import React from 'react';

interface MetricNumberProps {
  value: string | number;
  label: string;
  sublabel?: string;
  delta?: string;
  theme?: 'default' | 'forest' | 'rust';
}

export const MetricNumber: React.FC<MetricNumberProps> = ({
  value,
  label,
  sublabel,
  delta,
  theme = 'default'
}) => {
  const valueColors = {
    default: 'text-[#191B1A]',
    forest: 'text-[#176B52]',
    rust: 'text-[#B84A35]'
  };

  return (
    <div className="flex flex-col">
      <span className="font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1 font-medium">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className={`font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight num-tabular ${valueColors[theme]}`}>
          {value}
        </span>
        {delta && (
          <span className="font-mono text-xs text-[#64645F]">
            {delta}
          </span>
        )}
      </div>
      {sublabel && (
        <span className="font-sans text-xs text-[#64645F] mt-1 leading-snug">
          {sublabel}
        </span>
      )}
    </div>
  );
};
