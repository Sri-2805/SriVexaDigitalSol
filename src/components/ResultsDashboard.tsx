import React, { useState } from 'react';
import { 
  AuditReport, 
  AuditIssue, 
  AIRecommendation, 
  MetaTagSet, 
  ContentImprovementItem 
} from '../types';
import { 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Share2, 
  Link2, 
  Calendar, 
  Target, 
  Layers,
  Wand2,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { generateAuditPDF } from '../utils/pdfGenerator';
import { generateAIMetaTags, improveAICopy } from '../services/api';

interface ResultsDashboardProps {
  report: AuditReport;
  onReAnalyze: (url: string) => void;
  onRequestService: (serviceName?: string) => void;
  onOpenGoogleSheets?: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  report,
  onReAnalyze,
  onRequestService,
  onOpenGoogleSheets
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'ai-tools' | 'conversion' | 'technical' | 'plan' | 'competitors'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // AI Meta Tag state
  const [metaTags, setMetaTags] = useState<MetaTagSet>(report.metaTags);
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [metaContext, setMetaContext] = useState(report.categoryScores[0]?.summary || '');

  // AI Copy Improvement state
  const [selectedSection, setSelectedSection] = useState<string>('Homepage Headline');
  const [currentCopyText, setCurrentCopyText] = useState(report.contentImprovements[0]?.currentCopy || 'Welcome to our digital agency.');
  const [improvedCopyText, setImprovedCopyText] = useState(report.contentImprovements[0]?.improvedCopy || 'Turn Your Website Into a Predictable Growth Engine.');
  const [whyBetterText, setWhyBetterText] = useState(report.contentImprovements[0]?.whyBetter || 'Focuses on tangible customer ROI.');
  const [isImprovingCopy, setIsImprovingCopy] = useState(false);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Generate new meta tags via Gemini API
  const handleGenerateMetaTags = async () => {
    setIsGeneratingMeta(true);
    try {
      const generated = await generateAIMetaTags(report.websiteUrl, metaTags.title, metaContext);
      setMetaTags(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  // Improve copy via Gemini API
  const handleImproveCopy = async () => {
    setIsImprovingCopy(true);
    try {
      const res = await improveAICopy(currentCopyText, selectedSection, 'Generate high-intent conversions');
      setImprovedCopyText(res.improvedCopy);
      setWhyBetterText(res.whyBetter);
    } catch (e) {
      console.error(e);
    } finally {
      setIsImprovingCopy(false);
    }
  };

  // Filter issues by severity
  const criticalIssues = report.issues.filter(i => i.severity === 'critical');
  const warningIssues = report.issues.filter(i => i.severity === 'warning');
  const suggestionIssues = report.issues.filter(i => i.severity === 'suggestion');

  return (
    <div className="py-12 bg-slate-100/70 border-b border-slate-200" id="audit-results-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Website Audit Report</span>
                
                {/* Live vs Demo Distinction Badge */}
                {report.scanMode === 'live' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Website Scan Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200" title="Live crawler could not reach this domain; showing benchmark audit data">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Demo Analysis Mode (Benchmark Data)
                  </span>
                )}

                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-500 font-medium">Scanned: {report.analyzedAt}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 break-all">
                {report.websiteUrl}
              </h2>
              {report.liveScanNotes && (
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  {report.liveScanNotes}
                </p>
              )}
            </div>

            {/* Actions: Download PDF, Google Sheets & Re-Analyze */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                id="results-reanalyze-btn"
                onClick={() => onReAnalyze(report.websiteUrl)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Analyze</span>
              </button>

              <button
                id="results-export-sheets-btn"
                onClick={onOpenGoogleSheets}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors border border-emerald-300 cursor-pointer shadow-xs"
                title="Export comprehensive audit to Google Sheets (Drive & Sheets API)"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Google Sheets</span>
              </button>

              <button
                id="results-download-pdf-btn"
                onClick={() => generateAuditPDF(report)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <Download className="w-4 h-4 text-teal-300" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Health Score Overview Block */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Card */}
            <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/70 flex flex-col items-center text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Website Health Score</span>
              
              <div className="mt-4 relative flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-[10px] flex flex-col items-center justify-center ${
                  report.overallScore >= 80 
                    ? 'border-emerald-500 border-t-emerald-200' 
                    : report.overallScore >= 70 
                    ? 'border-amber-500 border-t-amber-200' 
                    : 'border-rose-500 border-t-rose-200'
                }`}>
                  <span className="text-4xl font-extrabold text-slate-900">{report.overallScore}</span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>
              </div>

              <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${
                report.overallScore >= 80 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : report.overallScore >= 70 
                  ? 'bg-amber-50 text-amber-800 border-amber-200' 
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {report.healthStatus}
              </div>

              <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-xs">
                {report.summaryQuote}
              </p>
            </div>

            {/* Right: 6 Category Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {report.categoryScores.map((cat) => {
                const isGood = cat.score >= 80;
                const isWarning = cat.score >= 70 && cat.score < 80;
                
                return (
                  <div 
                    key={cat.key} 
                    className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-800">{cat.name}</span>
                        <span className={`font-extrabold ${isGood ? 'text-emerald-600' : isWarning ? 'text-amber-600' : 'text-rose-600'}`}>
                          {cat.score}/100
                        </span>
                      </div>
                      
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full ${isGood ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mb-1 ${
                        isGood ? 'bg-emerald-50 text-emerald-700' : isWarning ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {cat.status}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {cat.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Navigation Tabs for In-Depth Audit Modules */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'overview', label: 'Issues Summary', count: report.issues.length },
            { id: 'ai-tools', label: 'AI Recommendations & Tools', icon: Sparkles },
            { id: 'conversion', label: 'Conversion Audit (61/100)', icon: Target },
            { id: 'technical', label: 'Technical, Links & Social', icon: Link2 },
            { id: 'plan', label: '7-Day Growth Plan', icon: Calendar },
            { id: 'competitors', label: 'Competitor Analysis', badge: 'Beta' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                {tab.icon && <tab.icon className={`w-4 h-4 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-600'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-bold uppercase">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ISSUES SUMMARY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Critical Issues */}
            <div className="bg-white rounded-2xl border border-rose-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Critical Issues ({criticalIssues.length})
                </h3>
                <span className="text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full font-semibold border border-rose-200">
                  Immediate Action Required
                </span>
              </div>

              <div className="space-y-4">
                {criticalIssues.map((issue) => (
                  <div key={issue.id} className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{issue.title}</h4>
                        <p className="text-slate-700 mt-1">{issue.explanation}</p>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                        High Priority
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-rose-200/60 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block mb-0.5">Why it matters:</span>
                        <p className="text-slate-600">{issue.whyItMatters}</p>
                      </div>
                      <div>
                        <span className="font-bold text-emerald-800 block mb-0.5">Recommended Fix:</span>
                        <p className="text-emerald-700">{issue.recommendedFix}</p>
                      </div>
                    </div>

                    {issue.snippet && (
                      <div className="mt-2 bg-slate-900 text-slate-200 font-mono text-[11px] p-2.5 rounded-lg flex items-center justify-between">
                        <span className="truncate">{issue.snippet}</span>
                        <button
                          onClick={() => handleCopy(issue.snippet!, issue.id)}
                          className="text-xs text-teal-400 hover:text-teal-300 ml-2 flex items-center gap-1 shrink-0"
                        >
                          {copiedKey === issue.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === issue.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-white rounded-2xl border border-amber-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Warnings ({warningIssues.length})
                </h3>
                <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
                  Optimization Opportunities
                </span>
              </div>

              <div className="space-y-4">
                {warningIssues.map((issue) => (
                  <div key={issue.id} className="p-4 rounded-xl bg-amber-50/30 border border-amber-100 text-sm">
                    <h4 className="font-bold text-slate-900">{issue.title}</h4>
                    <p className="text-slate-700 mt-1 text-xs">{issue.explanation}</p>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-amber-200/50 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block mb-0.5">Why it matters:</span>
                        <p className="text-slate-600">{issue.whyItMatters}</p>
                      </div>
                      <div>
                        <span className="font-bold text-teal-800 block mb-0.5">Recommended Fix:</span>
                        <p className="text-teal-700">{issue.recommendedFix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Suggestions & Polish ({suggestionIssues.length})
                </h3>
              </div>

              <div className="space-y-3">
                {suggestionIssues.map((issue) => (
                  <div key={issue.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <h4 className="font-bold text-slate-900">{issue.title}</h4>
                    <p className="text-slate-600 mt-0.5">{issue.explanation}</p>
                    <p className="text-teal-700 font-medium mt-1">Recommended: {issue.recommendedFix}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AI TOOLS & RECOMMENDATIONS */}
        {activeTab === 'ai-tools' && (
          <div className="space-y-8">
            
            {/* AI Recommendations Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    SriVexa AI Engine
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Targeted AI Recommendations
                  </h3>
                  <p className="text-xs text-slate-500">
                    High-impact tactical fixes generated from your website’s specific diagnostic gaps.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {report.aiRecommendations.map((rec, i) => (
                  <div key={rec.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">{rec.category}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                          {rec.impact} Impact
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{rec.issue}</h4>
                      <p className="text-xs text-slate-600 mb-3">
                        <strong className="text-slate-700">Why it matters:</strong> {rec.whyItMatters}
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3 text-xs text-slate-700">
                        <p className="font-medium text-slate-900 mb-1">AI Recommendation:</p>
                        {rec.recommendation}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => handleCopy(rec.copyableText, rec.id)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                      >
                        {copiedKey === rec.id ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === rec.id ? 'Copied to Clipboard' : 'Copy Recommendation'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Meta Tag Generator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-1">
                    <Wand2 className="w-3.5 h-3.5 text-teal-600" />
                    Meta Tag Studio
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    AI Meta Tag Generator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Generate CTR-optimized SEO Title, Description, H1, and Open Graph tags grounded in your website context.
                  </p>
                </div>

                <button
                  id="results-generate-meta-btn"
                  onClick={handleGenerateMetaTags}
                  disabled={isGeneratingMeta}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingMeta ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingMeta ? 'Regenerating via Gemini...' : 'Generate Fresh Meta Tags'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SEO Title */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700">SEO Title Tag (&lt;title&gt;)</span>
                    <button
                      onClick={() => handleCopy(metaTags.title, 'meta-title')}
                      className="text-xs text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
                    >
                      {copiedKey === 'meta-title' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'meta-title' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{metaTags.title}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{metaTags.title.length} / 60 characters recommended</span>
                </div>

                {/* Meta Description */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700">Meta Description</span>
                    <button
                      onClick={() => handleCopy(metaTags.metaDescription, 'meta-desc')}
                      className="text-xs text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
                    >
                      {copiedKey === 'meta-desc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'meta-desc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{metaTags.metaDescription}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{metaTags.metaDescription.length} / 155 characters recommended</span>
                </div>

                {/* Homepage H1 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700">Homepage Primary H1</span>
                    <button
                      onClick={() => handleCopy(metaTags.h1, 'meta-h1')}
                      className="text-xs text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
                    >
                      {copiedKey === 'meta-h1' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'meta-h1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{metaTags.h1}</p>
                </div>

                {/* Open Graph Title & Description */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700">Social Open Graph Preview</span>
                    <button
                      onClick={() => handleCopy(`${metaTags.ogTitle} — ${metaTags.ogDescription}`, 'meta-og')}
                      className="text-xs text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
                    >
                      {copiedKey === 'meta-og' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'meta-og' ? 'Copied' : 'Copy OG'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-900">{metaTags.ogTitle}</p>
                  <p className="text-xs text-slate-600 mt-1">{metaTags.ogDescription}</p>
                </div>
              </div>
            </div>

            {/* AI Content Improvement */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-1">
                  Copywriting Polish
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Improve Your Website Copy
                </h3>
                <p className="text-xs text-slate-500">
                  Compare current website wording side-by-side with SriVexa’s high-converting, humanized revisions.
                </p>
              </div>

              {/* Section Buttons */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {['Homepage Headline', 'About Section', 'Service Descriptions', 'Call to Action (CTA)', 'Product Description'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      setSelectedSection(sec);
                      if (sec.includes('Headline')) {
                        setCurrentCopyText('Welcome to our digital agency. We offer reliable solutions.');
                        setImprovedCopyText('Turn Your Website Into a Growth Engine — Proven SEO & Conversion Strategies.');
                      } else if (sec.includes('About')) {
                        setCurrentCopyText('We are passionate about digital excellence and utilize modern frameworks.');
                        setImprovedCopyText('We help ambitious founders identify hidden website leaks and convert clicks into paying customers.');
                      } else if (sec.includes('CTA')) {
                        setCurrentCopyText('Click here to learn more.');
                        setImprovedCopyText('Claim Your Free 60-Second Website Audit →');
                      } else {
                        setCurrentCopyText('Our services provide comprehensive solutions for all industries.');
                        setImprovedCopyText('Tailored growth sprints designed to increase organic leads by 30% in 90 days.');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedSection === sec 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Current Copy */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Current Copy</span>
                    <p className="text-sm text-slate-700 italic bg-white p-3.5 rounded-lg border border-slate-200">
                      "{currentCopyText}"
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-4 block">Original text detected on webpage</span>
                </div>

                {/* AI Improved Version */}
                <div className="bg-teal-50/50 p-5 rounded-xl border border-teal-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">AI Improved Version</span>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        High Conversion
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 bg-white p-3.5 rounded-lg border border-teal-200/60 shadow-xs">
                      "{improvedCopyText}"
                    </p>
                    <p className="text-xs text-slate-600 mt-2.5">
                      <strong className="text-teal-900">Why it converts better:</strong> {whyBetterText}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-teal-100">
                    <button
                      onClick={handleImproveCopy}
                      disabled={isImprovingCopy}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-teal-300 text-teal-900 hover:bg-teal-50 transition-colors cursor-pointer"
                    >
                      {isImprovingCopy ? 'Generating...' : 'Improve Copy Again'}
                    </button>
                    <button
                      onClick={() => handleCopy(improvedCopyText, 'improved-copy')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer ml-auto"
                    >
                      {copiedKey === 'improved-copy' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'improved-copy' ? 'Copied!' : 'Copy Result'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: CONVERSION AUDIT */}
        {activeTab === 'conversion' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-1">
                    Lead Generation Diagnostic
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Can Your Website Turn Visitors Into Customers?
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    We audited 9 core trust, contact, and funnel drivers required to transform casual visitors into inquiries.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-rose-50 p-4 rounded-xl border border-rose-200 shrink-0">
                  <div className="text-center">
                    <span className="text-xs text-rose-700 font-bold uppercase block">Conversion Score</span>
                    <span className="text-3xl font-black text-rose-600">{report.conversionAudit.score}/100</span>
                  </div>
                </div>
              </div>

              {/* 3 Things You Should Fix First */}
              <div className="mt-8">
                <h4 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  <span>3 Things You Should Fix First</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.conversionAudit.threeThingsToFixFirst.map((item) => (
                    <div key={item.rank} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                        {item.rank}
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h5>
                      <p className="text-xs text-slate-600 mb-3">{item.description}</p>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-teal-800 font-medium">
                        <strong>Action:</strong> {item.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9 Conversion Factors Table */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">
                  Conversion Factors Breakdown
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {report.conversionAudit.factors.map((factor, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-start gap-3">
                      {factor.found ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{factor.name}</span>
                          <span className={`text-[10px] font-semibold px-1.5 rounded ${factor.found ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {factor.found ? 'Found' : 'Missing'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{factor.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: TECHNICAL, LINKS & SOCIAL */}
        {activeTab === 'technical' && (
          <div className="space-y-6">
            
            {/* Sitemap & Robots & HTTPS Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Core Technical Foundations
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Sitemap.xml</span>
                  <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{report.technicalChecks.sitemapFound ? 'Found ✓' : 'Missing'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block truncate">{report.technicalChecks.sitemapUrl || '/sitemap.xml'}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Robots.txt</span>
                  <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{report.technicalChecks.robotsTxtFound ? 'Found ✓' : 'Missing'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block truncate">{report.technicalChecks.robotsTxtUrl || '/robots.txt'}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Canonical Tag</span>
                  <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{report.technicalChecks.canonicalFound ? 'Found ✓' : 'Missing'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block truncate">{report.technicalChecks.canonicalUrl || 'Self-referencing'}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">HTTPS Protocol</span>
                  <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{report.technicalChecks.httpsEnabled ? 'Enabled ✓' : 'Insecure'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">SSL Handshake: {report.technicalChecks.responseTimeMs}ms</span>
                </div>
              </div>
            </div>

            {/* Broken Link Checker */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Broken Link Checker ({report.brokenLinks.length} Findings)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">URL</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Issue</th>
                      <th className="py-3 px-4">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.brokenLinks.map((link, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-mono font-semibold text-slate-900">{link.url}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            link.status === 404 
                              ? 'bg-rose-100 text-rose-800' 
                              : link.status === 200 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {link.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{link.issue}</td>
                        <td className="py-3 px-4 text-teal-700 font-medium">{link.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Social Media Presence */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Social Media Presence & Sharing Metadata
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {report.socialPresence.platforms.map((p) => (
                  <div key={p.platform} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-bold text-slate-800 block mb-1">{p.platform}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${
                      p.found ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {p.found ? 'Found ✓' : 'Not Found'}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 block truncate">{p.notes}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: 7-DAY GROWTH PLAN & PRIORITIES */}
        {activeTab === 'plan' && (
          <div className="space-y-8">
            
            {/* Priority Section: What should you fix first? */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-1">
                  Prioritized Action Plan
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  What Should You Fix First?
                </h3>
                <p className="text-xs text-slate-500">
                  Ranked by ROI impact vs. implementation effort so you don’t waste hours on minor tweaks.
                </p>
              </div>

              <div className="space-y-3.5">
                {report.priorityActions.map((item) => (
                  <div 
                    key={item.priority}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {item.priority}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            item.impact === 'High Impact' 
                              ? 'bg-rose-100 text-rose-800' 
                              : item.impact === 'Medium Impact' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {item.impact}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          <strong>Why it matters:</strong> {item.whyItMatters}
                        </p>
                        <p className="text-xs text-teal-700 font-medium mt-0.5">
                          <strong>Step:</strong> {item.actionStep}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-semibold text-slate-500 block">Estimated Effort</span>
                      <span className="text-xs font-bold text-slate-900">{item.estimatedEffort}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7-Day Growth Plan */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    SriVexa 7-Day Turnaround Growth Plan
                  </h3>
                  <p className="text-xs text-slate-500">
                    A manageable 1-hour-per-day action schedule to turn your audit findings into tangible organic traffic.
                  </p>
                </div>

                <button
                  onClick={() => onReAnalyze(report.websiteUrl)}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-teal-300" />
                  <span>Re-Analyze Website</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {report.sevenDayPlan.map((dayItem) => (
                  <div 
                    key={dayItem.day}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-teal-700">Day {dayItem.day}</span>
                        {dayItem.day === 7 && (
                          <span className="text-[9px] font-bold uppercase px-1 rounded bg-teal-100 text-teal-800">Verify</span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">{dayItem.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-2">{dayItem.task}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                      <strong>Metric:</strong> {dayItem.metricToWatch}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: COMPETITOR ANALYSIS */}
        {activeTab === 'competitors' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-1">
                    Market Intelligence (Beta / Premium)
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Competitive Benchmark & Gap Analysis
                  </h3>
                  <p className="text-xs text-slate-500">
                    See how your website compares against top rivals in your niche for SEO, Performance, and Conversion.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {report.competitors.map((comp, idx) => (
                  <div key={idx} className={`p-5 rounded-xl border ${idx === 0 ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold ${idx === 0 ? 'text-teal-400' : 'text-slate-500'}`}>{comp.competitorName}</span>
                      <span className={`text-lg font-black ${idx === 0 ? 'text-white' : 'text-slate-900'}`}>{comp.overallScore}/100</span>
                    </div>

                    <p className={`text-xs font-mono mb-4 truncate ${idx === 0 ? 'text-slate-400' : 'text-slate-500'}`}>{comp.url}</p>

                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className={idx === 0 ? 'text-slate-400' : 'text-slate-500'}>SEO</span>
                        <span className="font-bold">{comp.seoScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={idx === 0 ? 'text-slate-400' : 'text-slate-500'}>Performance</span>
                        <span className="font-bold">{comp.perfScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={idx === 0 ? 'text-slate-400' : 'text-slate-500'}>Conversion</span>
                        <span className="font-bold">{comp.conversionScore}</span>
                      </div>
                    </div>

                    <div className={`pt-3 border-t text-xs ${idx === 0 ? 'border-slate-800' : 'border-slate-200'}`}>
                      <span className={`font-bold block mb-1 ${idx === 0 ? 'text-teal-300' : 'text-teal-800'}`}>Opportunities to Outrank:</span>
                      <ul className="space-y-1">
                        {comp.opportunities.map((op, oIdx) => (
                          <li key={oIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-teal-400" />
                            <span>{op}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SRIVEXA DIGITAL SERVICE CTA: "Want us to fix it for you?" */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800/60 inline-block mb-3">
                SriVexa Digital Services
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Want us to fix it for you?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                <strong>SriVexa Digital</strong> can help turn your audit into actual improvements. Let Sri Vatsa G and our performance marketing team execute the technical fixes, copy revamp, and conversion architecture.
              </p>
            </div>

            {/* Service Packages Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 text-center hover:border-teal-500/50 transition-colors">
                <span className="text-xs text-slate-400 font-medium block">In-Depth Audit</span>
                <h4 className="text-sm font-bold text-white mt-1">SEO Site Audit</h4>
                <div className="mt-2 text-lg font-black text-teal-300">₹300</div>
                <button
                  onClick={() => onRequestService('SEO Site Audit (₹300)')}
                  className="mt-3 w-full py-1.5 text-xs font-semibold rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors cursor-pointer"
                >
                  Select
                </button>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 text-center hover:border-teal-500/50 transition-colors">
                <span className="text-xs text-slate-400 font-medium block">Visuals & Ads</span>
                <h4 className="text-sm font-bold text-white mt-1">Poster Design</h4>
                <div className="mt-2 text-lg font-black text-teal-300">₹300–₹500</div>
                <button
                  onClick={() => onRequestService('Poster Design (₹300–₹500)')}
                  className="mt-3 w-full py-1.5 text-xs font-semibold rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors cursor-pointer"
                >
                  Select
                </button>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 text-center hover:border-teal-500/50 transition-colors">
                <span className="text-xs text-slate-400 font-medium block">Lead Generation</span>
                <h4 className="text-sm font-bold text-white mt-1">Product Promotion</h4>
                <div className="mt-2 text-lg font-black text-teal-300">₹500</div>
                <button
                  onClick={() => onRequestService('Product Promotion (₹500)')}
                  className="mt-3 w-full py-1.5 text-xs font-semibold rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors cursor-pointer"
                >
                  Select
                </button>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-teal-500/40 text-center relative hover:border-teal-400 transition-colors bg-teal-950/20">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase px-2 py-0.2 rounded-full bg-teal-400 text-slate-950">
                  Best Value
                </span>
                <span className="text-xs text-slate-400 font-medium block mt-1">Complete Build</span>
                <h4 className="text-sm font-bold text-white mt-1">Website Development</h4>
                <div className="mt-2 text-lg font-black text-teal-300">₹3,000</div>
                <button
                  onClick={() => onRequestService('Website Development (₹3,000)')}
                  className="mt-3 w-full py-1.5 text-xs font-semibold rounded-lg bg-teal-400 text-slate-950 hover:bg-teal-300 transition-colors cursor-pointer font-bold"
                >
                  Select
                </button>
              </div>

            </div>

            {/* Buttons: Talk to SriVexa & Request a Service */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="cta-talk-to-srivexa-btn"
                onClick={() => onRequestService('General Consultation with Sri Vatsa G')}
                className="inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer text-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to SriVexa</span>
              </button>

              <button
                id="cta-request-service-btn"
                onClick={() => onRequestService('Custom Implementation Sprint')}
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-slate-700 cursor-pointer text-sm w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-slate-300" />
                <span>Request a Service</span>
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Founder-led execution by <strong>Sri Vatsa G</strong> (CEO & Founder, Digital & Performance Marketer). No junior hand-offs.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
