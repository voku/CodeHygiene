import React, { useState } from 'react';
import { DiffSection, ConflictStatus } from '../types';
import { CodeBlock } from './CodeBlock';
import { AlertTriangle, ShieldCheck, GitMerge, CheckCircle2, Loader2, ArrowRight, ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';

interface MergeSectionProps {
  data: DiffSection;
  status: ConflictStatus;
  onResolve: (id: string, direction: 'LEFT' | 'RIGHT' | 'BOTH') => void;
}

export const MergeSection: React.FC<MergeSectionProps> = ({ data, status, onResolve }) => {
  const [resolving, setResolving] = useState<'LEFT' | 'RIGHT' | 'BOTH' | null>(null);
  const [mobileActive, setMobileActive] = useState<'LEFT' | 'RIGHT'>('LEFT');
  
  const isResolved = status !== ConflictStatus.Unresolved;

  const handleResolve = async (direction: 'LEFT' | 'RIGHT' | 'BOTH') => {
    setResolving(direction);
    await new Promise(resolve => setTimeout(resolve, 800));
    onResolve(data.id, direction);
    setResolving(null);
  };

  const getResolvedContent = () => {
    if (status === ConflictStatus.ResolvedLeft) return data.leftContent;
    if (status === ConflictStatus.ResolvedRight) return data.rightContent;
    return {
      label: 'Hybrid Merge',
      tags: ['Manual Merge'],
      text: `${data.leftContent.text}\n\n-----------------------------------\n      MERGED MANIFESTO\n-----------------------------------\n\n${data.rightContent.text}`
    };
  };

  const resolvedData = getResolvedContent();

  return (
    <section className={`transition-all duration-500 ${isResolved ? 'opacity-80 hover:opacity-100' : 'opacity-100'}`}>
      
      {/* Context Header */}
      <div className="mb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surfaceHigh text-xs font-mono text-muted mb-3 border border-border">
          <span>SHA: {data.id.substring(0, 7)}</span>
          <span className="text-border">|</span>
          <span>{data.chapterTitle}</span>
        </div>
        <p className="text-text/90 md:text-lg leading-relaxed font-medium">{data.context}</p>
      </div>

      {/* --- UNRESOLVED VIEW --- */}
      {!isResolved && (
        <div className="animate-slideUp">
          
          {/* MOBILE VIEW: Accordion Style (Only for small screens < md) */}
          <div className="md:hidden flex flex-col gap-2">
            
            {/* Left/Fragile Accordion Item */}
            <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${mobileActive === 'LEFT' ? 'bg-surface border-danger/40 shadow-lg' : 'bg-surfaceHigh/20 border-border opacity-80'}`}>
              <button 
                onClick={() => setMobileActive('LEFT')}
                className="w-full flex items-center justify-between p-4 bg-surfaceHigh/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${mobileActive === 'LEFT' ? 'bg-danger/20 text-danger' : 'bg-gray-800 text-gray-500'}`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-bold ${mobileActive === 'LEFT' ? 'text-danger' : 'text-muted'}`}>Fragile Mindset</div>
                    <div className="text-[10px] text-muted opacity-80">Incoming Ideology</div>
                  </div>
                </div>
                {mobileActive === 'LEFT' ? <ChevronDown size={16} className="text-danger"/> : <ChevronRight size={16} className="text-muted"/>}
              </button>
              
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${mobileActive === 'LEFT' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-0 border-y border-border/50 bg-dangerDim/5">
                  <CodeBlock code={data.leftContent.text} type="bad" variant="expand" />
                </div>
                <div className="p-4 bg-dangerDim/10 flex gap-3">
                  <button 
                    onClick={() => handleResolve('LEFT')}
                    disabled={resolving !== null}
                    className="flex-1 py-2.5 rounded-lg bg-danger hover:bg-red-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {resolving === 'LEFT' ? <Loader2 className="animate-spin" size={16} /> : "Accept Fragile"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right/Hygienic Accordion Item */}
            <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${mobileActive === 'RIGHT' ? 'bg-surface border-success/40 shadow-lg' : 'bg-surfaceHigh/20 border-border opacity-80'}`}>
              <button 
                onClick={() => setMobileActive('RIGHT')}
                className="w-full flex items-center justify-between p-4 bg-surfaceHigh/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${mobileActive === 'RIGHT' ? 'bg-success/20 text-success' : 'bg-gray-800 text-gray-500'}`}>
                    <ShieldCheck size={16} />
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-bold ${mobileActive === 'RIGHT' ? 'text-success' : 'text-muted'}`}>Hygienic Mindset</div>
                    <div className="text-[10px] text-muted opacity-80">Proposed Culture</div>
                  </div>
                </div>
                {mobileActive === 'RIGHT' ? <ChevronDown size={16} className="text-success"/> : <ChevronRight size={16} className="text-muted"/>}
              </button>
              
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${mobileActive === 'RIGHT' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-0 border-y border-border/50 bg-successDim/5">
                  <CodeBlock code={data.rightContent.text} type="good" variant="expand" />
                </div>
                <div className="p-4 bg-successDim/10 flex gap-3">
                  <button 
                    onClick={() => handleResolve('RIGHT')}
                    disabled={resolving !== null}
                    className="flex-1 py-2.5 rounded-lg bg-success hover:bg-green-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {resolving === 'RIGHT' ? <Loader2 className="animate-spin" size={16} /> : "Accept Hygienic"}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Merge Both */}
            <div className="flex justify-center mt-2">
              <button 
                onClick={() => handleResolve('BOTH')}
                disabled={resolving !== null}
                className="text-xs text-muted hover:text-purple flex items-center gap-2 py-2 px-4 rounded-full border border-transparent hover:border-purple/20 hover:bg-purple/5 transition-all"
              >
                {resolving === 'BOTH' ? <Loader2 className="animate-spin" size={12} /> : <GitMerge size={12} />}
                <span>Combine Philosophies</span>
              </button>
            </div>

          </div>

          {/* TABLET/DESKTOP VIEW: GitKraken Style Split Editor (Enabled on md+) */}
          <div className="hidden md:flex flex-col border border-border rounded-xl bg-[#1e1e1e] overflow-hidden shadow-2xl relative h-[550px]">
            {/* File Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surfaceHigh/40 text-xs font-mono text-muted select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-muted/60">TOPIC:</span>
                <span className="text-text uppercase tracking-wider font-semibold">{data.chapterTitle}</span>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 text-danger">
                    <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
                    <span className="font-bold">FRAGILE</span>
                 </div>
                 <div className="flex items-center gap-2 text-success">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    <span className="font-bold">HYGIENIC</span>
                 </div>
              </div>
            </div>

            {/* Split Editor Body */}
            <div className="flex relative flex-1 overflow-hidden">
               
               {/* Left Pane (Fragile) */}
               <div className={`flex-1 relative transition-all duration-300 border-r border-border/20 ${resolving && resolving !== 'LEFT' ? 'opacity-30 grayscale blur-[1px]' : ''}`}>
                  {/* Subtle Background Tint for Diff Context */}
                  <div className="absolute inset-0 bg-danger/5 pointer-events-none z-0" />
                  
                  <div className="relative z-10 h-full group flex flex-col">
                    <CodeBlock code={data.leftContent.text} type="bad" variant="scroll" />
                    
                    {/* Hover Overlay for Quick Action */}
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
                         onClick={() => !resolving && handleResolve('LEFT')}>
                        <div className="bg-surface shadow-2xl border border-danger text-danger px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2">
                          <ArrowRight size={18} />
                          <span>Accept Fragile View</span>
                        </div>
                    </div>
                  </div>
               </div>

               {/* Center Gutter (GitKraken Style) */}
               <div className="w-16 bg-[#18181b] border-x border-[#27272a] flex flex-col items-center justify-center gap-8 z-20 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] shrink-0">
                  {/* Decor lines */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-danger/30 via-transparent to-success/30"></div>
                  <div className="absolute inset-y-0 w-px bg-border/20"></div>

                  <button 
                    onClick={() => handleResolve('LEFT')}
                    disabled={resolving !== null}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group ${
                      resolving === 'LEFT' 
                      ? 'bg-danger text-white scale-110' 
                      : 'bg-surfaceHigh text-muted border border-border hover:bg-danger hover:text-white hover:border-danger hover:scale-110'
                    }`}
                    title="Merge Left (Fragile)"
                  >
                    {resolving === 'LEFT' ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />}
                  </button>

                  <button 
                    onClick={() => handleResolve('BOTH')}
                    disabled={resolving !== null}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group ${
                      resolving === 'BOTH'
                      ? 'bg-purple text-white scale-110'
                      : 'bg-surfaceHigh text-muted border border-border hover:bg-purple hover:text-white hover:border-purple hover:scale-110'
                    }`}
                    title="Merge Both"
                  >
                     {resolving === 'BOTH' ? <Loader2 className="animate-spin" size={14} /> : <GitMerge size={14} />}
                  </button>

                  <button 
                    onClick={() => handleResolve('RIGHT')}
                    disabled={resolving !== null}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group ${
                      resolving === 'RIGHT'
                      ? 'bg-success text-white scale-110'
                      : 'bg-surfaceHigh text-muted border border-border hover:bg-success hover:text-white hover:border-success hover:scale-110'
                    }`}
                    title="Merge Right (Hygienic)"
                  >
                    {resolving === 'RIGHT' ? <Loader2 className="animate-spin" size={20} /> : <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />}
                  </button>

               </div>

               {/* Right Pane (Hygienic) */}
               <div className={`flex-1 relative transition-all duration-300 border-l border-border/20 ${resolving && resolving !== 'RIGHT' ? 'opacity-30 grayscale blur-[1px]' : ''}`}>
                  {/* Subtle Background Tint for Diff Context */}
                  <div className="absolute inset-0 bg-success/5 pointer-events-none z-0" />

                  <div className="relative z-10 h-full group flex flex-col">
                    <CodeBlock code={data.rightContent.text} type="good" variant="scroll" />

                    {/* Hover Overlay for Quick Action */}
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
                         onClick={() => !resolving && handleResolve('RIGHT')}>
                        <div className="bg-surface shadow-2xl border border-success text-success px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2">
                          <span>Keep Hygienic View</span>
                          <ArrowLeft size={18} />
                        </div>
                    </div>
                  </div>
               </div>

            </div>
          </div>

        </div>
      )}

      {/* --- RESOLVED VIEW (Result Mode) --- */}
      {isResolved && (
        <div className="animate-scaleIn max-w-4xl mx-auto">
          <div className={`rounded-xl border overflow-hidden shadow-2xl transition-colors ${
             status === ConflictStatus.ResolvedLeft ? 'border-danger/30 bg-dangerDim/5' :
             status === ConflictStatus.ResolvedRight ? 'border-success/30 bg-successDim/5' :
             'border-purple/30 bg-purpleDim/5'
          }`}>
            <div className="flex items-center justify-between p-3 border-b border-border/50 bg-surface/50">
              <div className="flex items-center gap-3">
                 <div className={`p-1.5 rounded-full ${
                    status === ConflictStatus.ResolvedLeft ? 'bg-danger text-white' :
                    status === ConflictStatus.ResolvedRight ? 'bg-success text-white' :
                    'bg-purple text-white'
                 }`}>
                   {status === ConflictStatus.ResolvedRight ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
                 </div>
                 <span className={`text-sm font-bold ${
                    status === ConflictStatus.ResolvedLeft ? 'text-danger' :
                    status === ConflictStatus.ResolvedRight ? 'text-success' :
                    'text-purple'
                 }`}>
                   {status === ConflictStatus.ResolvedLeft ? 'Merged: Fragile Mindset' :
                    status === ConflictStatus.ResolvedRight ? 'Merged: Hygienic Mindset' :
                    'Merged: Compromise'}
                 </span>
              </div>
              
              <button 
                className="text-xs text-muted flex items-center gap-1 cursor-default"
              >
                <CheckCircle2 size={12} />
                <span>Committed</span>
              </button>
            </div>
            
            <div className="p-0 bg-surface/80">
              <CodeBlock 
                code={resolvedData.text} 
                type={status === ConflictStatus.ResolvedLeft ? 'bad' : status === ConflictStatus.ResolvedRight ? 'good' : 'neutral'}
                variant="expand"
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
             <div className="h-12 w-0.5 bg-gradient-to-b from-border to-transparent"></div>
          </div>
        </div>
      )}

    </section>
  );
};