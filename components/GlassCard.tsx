import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
  noPadding?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", title, action, noPadding = false }) => {
  return (
    <div className={`flex flex-col rounded-lg border border-white/20 bg-surface shadow-sm overflow-hidden ${className}`}>
        {(title || action) && (
            <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-white/10 min-h-[50px] shrink-0 bg-surface z-10">
                {title && (
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wide flex items-center gap-2">
                    {title}
                  </h3>
                )}
                {action && <div>{action}</div>}
            </div>
        )}
        
        <div className={`relative flex-1 min-h-0 flex flex-col ${noPadding ? '' : 'p-4 md:p-5'}`}>
            {children}
        </div>
    </div>
  );
};

export default GlassCard;