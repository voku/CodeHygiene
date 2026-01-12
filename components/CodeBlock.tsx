import React from 'react';

interface CodeBlockProps {
  code: string;
  type: 'neutral' | 'bad' | 'good' | 'empty';
  label?: string;
  variant?: 'scroll' | 'expand'; // 'scroll' fits to parent height, 'expand' fits to content
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, type, variant = 'scroll' }) => {
  // Simple parser to split content by markdown code blocks ``` ... ```
  const parts = code.split(/(```[\s\S]*?```)/g);

  const containerClass = variant === 'scroll' 
    ? "h-full w-full overflow-hidden flex flex-col" 
    : "w-full h-auto flex flex-col";

  const contentClass = variant === 'scroll'
    ? "flex-1 overflow-auto p-6 md:p-8 custom-scrollbar"
    : "p-6 md:p-8";

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        {type === 'empty' ? (
           <div className="flex items-center justify-center w-full h-full text-muted italic select-none">
             Waiting for resolution...
           </div>
        ) : (
          <div className="space-y-6">
            {parts.map((part, index) => {
              if (part.startsWith('```')) {
                // Render Code Block
                const cleanCode = part.replace(/```/g, '').trim();
                return (
                  <div key={index} className="rounded-md overflow-hidden border border-white/10 bg-black/30 shadow-inner">
                    <pre className="p-4 text-sm lg:text-base font-mono overflow-x-auto text-gray-300">
                      <code>{cleanCode}</code>
                    </pre>
                  </div>
                );
              } else if (part.trim().length > 0) {
                // Render Prose
                return (
                  <p key={index} className="whitespace-pre-wrap font-sans text-base md:text-lg leading-relaxed text-gray-200 tracking-wide">
                    {part.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};