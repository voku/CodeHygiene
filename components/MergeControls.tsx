import React from 'react';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { ConflictStatus } from '../types';
import { Tooltip } from './Tooltip';

interface MergeControlsProps {
  status: ConflictStatus;
  onResolve: (direction: 'LEFT' | 'RIGHT') => void;
}

export const MergeControls: React.FC<MergeControlsProps> = ({ status, onResolve }) => {
  const isResolvedLeft = status === ConflictStatus.ResolvedLeft;
  const isResolvedRight = status === ConflictStatus.ResolvedRight;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-2 w-[60px] bg-editor-gutter border-x border-editor-line relative">
      <div className="absolute top-0 w-px h-full bg-editor-line opacity-50" />
      
      {/* Left Control */}
      <Tooltip content="Merge Fragile Code">
        <button
          onClick={() => onResolve('LEFT')}
          className={`p-2 rounded-full transition-all duration-200 ${
            isResolvedLeft 
              ? 'bg-editor-red text-white shadow-[0_0_10px_rgba(248,81,73,0.5)] scale-110' 
              : 'bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {isResolvedLeft ? <X size={16} /> : <ArrowRight size={16} />}
        </button>
      </Tooltip>

      <div className={`w-0.5 h-8 rounded transition-colors duration-300 ${
        status === ConflictStatus.Unresolved ? 'bg-gray-700' :
        isResolvedLeft ? 'bg-editor-red' : 'bg-editor-green'
      }`} />

      {/* Right Control */}
      <Tooltip content="Merge Trusted Code">
        <button
          onClick={() => onResolve('RIGHT')}
          className={`p-2 rounded-full transition-all duration-200 ${
            isResolvedRight 
              ? 'bg-editor-green text-white shadow-[0_0_10px_rgba(46,160,67,0.5)] scale-110' 
              : 'bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {isResolvedRight ? <Check size={16} /> : <ArrowLeft size={16} />}
        </button>
      </Tooltip>
    </div>
  );
};