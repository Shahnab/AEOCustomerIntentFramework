import React, { useState, useEffect } from 'react';

const IntentLoader: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulation steps
    const steps = [
      "Analyzing cluster semantics...",
      "Mapping keywords to user intent...",
      "Drafting natural language prompts...",
      "Scoring AEO brand visibility...",
      "Optimizing for voice search...",
      "Compiling final intent table..."
    ];

    let currentStep = 0;
    const totalDuration = 2500;
    const stepTime = totalDuration / steps.length;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => {
            const newLogs = [...prev, steps[currentStep]];
            return newLogs.slice(-3); // Keep last 3
        });
        currentStep++;
      }
    }, stepTime);

    // Smooth progress
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(p);
        if (p >= 100) clearInterval(progressInterval);
    }, 16);

    return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
    }
  }, []);

  return (
    <div className="h-[300px] w-full flex flex-col items-center justify-center bg-black/40 relative overflow-hidden font-mono border-t border-dashed border-white/10">
        {/* Background Animation: Falling Bits */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             {[...Array(12)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute top-0 w-px bg-gradient-to-b from-transparent via-[#ff7a00] to-transparent animate-[rain_3s_linear_infinite]"
                    style={{ 
                        left: `${(i + 1) * 8}%`, 
                        height: `${50 + Math.random() * 50}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random()}s`
                    }}
                ></div>
             ))}
        </div>

        <div className="z-10 w-full max-w-sm space-y-8 text-center">
            <div className="space-y-2">
                <div className="text-[#ff7a00] text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
                    Generative AI Processing
                </div>
                <h3 className="text-2xl font-black text-white tracking-tighter">
                    CONSTRUCTING INTENTS
                </h3>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 w-full bg-white/10">
                <div 
                    className="absolute top-0 left-0 h-full bg-[#ff7a00] shadow-[0_0_15px_#ff7a00]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Logs */}
            <div className="h-12 flex flex-col justify-end items-center gap-1">
                 {logs.map((log, idx) => (
                    <div key={idx} className="text-[10px] text-gray-400 animate-in slide-in-from-bottom-2 fade-in">
                        {log}
                    </div>
                 ))}
            </div>
        </div>

        <style>{`
            @keyframes rain {
                0% { transform: translateY(-100%); opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(100%); opacity: 0; }
            }
        `}</style>
    </div>
  );
};

export default IntentLoader;