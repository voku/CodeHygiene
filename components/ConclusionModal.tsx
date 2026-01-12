import React from 'react';
import { CONCLUSIONS } from '../data';
import { CheckCircle, Shield, Terminal } from 'lucide-react';

interface ConclusionModalProps {
  isOpen: boolean;
  score: number; // Percentage of "Right" choices
  onClose: () => void;
}

export const ConclusionModal: React.FC<ConclusionModalProps> = ({ isOpen, score, onClose }) => {
  if (!isOpen) return null;

  const isPerfect = score === 100;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden transform transition-all animate-scaleIn">
        
        {/* Header */}
        <div className={`p-6 border-b border-gray-700 flex items-center gap-4 ${isPerfect ? 'bg-green-900/20' : 'bg-yellow-900/20'}`}>
          <div className={`p-3 rounded-full ${isPerfect ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
             {isPerfect ? <Shield size={32} /> : <AlertTriangle size={32} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Merge Complete</h2>
            <p className="text-gray-400">
              {isPerfect 
                ? "Hygiene Check Passed: 100% Sterile" 
                : `Hygiene Check Warning: ${score}% Integrity`}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Trusted Code is Tested Code</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              You operate in a sterile system (Linux, PHP). Your application breaks because of your glue logic.
              Testing is not tech debt. It is basic hygiene. It is how you earn trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {CONCLUSIONS.map((text, idx) => (
               <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-300">{text}</span>
               </div>
             ))}
          </div>

          {!isPerfect && (
             <div className="mt-6 p-4 bg-red-900/20 border border-red-900/50 rounded flex gap-3 text-red-200 text-sm">
                <Terminal size={16} className="mt-0.5" />
                <p>Warning: You merged some fragile code. In a real hospital, this would be an infection risk. Review the diffs again.</p>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-900 flex justify-end gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Restart Merge
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors shadow-lg shadow-blue-900/20"
          >
            Deploy to Production
          </button>
        </div>
      </div>
    </div>
  );
};

// Needed for the non-perfect icon render
import { AlertTriangle } from 'lucide-react';