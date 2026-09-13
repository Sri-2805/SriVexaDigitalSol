import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';
import { googleSignIn } from '../services/googleAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        const user: UserAccount = {
          id: res.user.uid || `user-${Date.now()}`,
          email: res.user.email || 'user@example.com',
          name: res.user.displayName || res.user.email?.split('@')[0] || 'Marketer',
          plan: 'pro',
          createdAt: new Date().toISOString().split('T')[0]
        };
        onLoginSuccess(user);
        onClose();
      }
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setErrorMessage(err.message || 'Google authentication was cancelled or failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user: UserAccount = {
        id: `user-${Date.now()}`,
        email: email || 'user@example.com',
        name: name || (email.split('@')[0] || 'Growth Marketer'),
        plan: 'pro',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  const handleDemoSignIn = () => {
    const user: UserAccount = {
      id: 'demo-user-1',
      email: 'srivatsa.demo@srivexa.digital',
      name: 'Demo Marketer',
      plan: 'pro',
      createdAt: '2026-03-01'
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-7 animate-in fade-in zoom-in duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 font-bold text-base flex items-center justify-center mx-auto mb-3 shadow-sm">
            SV
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {isSignUp ? 'Create SriVexa Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access unlimited website audits, Google Sheets sync & progress reports.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Official Google Sign-In Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            id="auth-modal-google-btn"
            className="w-full inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-300 shadow-xs transition-all cursor-pointer"
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '18px', height: '18px', display: 'block' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            <span>{googleLoading ? 'Signing in with Google...' : 'Sign in with Google'}</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-2 text-[10px] uppercase font-bold text-slate-400 absolute">
            Or continue with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sri Vatsa"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow cursor-pointer mt-2"
          >
            <span>{isLoading ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2 text-center text-xs">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-600 hover:text-slate-950 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>

          <button
            type="button"
            onClick={handleDemoSignIn}
            className="text-teal-700 hover:text-teal-900 font-bold bg-teal-50 py-1.5 rounded-lg border border-teal-200/60"
          >
            Instant 1-Click Demo Login
          </button>
        </div>

      </div>
    </div>
  );
};
