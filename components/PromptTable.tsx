import React from 'react';
import { Topic } from '../types';

interface PromptTableProps {
  topics: Topic[];
}

const PromptTable: React.FC<PromptTableProps> = ({ topics }) => {
  return (
    <div className="w-full text-left">
        {/* Header - Hidden on mobile */}
      <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-4 border-b border-white/10 bg-white/[0.02] text-[10px] font-bold text-gray-500 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-md">
        <div className="col-span-4">Topic Cluster</div>
        <div className="col-span-6">Customer Intent Prompt</div>
        <div className="col-span-2 text-right">Visibility</div>
      </div>
      
      <div className="divide-y divide-white/[0.05]">
          {topics.map((topic, tIdx) => {
             // Take first 5 entries for display
             const displayEntries = topic.entries.slice(0, 5);
             
             return displayEntries.map((entry, eIdx) => {
               // Generate a distinct looking score for simulation (Above 90%)
               const score = (90 + Math.random() * 9.9);
               const scoreDisplay = score.toFixed(1);
               const opacity = Math.max(0.4, (score / 100));

              return (
              <div key={`${tIdx}-${eIdx}`} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-4 md:px-6 py-4 md:py-5 group hover:bg-white/[0.03] transition-colors items-start md:items-center relative">
                
                {/* Cluster Name - Grouped visually */}
                <div className="col-span-1 md:col-span-4 self-start mt-0 md:mt-1.5 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start w-full">
                    <div className={`${eIdx === 0 ? 'flex' : 'flex md:hidden'} flex-row md:flex-col gap-2 md:gap-1.5 items-center md:items-start w-full`}>
                            <span className="text-xs md:text-sm font-semibold text-white tracking-wide leading-tight">{topic.topic}</span>
                            <span className="text-[9px] text-gray-600 font-mono border border-white/10 self-start px-1.5 py-0.5 rounded">ID: {String(tIdx + 1).padStart(3, '0')}</span>
                    </div>
                    
                    {eIdx !== 0 && (
                         /* Subtle connection line for visual grouping - Desktop only */
                        <div className="hidden md:block absolute left-6 top-0 w-px bg-gradient-to-b from-white/10 to-transparent h-full -ml-3 opacity-30"></div> 
                    )}
                </div>

                {/* Intent Prompt */}
                <div className="col-span-1 md:col-span-6">
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light group-hover:text-white transition-colors border-l-0 md:border-l border-transparent group-hover:border-white/30 pl-0 md:group-hover:pl-3 duration-300">
                        {entry.prompt}
                    </p>
                </div>

                 {/* Visibility Meter */}
                 <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full mt-2 md:mt-0">
                    <span className="text-[10px] text-gray-500 uppercase md:hidden">Visibility</span>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-1 mb-1 md:mb-2">
                            <span className="text-sm md:text-lg font-mono font-light text-[#ff7a00] tracking-tight">{scoreDisplay}</span>
                            <span className="text-[9px] text-gray-600 font-bold">AEO</span>
                        </div>
                        <div className="w-24 md:w-full md:max-w-[120px] h-[2px] bg-gray-800 relative overflow-hidden rounded-full">
                            <div 
                                className="absolute top-0 right-0 h-full bg-[#ff7a00] shadow-[0_0_10px_rgba(255,122,0,0.6)] transition-all duration-500"
                                style={{ width: `${score}%`, opacity: opacity }}
                            ></div>
                        </div>
                    </div>
                </div>
              </div>
            )});
          })}
      </div>
    </div>
  );
};

export default PromptTable;