import React from 'react';
import { X, ExternalLink, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { AuditHistoryItem } from '../types';

interface AuditHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: AuditHistoryItem[];
  onSelectAudit: (url: string) => void;
}

export const AuditHistoryModal: React.FC<AuditHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectAudit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 my-8 animate-in fade-in zoom-in duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full mb-1">
            Historical Records
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            My Website Audits
          </h3>
          <p className="text-xs text-slate-500">
            Previously scanned domains, diagnostic health scores, and saved reports.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No audits found yet. Run your first website scan to save it here!
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {history.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 font-mono">{item.websiteUrl}</h4>
                    <span className="text-[10px] px-2 py-0.2 rounded-full font-semibold bg-white text-slate-700 border border-slate-200">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.analyzedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Score</span>
                    <span className={`text-base font-black ${
                      item.overallScore >= 80 ? 'text-emerald-600' : item.overallScore >= 70 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {item.overallScore}/100
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAudit(item.websiteUrl);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                  >
                    <span>View Report</span>
                    <ArrowRight className="w-3 h-3 text-teal-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
