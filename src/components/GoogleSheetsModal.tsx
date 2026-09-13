import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  Download, 
  Upload, 
  RefreshCw, 
  AlertCircle, 
  ArrowRight, 
  Link as LinkIcon, 
  ShieldCheck, 
  Table, 
  Layers, 
  Check, 
  Copy,
  FolderOpen
} from 'lucide-react';
import { AuditReport, LeadSubmission } from '../types';
import { 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken 
} from '../services/googleAuth';
import { 
  exportAuditToGoogleSheets, 
  syncLeadsToGoogleSheets, 
  importUrlsFromGoogleSheet, 
  listUserGoogleSheets, 
  GoogleSheetsExportResult, 
  DriveSpreadsheetFile 
} from '../services/googleSheets';
import { getAdminStats } from '../services/api';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReport: AuditReport | null;
  onAuditUrlFromSheet?: (url: string) => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  currentReport,
  onAuditUrlFromSheet
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'leads' | 'drive'>('export');
  
  // Auth state
  const [googleUserEmail, setGoogleUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Export state
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResult, setExportResult] = useState<GoogleSheetsExportResult | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  // Import state
  const [sheetInputUrl, setSheetInputUrl] = useState<string>('');
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importedUrls, setImportedUrls] = useState<string[]>([]);
  const [importedTitle, setImportedTitle] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);

  // Leads sync state
  const [isSyncingLeads, setIsSyncingLeads] = useState<boolean>(false);
  const [leadsSyncResult, setLeadsSyncResult] = useState<{ url: string; count: number } | null>(null);
  const [existingLeadSheetId, setExistingLeadSheetId] = useState<string>('');
  const [confirmDestructiveAction, setConfirmDestructiveAction] = useState<boolean>(false);

  // Drive files state
  const [recentSheets, setRecentSheets] = useState<DriveSpreadsheetFile[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState<boolean>(false);

  // Check token on mount
  useEffect(() => {
    if (isOpen) {
      checkAuthStatus();
      if (currentReport) {
        const cleanDomain = currentReport.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
        setCustomTitle(`SriVexa Audit - ${cleanDomain} (${currentReport.analyzedAt})`);
      }
    }
  }, [isOpen, currentReport]);

  const checkAuthStatus = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        setIsAuthenticated(true);
        // Try fetching userinfo if possible
        fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(r => r.json())
        .then(data => {
          if (data?.email) setGoogleUserEmail(data.email);
        })
        .catch(() => {});
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res?.accessToken) {
        setIsAuthenticated(true);
        setGoogleUserEmail(res.user.email || 'Google Account Connected');
      }
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      setAuthError(err.message || 'Failed to authenticate with Google.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logoutGoogle();
    setIsAuthenticated(false);
    setGoogleUserEmail(null);
    setRecentSheets([]);
    setExportResult(null);
  };

  // 1. Export audit to Google Sheets
  const handleExportAudit = async () => {
    if (!currentReport) return;
    setIsExporting(true);
    setExportError(null);
    setExportResult(null);

    try {
      const res = await exportAuditToGoogleSheets(currentReport, customTitle);
      setExportResult(res);
    } catch (err: any) {
      console.error('Export error:', err);
      setExportError(err.message || 'Failed to export audit to Google Sheets.');
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Import URLs from Google Sheet
  const handleImportUrls = async () => {
    if (!sheetInputUrl.trim()) return;
    setIsImporting(true);
    setImportError(null);
    setImportedUrls([]);

    try {
      const res = await importUrlsFromGoogleSheet(sheetInputUrl.trim());
      setImportedTitle(res.title);
      setImportedUrls(res.urls);
    } catch (err: any) {
      console.error('Import error:', err);
      setImportError(err.message || 'Failed to read URLs from Google Sheet. Verify sharing settings.');
    } finally {
      setIsImporting(false);
    }
  };

  // 3. Sync Leads to Google Sheet
  const handleSyncLeads = async () => {
    setIsSyncingLeads(true);
    try {
      const stats = await getAdminStats();
      const mockLeads: LeadSubmission[] = [
        {
          id: 'lead-1',
          name: 'Rajesh Sharma',
          email: 'rajesh@sharmatech.in',
          phone: '+91 98765 43210',
          businessName: 'Sharma Tech Solutions',
          website: 'https://sharmatech.in',
          serviceRequired: 'SEO Site Audit (₹300)',
          status: 'contacted',
          message: 'Need high-intent keyword ranking boost and meta tag fixing.',
          createdAt: '2026-09-12'
        },
        {
          id: 'lead-2',
          name: 'Pooja Verma',
          email: 'pooja@vermacreations.com',
          phone: '+91 91234 56789',
          businessName: 'Verma Creations',
          website: 'https://vermacreations.com',
          serviceRequired: 'Website Development (₹3,000)',
          status: 'proposal_sent',
          message: 'Redesigning boutique fashion store with high conversion CTAs.',
          createdAt: '2026-09-11'
        },
        {
          id: 'lead-3',
          name: 'Arun Patel',
          email: 'arun@patelventures.co',
          phone: '+91 99887 76655',
          businessName: 'Patel Ventures',
          website: 'https://patelventures.co',
          serviceRequired: 'Product Promotion (₹500)',
          status: 'new',
          message: 'Launching new B2B SaaS tool, seeking SriVexa performance marketing sprint.',
          createdAt: '2026-09-10'
        }
      ];

      const res = await syncLeadsToGoogleSheets(mockLeads, existingLeadSheetId);
      setLeadsSyncResult({ url: res.spreadsheetUrl, count: res.totalSynced });
      setConfirmDestructiveAction(false);
    } catch (err: any) {
      console.error('Leads sync error:', err);
      alert(`Error syncing leads: ${err.message}`);
    } finally {
      setIsSyncingLeads(false);
    }
  };

  // 4. Load Drive Sheets
  const handleLoadDriveSheets = async () => {
    setIsLoadingDrive(true);
    try {
      const files = await listUserGoogleSheets();
      setRecentSheets(files);
    } catch (e) {
      console.error('Drive files error:', e);
    } finally {
      setIsLoadingDrive(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 my-8 animate-in fade-in zoom-in duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="sheets-modal-close-btn"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-100 pr-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-xs">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Google Sheets Integration
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Export audit scorecards, sync client leads, and batch-audit websites directly with Google Sheets.
              </p>
            </div>
          </div>
        </div>

        {/* Google Authentication Status Banner */}
        <div className="my-4 p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 border-slate-200/80">
          <div className="flex items-center gap-2.5 text-xs">
            <div className={`w-2.5 h-2.5 rounded-full ${isAuthenticated ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <span className="font-bold text-slate-900 block">
                {isAuthenticated ? 'Connected to Google Workspace' : 'Google Authentication Required'}
              </span>
              <span className="text-slate-500 text-[11px]">
                {isAuthenticated 
                  ? `Signed in as ${googleUserEmail || 'Authorized User'} (Drive & Sheets scopes active)`
                  : 'Connect your Google account to create and manage spreadsheets with your permission.'}
              </span>
            </div>
          </div>

          <div>
            {isAuthenticated ? (
              <button
                id="sheets-modal-disconnect-btn"
                onClick={handleGoogleSignOut}
                className="text-xs text-slate-600 hover:text-rose-600 font-medium px-2.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                id="sheets-modal-google-signin-btn"
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
                className="gsi-material-button text-xs font-semibold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dadce0',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  color: '#3c4043',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(60,64,67,0.1)'
                }}
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '16px', height: '16px' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{isAuthenticating ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{authError}</span>
          </div>
        )}

        {/* Feature Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 mb-6">
          <button
            id="tab-export-audit"
            onClick={() => setActiveTab('export')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit to Sheets</span>
          </button>

          <button
            id="tab-import-urls"
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import & Batch Scan</span>
          </button>

          <button
            id="tab-leads-sync"
            onClick={() => setActiveTab('leads')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Sync Leads & CRM</span>
          </button>

          <button
            id="tab-drive-files"
            onClick={() => {
              setActiveTab('drive');
              if (isAuthenticated && recentSheets.length === 0) {
                handleLoadDriveSheets();
              }
            }}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'drive'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Drive Spreadsheets</span>
          </button>
        </div>

        {/* Tab 1: Export Active Audit */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            {currentReport ? (
              <>
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">
                        {currentReport.websiteUrl}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Overall Score: <strong className="text-slate-800">{currentReport.overallScore}/100</strong> • Scanned on {currentReport.analyzedAt}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 font-bold text-slate-700 text-[11px]">
                      {currentReport.issues.length} Issues Detected
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Spreadsheet Document Title
                    </label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="SriVexa Audit - domain.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Sheets Structure Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60">
                    <span className="text-[10px] font-bold text-emerald-800 block">Tab 1</span>
                    <span className="text-xs font-semibold text-slate-800">Executive Summary</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60">
                    <span className="text-[10px] font-bold text-emerald-800 block">Tab 2</span>
                    <span className="text-xs font-semibold text-slate-800">Issues Checklist</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60">
                    <span className="text-[10px] font-bold text-emerald-800 block">Tab 3</span>
                    <span className="text-xs font-semibold text-slate-800">7-Day Action Plan</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60">
                    <span className="text-[10px] font-bold text-emerald-800 block">Tab 4</span>
                    <span className="text-xs font-semibold text-slate-800">AI Meta & Copy</span>
                  </div>
                </div>

                {/* Export Action Button */}
                <div className="pt-2">
                  <button
                    id="sheets-export-audit-btn"
                    onClick={handleExportAudit}
                    disabled={isExporting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Generating & Styling Google Spreadsheet...</span>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                        <span>Create Google Spreadsheet in Drive</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Export Success Banner */}
                {exportResult && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 animate-in fade-in">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <h5 className="text-xs font-bold text-emerald-900">
                            Spreadsheet Successfully Created!
                          </h5>
                          <p className="text-[11px] text-emerald-700 mt-0.5">
                            Created with 4 styled audit tabs and frozen header rows.
                          </p>
                        </div>
                      </div>

                      <a
                        href={exportResult.spreadsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
                      >
                        <span>Open in Sheets</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {exportError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{exportError}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                No active website audit found. Please run a website audit from the homepage first to export it to Google Sheets.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Import URLs from Google Sheet */}
        {activeTab === 'import' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-600">
              Paste the link or ID of any Google Spreadsheet containing a list of client or competitor websites. SriVexa will scan the sheet, extract domain URLs, and let you audit them in 1-click.
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Google Sheet URL or Spreadsheet ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sheetInputUrl}
                  onChange={(e) => setSheetInputUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 font-medium"
                />
                <button
                  id="sheets-read-urls-btn"
                  onClick={handleImportUrls}
                  disabled={isImporting || !sheetInputUrl.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {isImporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  <span>Scan Sheet</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Tip: Ensure your Google account has read access to the sheet.
              </p>
            </div>

            {importError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{importError}</span>
              </div>
            )}

            {importedUrls.length > 0 && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    Found {importedUrls.length} Website URLs in &ldquo;{importedTitle}&rdquo;
                  </span>
                </div>

                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                  {importedUrls.map((url, i) => (
                    <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200/80 text-xs">
                      <span className="font-medium text-slate-800 truncate max-w-sm">{url}</span>
                      <button
                        onClick={() => {
                          if (onAuditUrlFromSheet) {
                            onAuditUrlFromSheet(url);
                            onClose();
                          }
                        }}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        Audit Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Sync Leads & CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-600">
              Sync captured website inquiries, consultation requests, and client leads directly to a dedicated Google Sheet for SriVexa Digital agency tracking.
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <span className="font-bold text-slate-900 block text-sm">
                Target Google Sheet Destination
              </span>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-600">
                  Optional: Append to existing Google Sheet ID (leave blank to create a new sheet)
                </label>
                <input
                  type="text"
                  value={existingLeadSheetId}
                  onChange={(e) => setExistingLeadSheetId(e.target.value)}
                  placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms (or leave empty)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 bg-white font-medium"
                />
              </div>

              {/* Mandatory User Confirmation Dialog per SKILL.md */}
              {existingLeadSheetId.trim() && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs">Confirmation Required:</strong>
                      <span className="text-[11px]">
                        You are about to append new client lead records into your existing Google Sheet. Confirm to execute this data update.
                      </span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={confirmDestructiveAction}
                      onChange={(e) => setConfirmDestructiveAction(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-0"
                    />
                    <span className="text-[11px] font-bold text-amber-950">
                      I confirm and authorize appending records to this existing Google Sheet
                    </span>
                  </label>
                </div>
              )}
            </div>

            <button
              id="sheets-sync-leads-btn"
              onClick={handleSyncLeads}
              disabled={isSyncingLeads || (existingLeadSheetId.trim().length > 0 && !confirmDestructiveAction)}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              {isSyncingLeads ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-300" />
                  <span>Syncing Leads with Google Sheets...</span>
                </>
              ) : (
                <>
                  <Table className="w-4 h-4 text-teal-300" />
                  <span>Sync All Leads to Google Sheet</span>
                </>
              )}
            </button>

            {leadsSyncResult && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 animate-in fade-in">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-emerald-900">
                        {leadsSyncResult.count} Leads Successfully Synced!
                      </h5>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Client names, emails, services, and notes are formatted in your spreadsheet.
                      </p>
                    </div>
                  </div>

                  <a
                    href={leadsSyncResult.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
                  >
                    <span>View Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Drive Spreadsheets */}
        {activeTab === 'drive' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">
                Recent Google Spreadsheets found in your Google Drive:
              </span>
              <button
                onClick={handleLoadDriveSheets}
                disabled={isLoadingDrive}
                className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {isLoadingDrive ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Connecting to Google Drive and fetching spreadsheets...
              </div>
            ) : recentSheets.length === 0 ? (
              <div className="py-10 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                No recent spreadsheets found or not signed in. Connect your Google account to list spreadsheets.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {recentSheets.map((file) => (
                  <div key={file.id} className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs transition-colors">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-slate-900 block truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-400">
                          Modified: {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSheetInputUrl(file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`);
                          setActiveTab('import');
                        }}
                        className="text-[11px] font-bold text-slate-700 hover:text-slate-950 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      >
                        Use in Import
                      </button>
                      <a
                        href={file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-emerald-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
