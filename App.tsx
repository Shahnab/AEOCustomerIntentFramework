import React, { useState } from 'react';
import GlassCard from './components/GlassCard';
import KeywordList from './components/KeywordList';
import ClusterChart from './components/ClusterChart';
import PromptTable from './components/PromptTable';
import ExtractionLoader from './components/ExtractionLoader';
import AnalysisLoader from './components/AnalysisLoader';
import IntentLoader from './components/IntentLoader';
import CustomSelect from './components/CustomSelect';
import { SIMULATION_DATA } from './constants';
import { Topic } from './types';

// Icons
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const AnalysisIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const GenerateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

const LayersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);

const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);

const App: React.FC = () => {
  const [category, setCategory] = useState<string>("EV Bikes");
  const [country, setCountry] = useState<string>("Vietnam");
  
  // Stages: 0=Init, 1=Keywords Loaded, 2=Analysis Done, 3=Prompts Generated
  const [stage, setStage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Using the constant data for simulation
  const data: Topic[] = SIMULATION_DATA.topics;

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API delay - timed to match the ExtractionLoader animation (approx 2.5s)
    setTimeout(() => {
        setStage(1);
        setIsLoading(false);
    }, 2500);
  };

  const handleAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          setIsAnalyzing(false);
          setStage(2);
      }, 2500); // Animation duration
  };

  const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
          setIsGenerating(false);
          setStage(3);
      }, 2500); // Animation duration
  };

  return (
    <div className="min-h-screen w-full bg-background text-gray-300 font-sans selection:bg-white/30 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="h-24 border-b border-white/10 bg-black/95 backdrop-blur-2xl px-8 flex items-center justify-between sticky top-0 z-50 relative shadow-2xl">
         <div className="w-10"></div> {/* Spacer */}
         
         {/* Centered Title */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-5xl px-4 pointer-events-none flex flex-col items-center justify-center">
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-[0.2em] uppercase drop-shadow-sm mb-2 whitespace-nowrap">
                AEO: Customer Intent Framework
            </h1>
            <div className="flex items-center gap-3">
                 <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#ff7a00]/50"></div>
                 <p className="text-[11px] md:text-xs text-gray-400 font-medium tracking-widest uppercase flex items-center gap-2">
                    From keywords <span className="text-[#ff7a00]">•</span> Topic cluster analysis <span className="text-[#ff7a00]">•</span> Customer Intent Prompts
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#ff7a00]/50"></div>
            </div>
         </div>

         <div className="flex items-center gap-4 z-10">
             <span className="text-[10px] font-mono text-gray-400 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] shadow-[0_0_8px_rgba(255,122,0,0.8)] animate-pulse"></span>
                SYSTEM ONLINE
             </span>
         </div>
      </div>

      <div className="flex-1 w-full px-6 py-6 space-y-6">
        
        {/* Configuration Toolbar */}
        <div className="bg-surface/50 border border-white/20 rounded-lg p-1.5 flex flex-col md:flex-row items-center gap-2 shadow-sm backdrop-blur-sm relative z-40">
             <div className="flex-1 w-full flex items-center gap-2 px-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Config</label>
                <div className="h-4 w-px bg-white/10 mx-2"></div>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                    {/* Category Select */}
                    <CustomSelect 
                        value={category}
                        onChange={setCategory}
                        options={[{ label: "EV Bikes", value: "EV Bikes" }]}
                    />

                    {/* Country Select */}
                    <div className="border-l border-white/10 pl-4">
                        <CustomSelect 
                            value={country}
                            onChange={setCountry}
                            options={[{ label: "Vietnam", value: "Vietnam" }]}
                        />
                    </div>
                </div>
             </div>

             <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full md:w-auto md:min-w-[160px] h-9 px-6 bg-white/5 hover:bg-[#ff7a00]/10 border border-white/10 hover:border-[#ff7a00]/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#ff7a00] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md group"
            >
                {isLoading ? (
                    <span className="animate-spin h-3 w-3 border-2 border-white/30 border-t-[#ff7a00] rounded-full"></span>
                ) : (
                    <>
                        <span>Initialize</span>
                        <SearchIcon />
                    </>
                )}
            </button>
        </div>

        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[700px] h-auto">
            
            {/* Sidebar: Keywords */}
            <div className="lg:col-span-3 h-full flex flex-col min-h-[400px] lg:min-h-0">
                <GlassCard 
                    title="Keyword Extraction" 
                    className="h-full bg-surface/30 backdrop-blur-sm"
                    noPadding={true}
                    action={
                        stage >= 1 && <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/10 font-mono">100K+ analyzed</span>
                    }
                >
                    {isLoading ? (
                        <ExtractionLoader />
                    ) : stage >= 1 ? (
                        <KeywordList topics={data} />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 p-8 text-center border-t border-dashed border-white/10">
                            <ListIcon />
                            <p className="text-xs mt-3 text-gray-500">Awaiting configuration...</p>
                        </div>
                    )}
                </GlassCard>
            </div>

            {/* Main View: Visualization */}
            <div className="lg:col-span-9 h-full flex flex-col min-h-[500px] lg:min-h-0">
                <GlassCard 
                    title="Cluster Analysis" 
                    className="h-full bg-surface/30 backdrop-blur-sm"
                    noPadding={true}
                    action={
                        stage >= 1 && (
                            <button 
                                onClick={handleAnalysis}
                                disabled={stage >= 2 || isAnalyzing}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all
                                    ${stage >= 2 
                                        ? 'bg-[#ff7a00]/10 text-[#ff7a00] border-[#ff7a00]/30 cursor-default shadow-[0_0_10px_rgba(255,122,0,0.1)]' 
                                        : 'bg-transparent text-gray-400 border-white/10 hover:bg-[#ff7a00]/5 hover:border-[#ff7a00]/30 hover:text-[#ff7a00]'}
                                `}
                            >
                                {stage >= 2 ? (
                                    <><span>Map Generated</span></>
                                ) : isAnalyzing ? (
                                    <span className="animate-spin h-3 w-3 border-2 border-[#ff7a00]/30 border-t-[#ff7a00] rounded-full"></span>
                                ) : (
                                    <><span>Process Data</span><LayersIcon /></>
                                )}
                            </button>
                        )
                    }
                >
                    {isAnalyzing ? (
                        <AnalysisLoader />
                    ) : stage >= 2 ? (
                        <div className="w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-700 bg-black/40 overflow-hidden relative">
                             {/* Grid Background */}
                             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                             <ClusterChart data={data} />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4 border-t border-dashed border-white/10 bg-black/20">
                            <div className="p-4 rounded-full bg-white/5 border border-white/5">
                                <AnalysisIcon />
                            </div>
                            <div className="text-center">
                                <h4 className="text-sm font-medium text-gray-400">Analysis Pending</h4>
                                <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
                                    System standby. Initiate sequence to visualize data clusters.
                                </p>
                            </div>
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>

        {/* Bottom Panel: Intent Table */}
        <div className="pb-8">
            <GlassCard 
                title="Customer Intent Mapping"
                noPadding={true}
                className="bg-surface/30 backdrop-blur-sm"
                action={
                    stage >= 2 && (
                         <button 
                            onClick={handleGenerate}
                            disabled={stage >= 3 || isGenerating}
                            className={`
                                flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-all border
                                ${stage >= 3 
                                    ? 'text-gray-500 bg-white/5 border-white/5 cursor-default' 
                                    : 'bg-[#ff7a00]/10 text-[#ff7a00] border-[#ff7a00]/50 hover:bg-[#ff7a00]/20 shadow-[0_0_15px_rgba(255,122,0,0.15)]'}
                            `}
                        >
                            {isGenerating ? (
                                 <span className="animate-spin h-3 w-3 border-2 border-[#ff7a00]/30 border-t-[#ff7a00] rounded-full"></span>
                            ) : (
                                <>
                                    <span>Generate Intents</span>
                                    {stage < 3 && <GenerateIcon />}
                                </>
                            )}
                        </button>
                    )
                }
            >
                 {isGenerating ? (
                    <IntentLoader />
                 ) : stage >= 3 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <PromptTable topics={data} />
                    </div>
                ) : (
                     <div className="py-12 flex flex-col items-center justify-center text-gray-600 space-y-3 bg-black/20 border-t border-dashed border-white/10">
                        <p className="text-xs bg-white/5 px-4 py-2 rounded border border-white/5 text-gray-500 font-mono">
                            {stage === 2 ? 'READY FOR INTENT GENERATION' : 'WORKFLOW INCOMPLETE'}
                        </p>
                    </div>
                )}
            </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default App;