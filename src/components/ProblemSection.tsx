import React from 'react';
import { ArrowRight, HelpCircle, SearchX, Gauge, FileWarning, MessageSquareDashed, Smartphone } from 'lucide-react';

interface ProblemSectionProps {
  onFindIssues: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onFindIssues }) => {
  const problems = [
    {
      icon: HelpCircle,
      title: "Visitors don't know what to do next",
      description: "Ambiguous or missing call-to-actions cause interested prospects to bounce rather than booking a call or reaching out."
    },
    {
      icon: SearchX,
      title: "Search engines may not understand your pages",
      description: "Without structured meta descriptions, keyword hierarchy, and canonical tags, Google indexes whatever it finds."
    },
    {
      icon: Gauge,
      title: "Slow pages can hurt user experience",
      description: "Uncompressed images and heavy scripts frustrate smartphone visitors, causing up to 53% of visits to be abandoned."
    },
    {
      icon: FileWarning,
      title: "Important SEO elements may be missing",
      description: "Missing alt tags, broken internal links, and absent Open Graph tags degrade your search authority and social sharing."
    },
    {
      icon: MessageSquareDashed,
      title: "Your content may not clearly communicate your value",
      description: "Dense company-focused paragraphs fail to answer the customer's burning question: 'How does this solve my specific problem?'"
    },
    {
      icon: Smartphone,
      title: "Mobile visitors may have a poor experience",
      description: "Tiny buttons, awkward horizontal scrolling, or hidden contact numbers make it painful for mobile visitors to convert."
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-3 border border-rose-200/60">
            Hidden Bottlenecks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your website may be losing opportunities without you knowing it.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Most website issues are invisible to the naked eye. Without an audit, you might be spending time and money driving visitors to a leaky bucket.
          </p>
        </div>

        {/* 6 Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <div 
                key={i} 
                className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/70 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {prob.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            id="problem-find-issues-btn"
            onClick={onFindIssues}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow hover:shadow-md cursor-pointer text-sm"
          >
            <span>Find My Website Issues</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
