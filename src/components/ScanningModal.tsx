import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Globe, Sparkles } from 'lucide-react';

interface ScanningModalProps {
  url: string;
  onComplete: () => void;
}

export const ScanningModal: React.FC<ScanningModalProps> = ({ url, onComplete }) => {
  const steps = [
    'Connecting to website',
    'Checking technical SEO',
    'Analyzing page structure',
    'Checking performance',
    'Reviewing content',
    'Checking conversion elements',
    'Generating AI recommendations'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header animation */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-3 shadow-inner">
            <Loader2 className="w-7 h-7 animate-spin text-teal-600" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Analyzing your website...
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1 break-all px-4">
            {url}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.round(((currentStepIndex + 1) / steps.length) * 100)}%` }}
          />
        </div>

        {/* Step-by-step check items */}
        <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-all ${
                  isDone 
                    ? 'text-teal-700 font-medium' 
                    : isCurrent 
                    ? 'text-slate-900 font-semibold' 
                    : 'text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <span className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>SriVexa Growth Engine v2.0 • In-depth diagnostic</span>
          </span>
        </div>

      </div>
    </div>
  );
};
