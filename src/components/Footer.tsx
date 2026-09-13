import React from 'react';
import { Sparkles, ShieldCheck, Mail, Phone, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onRequestService: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestService }) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 font-black text-lg flex items-center justify-center">
                SV
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">SriVexa</span>
                <span className="text-xs text-teal-400 font-semibold ml-1.5 px-2 py-0.5 rounded-full bg-teal-950 border border-teal-800">
                  AI Growth Auditor
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              “Find what’s holding your website back — and get an AI-powered plan to fix it.” Uncomplicating SEO, performance, and conversion for growing businesses.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>Founded by <strong className="text-white">Sri Vatsa G</strong></p>
              <p className="text-slate-500">CEO & Founder | Digital & Performance Marketer</p>
              <p className="text-teal-400 font-medium">SriVexa Digital • Bangalore / Global</p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Audit Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors cursor-pointer">
                  SEO Analysis Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors cursor-pointer">
                  Speed & Core Web Vitals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors cursor-pointer">
                  Conversion & Trust Audit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors cursor-pointer">
                  AI Meta Tag Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors cursor-pointer">
                  AI Copywriting Fixes
                </button>
              </li>
            </ul>
          </div>

          {/* SriVexa Digital Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">SriVexa Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onRequestService('SEO Site Audit (₹300)')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  SEO Site Audit (₹300)
                </button>
              </li>
              <li>
                <button onClick={() => onRequestService('Poster Design (₹300-₹500)')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Poster Design (₹300–₹500)
                </button>
              </li>
              <li>
                <button onClick={() => onRequestService('Product Promotion (₹500)')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Product Promotion (₹500)
                </button>
              </li>
              <li>
                <button onClick={() => onRequestService('Website Development (₹3,000)')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Website Dev (₹3,000)
                </button>
              </li>
              <li>
                <button onClick={() => onRequestService('General Consultation')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Performance Marketing
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Sri Vatsa G
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  Methodology & Rules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Plans & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onRequestService('Direct Inquiry')} className="hover:text-white transition-colors cursor-pointer">
                  Contact SriVexa Team
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SriVexa Digital. All rights reserved. Built with precision for growing businesses.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Sri Vatsa G, CEO & Founder</span>
            <span>•</span>
            <span>Digital & Performance Marketer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
