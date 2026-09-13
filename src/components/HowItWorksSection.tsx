import React from 'react';
import { Globe, ScanLine, BrainCircuit, ListOrdered, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartAudit: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onStartAudit }) => {
  const steps = [
    {
      step: 'Step 1',
      icon: Globe,
      title: 'Enter Your Website',
      description: 'Paste your website URL into the audit engine. No login or technical setup required.'
    },
    {
      step: 'Step 2',
      icon: ScanLine,
      title: 'We Scan Your Website',
      description: 'The system retrieves and analyzes available DOM structure, tags, speed metrics, and assets.'
    },
    {
      step: 'Step 3',
      icon: BrainCircuit,
      title: 'AI Finds Opportunities',
      description: 'Technical findings are translated into clear, humanized, business-focused recommendations.'
    },
    {
      step: 'Step 4',
      icon: ListOrdered,
      title: 'Get Your Action Plan',
      description: 'Receive a prioritized 7-day checklist showing exactly what to fix first for maximum growth.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-3">
            Streamlined Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SriVexa Works
          </h2>
          <p className="mt-4 text-base text-slate-600">
            From raw URL to actionable growth strategy in 4 simple steps.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                
                {/* Step pill */}
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-5 shadow-md border border-slate-800 transition-transform group-hover:scale-105">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-2">
                  {item.step}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA button */}
        <div className="text-center mt-14">
          <button
            id="how-it-works-start-btn"
            onClick={onStartAudit}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow hover:shadow-md cursor-pointer text-sm"
          >
            <span>Start Free 60-Second Scan</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
