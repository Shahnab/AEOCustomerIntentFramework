import React, { useState, useEffect } from 'react';

const AnalysisLoader: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const steps = [
      "Accessing vector database...",
      "Computing cosine similarity...",
      "Detecting semantic clusters...",
      "Optimizing graph topology...",
      "Applying force-directed layout...",
      "Finalizing visualization..."
    ];

    let currentStep = 0;
    // Total time matches the App.tsx timeout
    const stepTime = 2400 / steps.length;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev.slice(-2), steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, stepTime); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black/80 relative overflow-hidden font-mono p-8 select-none">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
                 backgroundImage: 'radial-gradient(circle at center, #ff7a00 1px, transparent 1px)',
                 backgroundSize: '24px 24px'
             }}>
        </div>

        {/* Central Animation */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
             {/* Outer Ring */}
             <div className="absolute inset-0 border border-white/10 rounded-full"></div>
             
             {/* Spinning Segments */}
             <div className="absolute inset-0 border-2 border-transparent border-t-[#ff7a00] rounded-full animate-[spin_2s_linear_infinite]"></div>
             <div className="absolute inset-2 border-2 border-transparent border-r-[#ff7a00]/50 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
             
             {/* Inner Pulse */}
             <div className="absolute w-20 h-20 bg-[#ff7a00]/10 rounded-full animate-pulse flex items-center justify-center backdrop-blur-md border border-[#ff7a00]/30">
                <div className="w-2 h-2 bg-[#ff7a00] rounded-full shadow-[0_0_10px_#ff7a00]"></div>
             </div>
        </div>

        {/* Text UI */}
        <div className="z-10 text-center space-y-4">
            <div>
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">Analyzing Data</h3>
                <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#ff7a00] to-transparent mx-auto mt-2"></div>
            </div>

            <div className="flex flex-col gap-1.5 items-center h-12 justify-end min-w-[250px]">
                {logs.map((log, idx) => (
                    <span key={idx} className="text-[10px] text-gray-400 animate-in fade-in slide-in-from-bottom-2">
                        {`> ${log}`}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AnalysisLoader;