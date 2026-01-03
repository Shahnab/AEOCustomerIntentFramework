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

        {/* 3D REALISTIC EGG ANIMATION */}
        <div className="relative w-full flex flex-col items-center justify-center mb-8" style={{ perspective: '1200px' }}>
             
             {/* Ambient Light Glow */}
             <div className="absolute top-[55%] w-56 h-56 bg-[#ff7a00]/25 blur-[60px] rounded-full animate-pulse"></div>
             
             {/* Floor Shadow */}
             <div className="absolute top-[82%] w-28 h-5 bg-black/70 blur-lg rounded-[50%] animate-[shadow-scale_2.4s_ease-in-out_infinite]"></div>

             {/* THE 3D EGG CONTAINER */}
             <div 
                className="relative w-[150px] h-[195px] animate-[egg-shake_2.4s_ease-in-out_infinite] origin-bottom z-10"
                style={{ transformStyle: 'preserve-3d' }}
             >
                
                {/* EGG SHELL - Main Body */}
                <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        background: `
                            radial-gradient(ellipse 80% 60% at 25% 25%, rgba(255,255,255,1) 0%, transparent 50%),
                            radial-gradient(ellipse 100% 100% at 50% 50%, #fefefe 0%, #f5f5f5 20%, #e8e8e8 40%, #d4d4d4 60%, #bfbfbf 80%, #a8a8a8 100%)
                        `,
                        boxShadow: `
                            inset -20px -15px 40px rgba(0,0,0,0.2),
                            inset 25px 25px 50px rgba(255,255,255,0.95),
                            inset -8px 8px 25px rgba(0,0,0,0.1),
                            inset 0 -30px 60px rgba(255,122,0,0.1),
                            0 15px 35px rgba(0,0,0,0.4),
                            0 5px 15px rgba(0,0,0,0.2)
                        `,
                        transform: 'rotateX(5deg)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Egg Texture - Calcium Deposits */}
                    <div className="absolute inset-0 opacity-20 rounded-[inherit]" style={{
                        backgroundImage: `
                            radial-gradient(ellipse 2px 3px at 30% 40%, rgba(200,180,160,0.4) 0%, transparent 100%),
                            radial-gradient(ellipse 3px 2px at 60% 30%, rgba(200,180,160,0.3) 0%, transparent 100%),
                            radial-gradient(ellipse 2px 2px at 45% 70%, rgba(200,180,160,0.35) 0%, transparent 100%)
                        `
                    }}></div>
                    
                    {/* Micro Pore Texture */}
                    <div className="absolute inset-0 opacity-12 rounded-[inherit]" style={{
                        backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.06) 0.3px, transparent 0.3px)',
                        backgroundSize: '4px 4px'
                    }}></div>
                    
                    {/* Environment Reflection - Orange Rim */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/5 rounded-b-[inherit]" style={{
                        background: 'linear-gradient(to top, rgba(255,122,0,0.2) 0%, transparent 100%)',
                        mixBlendMode: 'soft-light'
                    }}></div>

                    {/* Primary Specular Highlight */}
                    <div className="absolute top-[10%] left-[18%] w-[35px] h-[22px] rounded-[70%]" style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 40%, transparent 70%)',
                        transform: 'rotate(-30deg)',
                        filter: 'blur(1px)'
                    }}></div>
                    
                    {/* Secondary Highlight */}
                    <div className="absolute top-[8%] left-[15%] w-[15px] h-[10px] bg-white rounded-[50%]" style={{
                        filter: 'blur(0.5px)',
                        opacity: 0.95
                    }}></div>
                    
                    {/* Rim Highlight */}
                    <div className="absolute top-[35%] right-[8%] w-[8px] h-[40px] rounded-full" style={{
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                        filter: 'blur(2px)',
                        transform: 'rotate(15deg)'
                    }}></div>
                </div>

                {/* REALISTIC HAIRLINE CRACK */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 150 195" style={{ zIndex: 20 }}>
                    <defs>
                        {/* Very subtle shadow for depth */}
                        <filter id="crack-depth" x="-10%" y="-10%" width="120%" height="120%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="0.3" result="blur"/>
                            <feOffset in="blur" dx="0.3" dy="0.3" result="shadow"/>
                            <feFlood floodColor="#2a2218" floodOpacity="0.3"/>
                            <feComposite in2="shadow" operator="in" result="shadow"/>
                            <feMerge>
                                <feMergeNode in="shadow"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main crack line - thin dark hairline fracture */}
                    <path 
                        d="M76 40 L75 46 L77 51 L74 58 L76 64 L73 72 L75 80 L72 90 L74 102 L71 115" 
                        fill="none" 
                        stroke="#3d362f" 
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#crack-depth)"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        className="animate-[crack-appear_2.4s_ease-out_infinite]"
                    />
                    
                    {/* Branch crack left - small fork */}
                    <path 
                        d="M74 58 L69 54 L64 56" 
                        fill="none" 
                        stroke="#4a433b" 
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#crack-depth)"
                        strokeDasharray="18"
                        strokeDashoffset="18"
                        className="animate-[crack-branch_2.4s_ease-out_infinite]"
                    />
                    
                    {/* Branch crack right */}
                    <path 
                        d="M75 80 L81 76 L87 78" 
                        fill="none" 
                        stroke="#4a433b" 
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#crack-depth)"
                        strokeDasharray="18"
                        strokeDashoffset="18"
                        className="animate-[crack-branch2_2.4s_ease-out_infinite]"
                    />
                    
                    {/* Small hairline fracture */}
                    <path 
                        d="M73 72 L68 75" 
                        fill="none" 
                        stroke="#554d44" 
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeDasharray="8"
                        strokeDashoffset="8"
                        className="animate-[crack-tiny_2.4s_ease-out_infinite]"
                    />
                    
                    {/* Another small fracture */}
                    <path 
                        d="M72 90 L78 93" 
                        fill="none" 
                        stroke="#554d44" 
                        strokeWidth="0.4"
                        strokeLinecap="round"
                        strokeDasharray="8"
                        strokeDashoffset="8"
                        className="animate-[crack-tiny2_2.4s_ease-out_infinite]"
                    />
                </svg>

                {/* Very subtle warm glow peeking through crack */}
                <div 
                    className="absolute top-[35%] left-[30%] right-[30%] h-[35%] opacity-0 animate-[glow-peek_2.4s_ease-in-out_infinite]"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,160,80,0.4) 0%, rgba(255,120,40,0.15) 50%, transparent 100%)',
                        borderRadius: '50%',
                        mixBlendMode: 'screen',
                        filter: 'blur(10px)'
                    }}
                ></div>

             </div>
        </div>
        
        {/* CSS Animations */}
        <style>{`
            @keyframes egg-shake {
                0%, 5% { transform: rotateX(5deg) rotate(0deg) translateY(0) scale(1); }
                7% { transform: rotateX(5deg) rotate(0.8deg) translateY(-0.3px) scale(1); }
                9% { transform: rotateX(5deg) rotate(-0.8deg) translateY(0.3px) scale(1); }
                12% { transform: rotateX(5deg) rotate(0.4deg) translateY(-0.2px) scale(1); }
                15%, 25% { transform: rotateX(5deg) rotate(0deg) translateY(0) scale(1); }
                
                28% { transform: rotateX(5deg) rotate(1.2deg) scale(0.997, 1.003); }
                30% { transform: rotateX(5deg) rotate(-1.2deg) scale(1.003, 0.997); }
                32% { transform: rotateX(5deg) rotate(1.5deg) scale(0.995, 1.005); }
                
                35% { transform: rotateX(6deg) rotate(2deg) scale(0.99, 1.01) translateY(-1px); }
                36% { transform: rotateX(4deg) rotate(-2deg) scale(1.01, 0.99) translateY(0.5px); }
                38% { transform: rotateX(5deg) rotate(1deg) scale(0.995, 1.005); }
                40% { transform: rotateX(5deg) rotate(-0.5deg) scale(1); }
                45%, 100% { transform: rotateX(5deg) rotate(0deg) translateY(0) scale(1); }
            }

            @keyframes crack-appear {
                0%, 33% { stroke-dashoffset: 100; opacity: 0; }
                34% { opacity: 1; }
                35% { stroke-dashoffset: 80; }
                42% { stroke-dashoffset: 40; }
                50% { stroke-dashoffset: 0; }
                88% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 0; }
            }

            @keyframes crack-branch {
                0%, 40% { stroke-dashoffset: 18; opacity: 0; }
                42% { opacity: 1; }
                52% { stroke-dashoffset: 0; }
                88% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 0; }
            }

            @keyframes crack-branch2 {
                0%, 45% { stroke-dashoffset: 18; opacity: 0; }
                47% { opacity: 1; }
                57% { stroke-dashoffset: 0; }
                88% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 0; }
            }

            @keyframes crack-tiny {
                0%, 48% { stroke-dashoffset: 8; opacity: 0; }
                50% { opacity: 0.8; }
                58% { stroke-dashoffset: 0; }
                88% { stroke-dashoffset: 0; opacity: 0.8; }
                100% { stroke-dashoffset: 0; opacity: 0; }
            }

            @keyframes crack-tiny2 {
                0%, 52% { stroke-dashoffset: 8; opacity: 0; }
                54% { opacity: 0.7; }
                62% { stroke-dashoffset: 0; }
                88% { stroke-dashoffset: 0; opacity: 0.7; }
                100% { stroke-dashoffset: 0; opacity: 0; }
            }

            @keyframes glow-peek {
                0%, 45% { opacity: 0; }
                55% { opacity: 0.3; }
                65% { opacity: 0.5; }
                75% { opacity: 0.3; }
                90% { opacity: 0; }
                100% { opacity: 0; }
            }

            @keyframes shadow-scale {
                0%, 100% { transform: scale(1); opacity: 0.7; }
                30%, 35% { transform: scale(1.03); opacity: 0.6; }
                50%, 70% { transform: scale(1); opacity: 0.7; }
            }
        `}</style>

        {/* Text UI */}
        <div className="z-10 text-center space-y-4">
            <div>
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">Incubating Data</h3>
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