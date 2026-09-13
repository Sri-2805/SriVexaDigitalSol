import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
  onRequestService: (serviceName?: string) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onSelectPlan, onRequestService }) => {
  return (
    <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3 border border-teal-200">
            Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plans for Growing Businesses & Marketers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Start with our diagnostic scan for free. Upgrade for automated competitor tracking or hire SriVexa Digital for hands-on execution.
          </p>
        </div>

        {/* 4 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Free Plan */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Free Plan</span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                <span className="text-xs text-slate-500 font-medium">/ forever</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Ideal for testing your initial website health and seeing immediate bottlenecks.
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>1 instant website audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Basic SEO scan (title, meta)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Performance overview</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Top 3 basic recommendations</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Free Plan')}
              className="mt-8 w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              Start Free Scan
            </button>
          </div>

          {/* Pro Auditor */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-teal-600 shadow-lg relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full bg-teal-600 text-white shadow-xs">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-teal-700 tracking-wider">Pro Auditor</span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">₹799</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                For founders and marketers who want unlimited in-depth audits and AI tools.
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span><strong>Unlimited</strong> website audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Full SEO, Speed, Content & Tech audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>AI Meta Tag & Copy Generator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>PDF audit report download</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Broken link & redirect detection</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Pro Auditor (₹799/mo)')}
              className="mt-8 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Pro Auditor</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </div>

          {/* Agency / Growth */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Agency / Growth</span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">₹1,999</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                For agencies auditing client websites and conducting competitor reconnaissance.
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Everything in Pro included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Competitor Gap Analysis (up to 5 rivals)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Priority AI generation speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>White-label client PDF exports</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Agency / Growth (₹1,999/mo)')}
              className="mt-8 w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              Get Agency Plan
            </button>
          </div>

          {/* SriVexa Services */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-teal-400 tracking-wider">SriVexa Services</span>
                <Sparkles className="w-4 h-4 text-teal-400" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">Custom</span>
                <span className="text-xs text-slate-400 font-medium">from ₹300</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Done-for-you implementation by Sri Vatsa G and the SriVexa Digital team.
              </p>

              <div className="mt-6 border-t border-slate-800 pt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Website fix implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>SEO Site Audit (₹300)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Poster & ad design (₹300–₹500)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Product Promotion (₹500)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Full Website Dev (₹3,000)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRequestService('Custom Implementation Sprint')}
              className="mt-8 w-full py-2.5 rounded-xl text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 transition-colors cursor-pointer"
            >
              Talk to Sri Vatsa G
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
