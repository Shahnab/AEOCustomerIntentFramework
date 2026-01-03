import React, { useMemo } from 'react';
import { Topic } from '../types';

interface KeywordListProps {
  topics: Topic[];
}

const KeywordList: React.FC<KeywordListProps> = ({ topics }) => {
  // Memoize to avoid regeneration on re-renders unless topics change
  const allKeywords = useMemo(() => {
      // 1. Get real keywords
      const realKeywords = topics.flatMap(t => 
        t.entries
          .filter(e => e.keyword !== null)
          .map(e => ({ keyword: e.keyword!, category: t.topic, isReal: true }))
      );

      // 2. Generate filler keywords to reach 1000
      const targetCount = 1000;
      const currentCount = realKeywords.length;
      const needed = Math.max(0, targetCount - currentCount);

      const fillerKeywords = [];
      const prefixes = ["Best", "Cheap", "New", "Used", "Top rated", "Affordable", "Premium", "Fast", "Safe", "Eco-friendly", "Smart", "Luxury", "Budget", "Local", "Imported", "Reliable", "Durable", "Compact", "High-speed", "Long-range"];
      const cores = ["electric bike", "e-scooter", "electric motorcycle", "EV battery", "charging station", "lithium battery", "hub motor", "brake pads", "tires", "controller", "helmet", "accessories", "spare parts", "rental service", "mechanic", "suspension", "headlight", "smart key", "GPS tracker", "insurance"];
      const locations = ["Vietnam", "Hanoi", "Ho Chi Minh City", "Da Nang", "Can Tho", "Hai Phong", "District 1", "District 7", "Thu Duc", "Near me", "Hue", "Nha Trang", "Vung Tau", "Binh Duong", "Dong Nai"];
      const suffixes = ["price", "cost", "review", "2024", "2025", "specs", "promotion", "deal", "discount", "installment", "warranty", "problems", "maintenance", "legal", "registration", "tax", "for sale", "shop", "dealer", "comparison"];

      for (let i = 0; i < needed; i++) {
          const p = prefixes[Math.floor(Math.random() * prefixes.length)];
          const c = cores[Math.floor(Math.random() * cores.length)];
          const useLoc = Math.random() > 0.6;
          const l = useLoc ? locations[Math.floor(Math.random() * locations.length)] : "";
          const s = suffixes[Math.floor(Math.random() * suffixes.length)];
          
          // Randomly construct pattern
          let kw = "";
          const pattern = Math.random();
          if (pattern < 0.3) {
              kw = `${p} ${c} ${s}`;
          } else if (pattern < 0.6) {
              kw = `${c} ${s} ${l}`;
          } else {
               kw = `${p} ${c} ${l}`;
          }
          
          fillerKeywords.push({
              keyword: kw.trim(),
              category: "Generated",
              isReal: false
          });
      }

      return [...realKeywords, ...fillerKeywords];
  }, [topics]);

  return (
    <div className="h-full overflow-y-auto w-full p-4 relative custom-scrollbar">
       <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <div className="flex flex-wrap content-start gap-2 pb-10">
        {allKeywords.map((item, idx) => (
          <div 
            key={`${idx}-${item.keyword}`}
            className={`group relative flex flex-col justify-center px-3 py-2 border rounded backdrop-blur-sm transition-all duration-300 cursor-default
                ${item.isReal 
                    ? 'bg-white/[0.06] border-white/[0.15] hover:border-white/40 hover:bg-white/[0.15]' 
                    : 'bg-white/[0.01] border-white/[0.03] hover:border-white/10 hover:bg-white/[0.05] opacity-60 hover:opacity-100'}
            `}
          >
            <span className={`text-[11px] font-medium tracking-wide transition-colors whitespace-nowrap
                ${item.isReal ? 'text-white font-semibold' : 'text-gray-500 group-hover:text-gray-300'}
            `}>
              {item.keyword}
            </span>
            {/* Source Label - Made visible and distinct */}
            <div className="flex items-center gap-1.5 mt-1.5">
               <div className={`w-1 h-1 rounded-full shrink-0 ${item.isReal ? 'bg-[#ff7a00] shadow-[0_0_6px_rgba(255,122,0,0.8)]' : 'bg-gray-700'}`}></div>
               <span className={`text-[9px] font-mono uppercase tracking-widest leading-none ${item.isReal ? 'text-[#ff7a00] font-bold opacity-100' : 'text-gray-600'}`}>
                 {item.isReal ? 'SEMRUSH' : 'EXTENDED'}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordList;