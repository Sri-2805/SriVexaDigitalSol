/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { ScanningModal } from './components/ScanningModal';
import { LeadModal } from './components/LeadModal';
import { AuthModal } from './components/AuthModal';
import { AdminModal } from './components/AdminModal';
import { AuditHistoryModal } from './components/AuditHistoryModal';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { Footer } from './components/Footer';
import { AuditReport, AuditHistoryItem, UserAccount } from './types';
import { benchmarkReport, mockAuditHistory } from './data/mockAudits';
import { runWebsiteAudit } from './services/api';
import { initAuth, logoutGoogle } from './services/googleAuth';

export default function App() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningUrl, setScanningUrl] = useState('');
  const [pendingReport, setPendingReport] = useState<AuditReport | null>(null);
  const [history, setHistory] = useState<AuditHistoryItem[]>(mockAuditHistory);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Modals state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadDefaultService, setLeadDefaultService] = useState('General Consultation with Sri Vatsa G');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGoogleSheetsModalOpen, setIsGoogleSheetsModalOpen] = useState(false);

  useEffect(() => {
    // Listen to Google Auth state
    const unsubscribe = initAuth((user) => {
      setCurrentUser(prev => {
        if (prev) return prev;
        return {
          id: user.uid,
          email: user.email || 'user@example.com',
          name: user.displayName || user.email?.split('@')[0] || 'User',
          plan: 'pro',
          createdAt: new Date().toISOString().split('T')[0]
        };
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutGoogle();
    } catch {}
    setCurrentUser(null);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartAudit = async (url: string, forceDemo: boolean = false) => {
    setScanningUrl(url);
    setIsScanning(true);

    try {
      // Trigger scan API in background while scanning modal plays animated progress
      const auditResult = await runWebsiteAudit(url, forceDemo);
      setPendingReport(auditResult);
    } catch (e) {
      console.error('Audit execution error:', e);
      // Fallback to benchmark report
      setPendingReport({
        ...benchmarkReport,
        id: `audit-${Date.now()}`,
        websiteUrl: url.startsWith('http') ? url : `https://${url}`,
        analyzedAt: new Date().toISOString().split('T')[0],
        scanMode: 'demo',
        liveScanNotes: 'Demo Analysis Mode: Displaying benchmark diagnostic data.'
      });
    }
  };

  const handleScanAnimationComplete = () => {
    setIsScanning(false);
    if (pendingReport) {
      setReport(pendingReport);

      // Add to history
      const newHistoryItem: AuditHistoryItem = {
        id: pendingReport.id,
        websiteUrl: pendingReport.websiteUrl,
        analyzedAt: pendingReport.analyzedAt,
        overallScore: pendingReport.overallScore,
        status: pendingReport.healthStatus
      };
      setHistory(prev => [newHistoryItem, ...prev.filter(h => h.websiteUrl !== pendingReport.websiteUrl)]);

      // Scroll smoothly to results
      setTimeout(() => {
        const resultsEl = document.getElementById('audit-results-dashboard');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleRequestService = (serviceName?: string) => {
    if (serviceName) setLeadDefaultService(serviceName);
    setIsLeadModalOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Free Plan') {
      scrollToSection('home');
    } else {
      setLeadDefaultService(`Subscription: ${planName}`);
      setIsLeadModalOpen(true);
    }
  };

  const handleSelectAuditFromHistory = (url: string) => {
    handleStartAudit(url);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Global Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenAuditInput={() => scrollToSection('home')}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        
        {/* Hero Section with URL input & live preview */}
        <HeroSection
          onStartAudit={handleStartAudit}
          isLoading={isScanning}
        />

        {/* Dynamic Audit Results Dashboard (When audit has run) */}
        {report && (
          <ResultsDashboard
            report={report}
            onReAnalyze={(url) => handleStartAudit(url)}
            onRequestService={handleRequestService}
            onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
          />
        )}

        {/* Problem Section: 6 Hidden Bottlenecks */}
        <ProblemSection
          onFindIssues={() => scrollToSection('home')}
        />

        {/* Features Section: 8 Audits in One */}
        <FeaturesSection />

        {/* How It Works: 4 Simple Steps */}
        <HowItWorksSection
          onStartAudit={() => scrollToSection('home')}
        />

        {/* Pricing Section: 4 Tiers & SriVexa Services */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
          onRequestService={handleRequestService}
        />

        {/* About Section: Sri Vatsa G & SriVexa Digital */}
        <AboutSection
          onRequestConsultation={() => handleRequestService('General Consultation with Sri Vatsa G')}
        />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onRequestService={handleRequestService}
      />

      {/* Modals */}
      {isScanning && (
        <ScanningModal
          url={scanningUrl}
          onComplete={handleScanAnimationComplete}
        />
      )}

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService={leadDefaultService}
        websiteUrl={report?.websiteUrl || scanningUrl || ''}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
      />

      <AuditHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onSelectAudit={handleSelectAuditFromHistory}
      />

      <GoogleSheetsModal
        isOpen={isGoogleSheetsModalOpen}
        onClose={() => setIsGoogleSheetsModalOpen(false)}
        currentReport={report}
        onAuditUrlFromSheet={(url) => {
          setIsGoogleSheetsModalOpen(false);
          handleStartAudit(url);
        }}
      />

    </div>
  );
}

