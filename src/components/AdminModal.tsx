import React, { useEffect, useState } from 'react';
import { X, Users, Activity, Globe, Award, Mail, PhoneCall, AlertTriangle, RefreshCw } from 'lucide-react';
import { AdminStats } from '../types';
import { getAdminStats } from '../services/api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadStats();
    }
  }, [isOpen]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 my-8 animate-in fade-in zoom-in duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 pr-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-1">
              Internal Admin Panel
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              SriVexa Digital Operations Hub
            </h3>
            <p className="text-xs text-slate-500">
              Overview for Sri Vatsa G (CEO & Founder | Digital & Performance Marketer)
            </p>
          </div>

          <button
            onClick={loadStats}
            title="Refresh statistics"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading || !stats ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading real-time admin metrics...
          </div>
        ) : (
          <div className="py-6 space-y-6">
            
            {/* Top Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 block">Total Users</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">{stats.totalUsers}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 block">Total Audits</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">{stats.totalAudits}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 block">Websites</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">{stats.websitesAnalyzed}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 block">Avg Health Score</span>
                <span className="text-xl font-black text-teal-600 mt-1 block">{stats.averageWebsiteScore}/100</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 block">Total Leads</span>
                <span className="text-xl font-black text-emerald-600 mt-1 block">{stats.totalLeads}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 block">Service Orders</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">{stats.totalServiceRequests}</span>
              </div>
            </div>

            {/* Most Common Issues Discovered */}
            <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Most Common Issues Discovered Across All Client Audits</span>
              </h4>

              <div className="space-y-2.5">
                {stats.commonIssues.map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-900">{item.issue}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-slate-700">{item.count} occurrences</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Quick Note */}
            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200/80 text-xs text-teal-900 flex items-start justify-between">
              <div>
                <strong>SriVexa Digital Growth Pipeline:</strong> 18 new leads acquired this week for SEO Site Audits (₹300) and Website Development (₹3,000).
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
