import React from 'react';
import { ShieldCheck, Target, Award, Rocket, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

interface AboutProps {
  onRequestConsultation: () => void;
}

export const AboutSection: React.FC<AboutProps> = ({ onRequestConsultation }) => {
  const serviceOfferings = [
    {
      title: 'Website Development',
      price: 'from ₹3,000',
      description: 'Clean, fast, responsive websites engineered with modern frameworks designed to generate leads.'
    },
    {
      title: 'SEO & Performance Optimization',
      price: 'from ₹300',
      description: 'Comprehensive crawl fixing, structured metadata, Core Web Vitals optimization, and keyword architecture.'
    },
    {
      title: 'Digital Marketing Strategy',
      price: 'Tailored Sprints',
      description: 'Performance marketing campaigns focused on measurable ROI, lower cost-per-lead, and high conversion.'
    },
    {
      title: 'Marketing Creative & Posters',
      price: '₹300 – ₹500',
      description: 'High-contrast social posters, ad visual assets, and campaign banners that arrest scrolling.'
    },
    {
      title: 'Conversion Rate Optimization',
      price: 'Audit & Overhaul',
      description: 'Friction elimination, clear call-to-action placement, social proof placement, and customer-centric copy.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3 border border-teal-200">
            About the Founder & Company
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Businesses That Want Real Growth, Not Theoretical Jargon.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Most digital agencies overwhelm business owners with 50-page technical PDFs full of confusing acronyms. SriVexa Digital was founded on a simple premise: identify the exact bottlenecks stopping your website from converting, and give you an uncomplicated roadmap to fix them.
          </p>
        </div>

        {/* Founder Bio Card */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Avatar / Badge */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-3xl shadow-md border-2 border-teal-400">
                <span className="text-teal-400">S</span>VG
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-4">Sri Vatsa G</h3>
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mt-0.5">
                CEO & Founder | Digital & Performance Marketer
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">
                SriVexa Digital
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                  Bangalore / Remote
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                  Founder-Led
                </span>
              </div>
            </div>

            {/* Right Bio */}
            <div className="lg:col-span-8 space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                "Hello, I’m <strong>Sri Vatsa G</strong>. As a digital and performance marketer, I’ve seen hundreds of startups and local businesses spend hard-earned money on advertising, only to send traffic to websites that don’t explain what they do, load at a crawl on mobile phones, or have broken contact buttons."
              </p>
              <p>
                "We built the <strong>SriVexa AI Website Growth Auditor</strong> to democratize enterprise-grade website auditing. You shouldn't have to be a senior software engineer to know why your website isn't ranking on Google or why visitors leave without calling."
              </p>
              <p>
                "Whether you just use our free AI audit to guide your internal team, or hire SriVexa Digital to rebuild your web presence from the ground up, our objective is identical: <strong>turn your digital presence into a measurable growth engine.</strong>"
              </p>

              <div className="pt-2">
                <button
                  id="about-talk-founder-btn"
                  onClick={onRequestConsultation}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-teal-300" />
                  <span>Connect with Sri Vatsa G</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SriVexa Digital Services Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Services Offered by SriVexa Digital
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Beyond software, we provide turnkey execution tailored for Indian and international businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceOfferings.map((service, i) => (
              <div 
                key={i} 
                className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded inline-block mb-2">
                    {service.price}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
