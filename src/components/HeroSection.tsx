import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Zap, BarChart2, Globe, Sparkles, AlertCircle } from 'lucide-react';

interface HeroSectionProps {
  onStartAudit: (url: string, forceDemo?: boolean) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartAudit, isLoading }) => {
  const [urlInput, setUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg('Please enter a website URL to begin audit.');
      return;
    }
    setErrorMsg('');
    onStartAudit(urlInput.trim());
  };

  const handleQuickPick = (sampleUrl: string, forceDemo: boolean = false) => {
    setUrlInput(sampleUrl);
    setErrorMsg('');
    onStartAudit(sampleUrl, forceDemo);
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/70 border-b border-slate-200">
      
      {/* Background subtle geometric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>SriVexa AI Growth Auditor 2.0</span>
            <span className="text-slate-400">|</span>
            <span className="text-teal-300 font-normal">Fast 60-Sec Diagnostic</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Turn Your Website Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-900">Growth Engine.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Scan your website for SEO, performance, content, conversion and technical issues — then get a simple AI-powered action plan showing you what to fix first.
          </p>
        </div>

        {/* URL Input Form */}
        <div className="max-w-2xl mx-auto mb-6">
          <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2.5 p-2 bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80">
            <div className="relative flex-1 flex items-center pl-3">
              <Globe className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <input
                id="hero-website-url-input"
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="https://yourwebsite.com"
                className="w-full py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none text-base font-medium"
              />
            </div>
            <button
              id="hero-analyze-submit-btn"
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow hover:shadow-md cursor-pointer shrink-0 text-base"
            >
              {isLoading ? (
                <span>Scanning Website...</span>
              ) : (
                <>
                  <span>Analyze Website</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-2 flex items-center gap-1.5 text-rose-600 text-sm font-medium px-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Trust message & 1-click test pills */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-2">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>No technical knowledge required.</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400">Quick Test:</span>
              <button
                type="button"
                onClick={() => handleQuickPick('https://example-saas.com', true)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer border border-slate-200/60"
              >
                Sample SaaS (74/100)
              </button>
              <button
                type="button"
                onClick={() => handleQuickPick('https://stripe.com')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer border border-slate-200/60"
              >
                Live Crawl (stripe.com)
              </button>
            </div>
          </div>
        </div>

        {/* Realistic Dashboard Preview Frame */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/8 overflow-hidden">
            
            {/* Top Mock Window Bar */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 font-mono text-slate-300">srivexa.ai/audit/sample-preview</span>
              </div>
              <span className="text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Audit Benchmark Scorecard
              </span>
            </div>

            {/* Content Preview */}
            <div className="p-6 sm:p-8 bg-slate-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Overall Score Badge */}
                <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Website Health Score</span>
                  <div className="mt-3 relative flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border-8 border-slate-100 border-t-teal-500 border-r-teal-500 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-slate-900">74</span>
                      <span className="text-[11px] font-semibold text-slate-400">/ 100</span>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Needs Improvement</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 max-w-xs">
                    Good technical base; critical conversion bottlenecks in homepage CTA & SEO metadata.
                  </p>
                </div>

                {/* Individual 5 Metric Cards */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">SEO</span>
                      <span className="font-bold text-slate-900">78</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full w-[78%]" />
                    </div>
                    <span className="text-[10px] text-amber-600 font-medium mt-1.5 block">Missing meta tags</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">Performance</span>
                      <span className="font-bold text-slate-900">82</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[82%]" />
                    </div>
                    <span className="text-[10px] text-emerald-600 font-medium mt-1.5 block">Fast load time</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">Content</span>
                      <span className="font-bold text-slate-900">69</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full w-[69%]" />
                    </div>
                    <span className="text-[10px] text-amber-600 font-medium mt-1.5 block">Weak value pitch</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">Conversion</span>
                      <span className="font-bold text-rose-600">61</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full w-[61%]" />
                    </div>
                    <span className="text-[10px] text-rose-600 font-semibold mt-1.5 block">Vague hero CTA</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">Technical</span>
                      <span className="font-bold text-slate-900">80</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full w-[80%]" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium mt-1.5 block">HTTPS active</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-center items-center bg-teal-50/50 border-teal-200/60">
                    <Sparkles className="w-4 h-4 text-teal-600 mb-1" />
                    <span className="text-[11px] font-bold text-teal-900">AI Action Plan</span>
                    <span className="text-[10px] text-teal-700">Prioritized Fixes</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
