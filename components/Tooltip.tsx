import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap z-50 shadow-lg border border-gray-700">
        {content}
      </span>
    </div>
  );
};