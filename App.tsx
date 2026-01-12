import React, { useState, useEffect } from 'react';
import { BLOG_CONTENT } from './data';
import { MergeSection } from './components/MergeSection';
import { ConflictStatus, MergeState } from './types';
import { GitMerge, GitCommit, Play, RotateCcw, CheckCircle2, BookOpen, Github } from 'lucide-react';
import { ConclusionModal } from './components/ConclusionModal';

const App: React.FC = () => {
  const [mergeState, setMergeState] = useState<MergeState>(() => {
    const initialState: MergeState = {};
    BLOG_CONTENT.forEach(section => {
      initialState[section.id] = ConflictStatus.Unresolved;
    });
    return initialState;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = BLOG_CONTENT.length;
    const resolved = Object.values(mergeState).filter(s => s !== ConflictStatus.Unresolved).length;
    setProgress((resolved / total) * 100);
  }, [mergeState]);

  const handleResolve = (id: string, direction: 'LEFT' | 'RIGHT' | 'BOTH') => {
    setMergeState(prev => ({
      ...prev,
      [id]: direction === 'LEFT' ? ConflictStatus.ResolvedLeft : 
            direction === 'RIGHT' ? ConflictStatus.ResolvedRight :
            ConflictStatus.ResolvedBoth
    }));
  };

  const handleCommit = () => {
    setIsModalOpen(true);
  };

  const resetAll = () => {
    const newState: MergeState = {};
    BLOG_CONTENT.forEach(section => {
      newState[section.id] = ConflictStatus.Unresolved;
    });
    setMergeState(newState);
  };

  const isComplete = progress === 100;
  
  const score = Math.round(
    (Object.values(mergeState).filter(s => s === ConflictStatus.ResolvedRight).length / BLOG_CONTENT.length) * 100
  );

  return (
    <div className="flex flex-col h-screen bg-background text-text font-sans overflow-hidden">
      
      {/* Sticky Header */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-border h-16 shrink-0 z-30 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="bg-brand/10 p-2 rounded-lg text-brand">
             <GitMerge size={20} />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base leading-tight">Code Hygiene</h1>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>prod/main</span>
              <span>•</span>
              <span>{Math.round(progress)}% Merged</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={resetAll}
            className="p-2 hover:bg-surfaceHigh rounded-full text-muted hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
          
          <button
            onClick={handleCommit}
            disabled={!isComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              isComplete 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 hover:bg-blue-600' 
                : 'bg-surfaceHigh text-muted cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline">Commit Changes</span>
            <span className="sm:hidden">Commit</span>
            <GitCommit size={16} />
          </button>
        </div>
      </header>

      {/* Progress Line */}
      <div className="h-0.5 w-full bg-surfaceHigh">
        <div 
          className="h-full bg-brand transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-16 pb-24">
          
          {/* Introduction Card */}
          <div className="text-center py-8 max-w-2xl mx-auto">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Incoming Merge Request</h2>
             <p className="text-muted text-lg">
               The production branch is strict. Your current logic is fragile. 
               Review the conflicts below and decide: <span className="text-danger">Fragile Patch</span> or <span className="text-success">Hygienic Fix</span>?
             </p>
             
             {/* Links to Blog and GitHub */}
             <div className="flex items-center justify-center gap-4 mt-6">
               <a 
                 href="https://dev.to/suckup_de/code-hygiene-is-not-optional-5698"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-surfaceHigh hover:bg-border text-muted hover:text-white rounded-lg transition-all text-sm"
               >
                 <BookOpen size={16} />
                 <span>Read the Article</span>
               </a>
               <a 
                 href="https://github.com/voku/CodeHygiene"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-surfaceHigh hover:bg-border text-muted hover:text-white rounded-lg transition-all text-sm"
               >
                 <Github size={16} />
                 <span>Contribute</span>
               </a>
             </div>
          </div>

          {/* Merge Stream */}
          {BLOG_CONTENT.map((section, index) => (
            <div key={section.id} className="relative group">
              {/* Vertical Connector Line */}
              {index < BLOG_CONTENT.length - 1 && (
                <div className="absolute left-1/2 top-full h-16 w-0.5 bg-border -translate-x-1/2 -z-10 group-last:hidden"></div>
              )}
              
              <MergeSection 
                data={section}
                status={mergeState[section.id]}
                onResolve={handleResolve}
              />
            </div>
          ))}

          {/* Final Call to Action */}
          {isComplete && (
            <div className="flex flex-col items-center justify-center py-12 animate-slideUp">
              <CheckCircle2 size={48} className="text-success mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">All Conflicts Resolved</h3>
              <p className="text-muted mb-6">Ready to run the production pipeline.</p>
              <button 
                onClick={handleCommit}
                className="bg-success hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-success/20 transition-all hover:-translate-y-1"
              >
                <Play size={24} fill="currentColor" />
                Run Pipeline
              </button>
            </div>
          )}
        </div>
      </main>

      <ConclusionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        score={score}
      />
    </div>
  );
};

export default App;