import React from 'react';
import { Search, Gauge, FileText, MousePointerClick, Smartphone, Share2, Image, Server } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'SEO Audit',
      badge: '12 Checks',
      description: 'Ensure search engines index, understand, and rank your high-value pages.',
      checks: [
        'Meta title & description length',
        'H1, H2, H3 semantic hierarchy',
        'Keyword usage & search intent',
        'URL structure & canonical tags',
        'Internal & external link health',
        'Sitemap.xml & Robots.txt detection'
      ]
    },
    {
      icon: Gauge,
      title: 'Performance Audit',
      badge: 'Speed & UX',
      description: 'Identify slow loading bottlenecks that cause mobile visitors to bounce prematurely.',
      checks: [
        'Mobile & desktop load benchmarks',
        'Core Web Vitals (LCP, FID, CLS)',
        'Oversized uncompressed images',
        'Heavy render-blocking JavaScript',
        'CSS payload & DOM node count',
        'Server response time & TTFB'
      ]
    },
    {
      icon: FileText,
      title: 'Content Analysis',
      badge: 'Clarity & Copy',
      description: 'Convert technical features into compelling customer-centric value propositions.',
      checks: [
        'Value proposition clarity',
        'Reading level & scan-friendly copy',
        'Keyword relevance to commercial intent',
        'Clear heading & paragraph structure',
        'CTA clarity & persuasiveness',
        'Repetitive or cliché agency jargon'
      ]
    },
    {
      icon: MousePointerClick,
      title: 'Conversion Audit',
      badge: 'Lead Gen',
      description: 'Assess how effectively your pages turn casual website visitors into paying inquiries.',
      checks: [
        'Above-the-fold CTA visibility',
        'Immediate contact details & phone',
        'Inline lead forms & fields friction',
        'WhatsApp direct messaging trigger',
        'Transparent pricing guidelines',
        'Testimonials, reviews & trust signals'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Audit',
      badge: 'Responsive',
      description: 'Guarantee a flawless, frictionless experience for smartphone and tablet users.',
      checks: [
        'Responsive layout scaling',
        'Minimum 44px touch button sizes',
        'No horizontal scroll errors',
        'Thumb-friendly mobile navigation',
        'Sticky mobile contact bar',
        'Adaptive typography legibility'
      ]
    },
    {
      icon: Share2,
      title: 'Social Media Audit',
      badge: 'Social Proof',
      description: 'Audit social channel connections and rich preview cards when shared on chats.',
      checks: [
        'Instagram profile connection',
        'Facebook business page link',
        'LinkedIn company page presence',
        'YouTube & X (Twitter) handles',
        'Open Graph (og:title, og:image)',
        'Twitter Card rich snippet tags'
      ]
    },
    {
      icon: Image,
      title: 'Image SEO',
      badge: 'Visual Assets',
      description: 'Optimize photography and illustrations for Google Image search and fast loading.',
      checks: [
        'Missing alt attributes detection',
        'Next-gen image formats (WebP/AVIF)',
        'Oversized image file dimensions',
        'Descriptive SEO image file names',
        'Lazy-loading implementation',
        'Mobile responsive image scaling'
      ]
    },
    {
      icon: Server,
      title: 'Technical Audit',
      badge: 'Infrastructure',
      description: 'Eliminate crawl traps, broken links, and security configuration errors.',
      checks: [
        'Broken 404 links & bad routes',
        'Unnecessary 301 redirect chains',
        'SSL certificate & HTTPS protocol',
        'Robots.txt crawl permissions',
        'XML Sitemap validation',
        'Canonical tag self-referencing'
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3 border border-teal-200">
            Comprehensive Growth Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            8 Audits in One Unified Platform
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From deep technical code to customer-facing copy, SriVexa analyzes every lever that influences your Google ranking and conversion rate.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {feat.description}
                  </p>

                  <div className="border-t border-slate-100 pt-3">
                    <ul className="space-y-1.5 text-xs text-slate-500">
                      {feat.checks.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
