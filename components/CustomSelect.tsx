import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent text-sm text-gray-200 py-2 pl-3 pr-8 text-left focus:outline-none cursor-pointer hover:text-white hover:bg-white/5 rounded-md transition-all flex items-center justify-between group"
        type="button"
      >
        <span className="truncate">{selectedOption?.label || value}</span>
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-gray-300 transition-all duration-200 ${isOpen ? 'rotate-180 text-[#ff7a00]' : ''}`}>
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full min-w-[120px] mt-1 bg-[#111] border border-white/20 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[100] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 ring-1 ring-white/5">
          <div className="max-h-[200px] overflow-y-auto py-1 custom-scrollbar">
             <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
            `}</style>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  px-3 py-2 text-sm cursor-pointer transition-colors truncate
                  ${option.value === value 
                    ? 'bg-[#ff7a00] text-white font-medium' 
                    : 'text-gray-400 hover:bg-white/10 hover:text-[#ff7a00]'}
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;