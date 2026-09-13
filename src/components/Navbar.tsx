import React from 'react';
import { Sparkles, ShieldCheck, User, BarChart3, ArrowRight } from 'lucide-react';
import { UserAccount } from '../types';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuditInput: () => void;
  onOpenAuthModal: () => void;
  onOpenAdminModal: () => void;
  onOpenHistoryModal: () => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenAuditInput,
  onOpenAuthModal,
  onOpenAdminModal,
  onOpenHistoryModal,
  currentUser,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer select-none group"
          id="nav-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-sm border border-slate-800 transition-transform group-hover:scale-105">
            <span className="text-teal-400">S</span>V
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">SriVexa</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                AI Auditor
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">by SriVexa Digital</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button 
            id="nav-link-home"
            onClick={() => onNavigate('home')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            id="nav-link-features"
            onClick={() => onNavigate('features')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            id="nav-link-how-it-works"
            onClick={() => onNavigate('how-it-works')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button 
            id="nav-link-pricing"
            onClick={() => onNavigate('pricing')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button 
            id="nav-link-about"
            onClick={() => onNavigate('about')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          
          {/* Admin shortcut */}
          <button
            id="nav-admin-btn"
            onClick={onOpenAdminModal}
            title="SriVexa Founder & Admin Panel"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Admin</span>
          </button>

          {/* User Account / History */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-my-audits-btn"
                onClick={onOpenHistoryModal}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
                <span>My Audits</span>
              </button>
              <button
                id="nav-logout-btn"
                onClick={onLogout}
                className="text-xs text-slate-500 hover:text-rose-600 px-2 py-1 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              id="nav-login-btn"
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Login</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            id="nav-primary-analyze-btn"
            onClick={onOpenAuditInput}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all transform active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Analyze My Website</span>
          </button>
        </div>

      </div>
    </header>
  );
};
