import React, { useState, useEffect } from 'react';

const ExtractionLoader: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      "Establishing secure connection...",
      "Authenticating with SEMRUSH API...",
      "Targeting Region: Vietnam (VN)...",
      "Fetching Category: EV & Auto...",
      "Querying Volume & KD% metrics...",
      "Extracting 120,000+ keywords...",
      "Filtering navigational intent...",
      "Clustering by semantic relevance...",
      "Finalizing dataset structure..."
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev.slice(-6), steps[currentStep]]);
        setProgress(Math.round(((currentStep + 1) / steps.length) * 100));
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 250); // Total time approx 2.25s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col p-6 bg-black/40 relative overflow-hidden font-mono">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255, 122, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 122, 0, 0.1) 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
             }}>
        </div>
        
        {/* Scan line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff7a00]/30 shadow-[0_0_15px_rgba(255,122,0,0.5)] z-0 animate-[scan_2s_linear_infinite]"></div>
        <style>{`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>

        <div className="flex-1 z-10 flex flex-col justify-end mb-6 space-y-2">
            {logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[10px] md:text-xs">
                    <span className="text-[#ff7a00]">➜</span>
                    <span className={`${idx === logs.length - 1 ? 'text-white' : 'text-gray-500'}`}>
                        {log}
                    </span>
                </div>
            ))}
             <div className="h-4">
                <span className="inline-block w-2 h-4 bg-[#ff7a00] animate-pulse"></span>
             </div>
        </div>

        <div className="z-10">
            <div className="flex justify-between text-[10px] text-[#ff7a00] mb-1 font-bold tracking-wider">
                <span>SYSTEM PROCESSING</span>
                <span>{progress}%</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[#ff7a00] shadow-[0_0_10px_#ff7a00] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    </div>
  );
};

export default ExtractionLoader;