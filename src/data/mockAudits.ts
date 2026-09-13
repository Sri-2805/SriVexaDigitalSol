import { AuditReport, UserAuditRecord } from '../types';

export const benchmarkReport: AuditReport = {
  id: 'audit-srivexa-sample-001',
  websiteUrl: 'https://example-saas.com',
  analyzedAt: '2026-09-13',
  scanMode: 'demo',
  liveScanNotes: 'Demo Benchmark Scan — Showing complete audit diagnostic data.',
  overallScore: 74,
  healthStatus: 'Needs Improvement',
  summaryQuote: 'Your website has solid technical foundations and decent performance, but critical gaps in homepage call-to-actions, meta descriptions, and social trust signals are dampening your visitor-to-lead conversion rate.',
  categoryScores: [
    {
      name: 'SEO',
      key: 'seo',
      score: 78,
      benchmark: 85,
      status: 'Needs Improvement',
      summary: 'Page titles are present, but missing meta description and weak internal links hinder organic CTR.'
    },
    {
      name: 'Performance',
      key: 'performance',
      score: 82,
      benchmark: 88,
      status: 'Good',
      summary: 'Core Web Vitals are within reasonable bounds; uncompressed hero images can be optimized.'
    },
    {
      name: 'Content',
      key: 'content',
      score: 69,
      benchmark: 80,
      status: 'Needs Improvement',
      summary: 'Copy is informative but lacks customer-centric value propositions and clear action prompts.'
    },
    {
      name: 'Conversion',
      key: 'conversion',
      score: 61,
      benchmark: 75,
      status: 'Critical',
      summary: 'Primary CTA is ambiguous ("Learn More"); contact info and trust proofs are buried below the fold.'
    },
    {
      name: 'Technical',
      key: 'technical',
      score: 80,
      benchmark: 90,
      status: 'Good',
      summary: 'HTTPS and robots.txt are active; two dead link redirects need quick resolution.'
    },
    {
      name: 'Mobile',
      key: 'mobile',
      score: 76,
      benchmark: 85,
      status: 'Needs Improvement',
      summary: 'Responsive layout works well, but touch targets on mobile CTA buttons need more spacing.'
    }
  ],
  issues: [
    {
      id: 'iss-1',
      category: 'seo',
      severity: 'critical',
      title: 'Missing Meta Description Tag',
      explanation: 'The homepage HTML is missing a <meta name="description"> tag in the header section.',
      whyItMatters: 'Search engines display arbitrary text snippets instead of your tailored pitch, significantly lowering click-through rates (CTR) from search result pages.',
      recommendedFix: 'Add a 150-160 character description highlighting your core benefit, target audience, and primary keyword.',
      snippet: '<meta name="description" content="Scale your business with SriVexa Digital’s data-driven growth marketing and SEO audit services. Get a free website review today.">'
    },
    {
      id: 'iss-2',
      category: 'conversion',
      severity: 'critical',
      title: 'Weak or Ambiguous Homepage CTA',
      explanation: 'The primary above-the-fold button currently reads "Learn More" with no incentive or clear next step.',
      whyItMatters: 'Visitors leave without converting because they are not guided toward a high-value action (booking a call, requesting a quote, or initiating a trial).',
      recommendedFix: 'Change button copy to a direct value driver: "Get Free Growth Audit" or "Schedule 15-Min Strategy Call".',
      snippet: '<button class="cta-btn">Get Free Consultation →</button>'
    },
    {
      id: 'iss-3',
      category: 'performance',
      severity: 'warning',
      title: 'Images Missing Alt Text & Optimization',
      explanation: '4 hero and product showcase images lack alt attributes and exceed 800KB in raw PNG format.',
      whyItMatters: 'Hurts search engine image indexing, damages accessibility compliance, and adds 1.2s to mobile load times.',
      recommendedFix: 'Compress images to WebP/AVIF format and provide descriptive alt text with contextual keywords.',
      snippet: '<img src="/hero.webp" alt="SriVexa Growth Analytics Dashboard Preview" loading="lazy" />'
    },
    {
      id: 'iss-4',
      category: 'seo',
      severity: 'warning',
      title: 'Improper Heading Structure (H1 / H2 Hierarchy)',
      explanation: 'Found multiple H1 tags on the homepage and skipped from H1 directly to H3 in service blocks.',
      whyItMatters: 'Search crawlers use semantic heading hierarchy to determine the thematic hierarchy and relative importance of your offerings.',
      recommendedFix: 'Maintain exactly one primary H1 for the core brand proposition, then nest subtopics strictly under H2 and H3 tags.'
    },
    {
      id: 'iss-5',
      category: 'seo',
      severity: 'warning',
      title: 'Missing Social Sharing Metadata (Open Graph & Twitter Cards)',
      explanation: 'No og:title, og:description, or og:image tags are present in the head section.',
      whyItMatters: 'When visitors or clients share your link on WhatsApp, LinkedIn, or Twitter, it appears as a blank URL without an enticing preview image or headline.',
      recommendedFix: 'Add standard Open Graph and Twitter Card tags with a custom 1200x630px branded preview image.'
    },
    {
      id: 'iss-6',
      category: 'seo',
      severity: 'suggestion',
      title: 'Underutilized Internal Linking',
      explanation: 'Service pages and blog items do not link back to core commercial service inquiry pages.',
      whyItMatters: 'Internal links distribute page authority and keep visitors exploring relevant solutions.',
      recommendedFix: 'Include 2-3 contextual links in every case study or article pointing toward high-intent contact pages.'
    },
    {
      id: 'iss-7',
      category: 'conversion',
      severity: 'suggestion',
      title: 'Absence of Customer Proof & Testimonials Above the Fold',
      explanation: 'No client logos, metrics, or quotes are visible before scrolling down 1,200 pixels.',
      whyItMatters: 'First-time visitors decide whether to trust your brand in less than 4 seconds. Visible social proof removes buying friction.',
      recommendedFix: 'Place a clean 3-part trust strip right under the hero headline featuring client results, logos, or review badges.'
    }
  ],
  aiRecommendations: [
    {
      id: 'rec-1',
      issue: 'Homepage has no clear conversion CTA.',
      whyItMatters: 'Visitors may understand your service but still not know what specific action they should take right now.',
      recommendation: 'Replace generic CTAs such as "Learn More" with a specific action such as "Get a Free Consultation" or "Request a Quote". Add secondary low-friction option like "WhatsApp Us".',
      copyableText: 'Get Free Consultation →',
      category: 'Conversion Rate',
      impact: 'High'
    },
    {
      id: 'rec-2',
      issue: 'Headline is feature-focused rather than outcome-focused.',
      whyItMatters: 'Prospective clients care about business growth, revenue, and time saved before learning your internal process.',
      recommendation: 'Rewrite hero headline to lead with the tangible business result: "Turn Website Visitors into Paying Clients" rather than "Digital Solutions & Services".',
      copyableText: 'Find What’s Holding Your Website Back — And Get an AI-Powered Plan to Fix It.',
      category: 'Content Copywriting',
      impact: 'High'
    },
    {
      id: 'rec-3',
      issue: 'Contact information requires multiple clicks to discover.',
      whyItMatters: 'High-intent prospects will bounce to a competitor if phone, email, or a quick chat button is difficult to spot.',
      recommendation: 'Pin a clean header phone/email snippet and add a floating WhatsApp contact trigger on the bottom right.',
      copyableText: 'Direct Growth Hotline: +91 (Business Phone) | WhatsApp Quick Connect',
      category: 'Lead Capture',
      impact: 'Medium'
    }
  ],
  metaTags: {
    title: 'SriVexa AI Growth Auditor | Fix Website SEO & Conversion Bottlenecks',
    metaDescription: 'Audit your website for SEO, speed, content, and conversion issues in 60 seconds. Get clear, actionable AI recommendations without technical jargon.',
    h1: 'Turn Your Website Into a Predictable Growth Engine',
    ogTitle: 'SriVexa AI Website Growth Auditor — Free Diagnostic Scan',
    ogDescription: 'Find hidden SEO penalties, performance bottlenecks, and missed leads. Instant actionable audit report for founders and marketers.'
  },
  contentImprovements: [
    {
      id: 'ci-1',
      sectionName: 'Homepage Headline',
      currentCopy: 'Welcome to our digital agency. We provide full-service digital marketing solutions for businesses of all sizes.',
      improvedCopy: 'Turn Your Website Into a Growth Engine — Proven SEO, Performance & Conversion Strategies for Growing Brands.',
      whyBetter: 'Focuses on client ROI and concrete growth instead of vague generic agency jargon.'
    },
    {
      id: 'ci-2',
      sectionName: 'Primary Call to Action (CTA)',
      currentCopy: 'Learn More About Us',
      improvedCopy: 'Claim Your Free Website Growth Audit →',
      whyBetter: 'Offers an immediate, high-value asset with zero commitment friction.'
    },
    {
      id: 'ci-3',
      sectionName: 'About & Value Proposition',
      currentCopy: 'We are passionate about digital excellence and utilize cutting-edge tools to maximize brand presence.',
      improvedCopy: 'We help ambitious business owners identify hidden website leaks, outrank competitors on Google, and convert clicks into paying customers.',
      whyBetter: 'Speaks directly to the business owner’s pains: lost leads, poor search rankings, and wasted ad spend.'
    },
    {
      id: 'ci-4',
      sectionName: 'Service Description (SEO Audit)',
      currentCopy: 'Our SEO audit scans your website for technical tags and provides a comprehensive spreadsheet of data.',
      improvedCopy: 'Clear, prioritized SEO roadmap showing exactly which technical fixes and keywords will drive organic traffic this quarter.',
      whyBetter: 'Replaces intimidating raw data spreadsheets with a clear, prioritized business roadmap.'
    }
  ],
  conversionAudit: {
    score: 61,
    status: 'Needs Urgent Action',
    factors: [
      { name: 'Clear Value Proposition', found: true, detail: 'Present in hero section, but wording needs tighter focus.' },
      { name: 'Primary CTA Visibility', found: true, detail: 'Above the fold, but contrast and button label are weak.' },
      { name: 'Direct Contact Details', found: false, detail: 'Phone & email only appear in footer text.' },
      { name: 'Lead Capture Form', found: false, detail: 'Requires clicking to a separate /contact page.' },
      { name: 'WhatsApp Quick Connect', found: false, detail: 'No direct instant messenger trigger found.' },
      { name: 'Transparent Pricing Clues', found: false, detail: 'No pricing guidelines or starter packages listed.' },
      { name: 'Client Testimonials', found: true, detail: '2 short quotes found, but missing client photos & metrics.' },
      { name: 'Trust & Security Badges', found: false, detail: 'No SSL verification or guarantee seals shown near form.' },
      { name: 'Social Proof / Case Studies', found: false, detail: 'No before/after traffic or revenue metrics demonstrated.' }
    ],
    threeThingsToFixFirst: [
      {
        rank: 1,
        title: 'Add a stronger, high-contrast homepage CTA',
        description: 'Replace "Learn More" with an action-oriented offer like "Get My Free Audit" in a prominent color.',
        action: 'Implement a bold button with high color contrast in the top 600px of the viewport.'
      },
      {
        rank: 2,
        title: 'Make contact information immediately accessible',
        description: 'Provide an easy-to-spot phone number in the navigation bar and an instant WhatsApp link for mobile visitors.',
        action: 'Add phone & WhatsApp icons to the top navigation header and sticky mobile bar.'
      },
      {
        rank: 3,
        title: 'Add customer proof & measurable case results',
        description: 'Feature 2-3 genuine client success stories with tangible metrics right below the hero fold.',
        action: 'Display client logos, review star ratings, or quantifiable outcome metrics (+45% organic leads).'
      }
    ]
  },
  socialPresence: {
    platforms: [
      { platform: 'Instagram', found: true, url: 'https://instagram.com/srivexadigital', notes: 'Active link detected in footer.' },
      { platform: 'Facebook', found: false, notes: 'No Facebook business page link detected in markup.' },
      { platform: 'LinkedIn', found: true, url: 'https://linkedin.com/company/srivexa', notes: 'Company profile linked.' },
      { platform: 'YouTube', found: false, notes: 'No video channel linked in page code.' },
      { platform: 'X', found: true, url: 'https://x.com/srivexadigital', notes: 'Handle linked in footer.' }
    ],
    ogTagsPresent: false,
    twitterCardPresent: false
  },
  brokenLinks: [
    { url: '/services', status: 404, issue: 'Broken page link found in navigation dropdown', action: 'Update navigation href to /#features or correct destination URL' },
    { url: '/contact', status: 404, issue: 'Footer link leads to dead endpoint', action: 'Point link to live contact form anchor or restore page' },
    { url: '/about', status: 301, issue: 'Internal redirect chain detected (/about -> /about-us)', action: 'Update direct link to avoid latency and crawl budget waste' }
  ],
  technicalChecks: {
    sitemapFound: true,
    sitemapUrl: '/sitemap.xml',
    robotsTxtFound: true,
    robotsTxtUrl: '/robots.txt',
    canonicalFound: true,
    canonicalUrl: 'https://example-saas.com',
    httpsEnabled: true,
    hstsEnabled: true,
    responseTimeMs: 340
  },
  priorityActions: [
    {
      priority: 1,
      impact: 'High Impact',
      title: 'Fix Homepage CTA & Above-the-Fold Offer',
      whyItMatters: 'Immediate 15% to 35% lift in lead generation by guiding existing traffic toward a clear next step.',
      estimatedEffort: '15 Minutes',
      actionStep: 'Update hero button text to "Get Free Growth Audit" and connect to simple intake form.'
    },
    {
      priority: 2,
      impact: 'High Impact',
      title: 'Add Missing Meta Description & Social Open Graph Tags',
      whyItMatters: 'Stops Google from generating random snippet text and ensures branded rich previews when shared on messaging apps.',
      estimatedEffort: '20 Minutes',
      actionStep: 'Paste generated 155-character meta tag and 1200x630 preview image in the <head> tag.'
    },
    {
      priority: 3,
      impact: 'Medium Impact',
      title: 'Optimize & Compress 4 Large Hero Images',
      whyItMatters: 'Reduces page weight by 1.8MB, speeding up mobile first contentful paint by over 1.2 seconds.',
      estimatedEffort: '30 Minutes',
      actionStep: 'Convert PNG images to modern WebP format and specify width/height dimensions.'
    },
    {
      priority: 4,
      impact: 'Medium Impact',
      title: 'Improve Service Page Content & Clear Value Proposition',
      whyItMatters: 'Explains specific business outcomes to reduce bounce rates for visitors arriving from search.',
      estimatedEffort: '1 Hour',
      actionStep: 'Adopt the AI-suggested customer-centric headlines and bulleted deliverables.'
    },
    {
      priority: 5,
      impact: 'Low Impact',
      title: 'Fix 2 Broken Internal Navigation Links',
      whyItMatters: 'Prevents visitors hitting 404 errors and preserves Googlebot crawl efficiency.',
      estimatedEffort: '10 Minutes',
      actionStep: 'Correct /services and /contact routes in header and footer component.'
    }
  ],
  sevenDayPlan: [
    {
      day: 1,
      title: 'Fix Technical SEO & Broken Links',
      task: 'Repair 404 links, verify sitemap submission in Google Search Console, and confirm HTTPS canonical tag.',
      details: 'Inspect your navigation links to ensure zero dead ends for users and search crawlers.',
      metricToWatch: '0 broken links in site crawler'
    },
    {
      day: 2,
      title: 'Improve Homepage Title & Meta Description',
      task: 'Deploy target primary keyword in H1, title tag (under 60 chars), and compelling meta description (under 155 chars).',
      details: 'Ensure unique, enticing snippet copy that drives clicks over search rivals.',
      metricToWatch: 'Search Console organic Click-Through Rate (CTR)'
    },
    {
      day: 3,
      title: 'Revamp Homepage CTA & Friction Points',
      task: 'Replace generic buttons with direct outcome-driven copy, and embed an accessible WhatsApp / phone trigger.',
      details: 'Make conversion friction as close to zero as possible for both desktop and mobile visitors.',
      metricToWatch: 'Button clicks & lead form submissions'
    },
    {
      day: 4,
      title: 'Optimize Images & Core Web Vitals',
      task: 'Compress hero graphics to WebP under 150KB and add missing descriptive alt text.',
      details: 'Faster load speed directly improves mobile bounce rates and search quality signals.',
      metricToWatch: 'Largest Contentful Paint (LCP < 2.5s)'
    },
    {
      day: 5,
      title: 'Improve Core Service Content',
      task: 'Rewrite service descriptions around client outcomes, deliverables, and transparent pricing packages.',
      details: 'Answer the customer’s top questions before they have to ask.',
      metricToWatch: 'Time on page & pages per session'
    },
    {
      day: 6,
      title: 'Add Social Proof & Trust Signals',
      task: 'Add client testimonials, review badges, and security guarantees right beneath the hero section.',
      details: 'Build instant authority for first-time visitors who are evaluating your credibility.',
      metricToWatch: 'Bounce rate reduction'
    },
    {
      day: 7,
      title: 'Re-Analyze Website & Track Growth',
      task: 'Run a fresh SriVexa audit to verify health score improvements and benchmark progress.',
      details: 'Celebrate score jump and document next iteration priorities.',
      metricToWatch: 'Target health score: 85+/100'
    }
  ],
  competitors: [
    {
      competitorName: 'Your Website',
      url: 'https://example-saas.com',
      overallScore: 74,
      seoScore: 78,
      perfScore: 82,
      contentScore: 69,
      conversionScore: 61,
      strengths: ['Clean code base', 'Decent desktop speed', 'Clean visual aesthetic'],
      weaknesses: ['Vague CTAs', 'Missing meta description', 'No social proof in hero'],
      opportunities: ['Convert visitors with WhatsApp quick chat', 'Add client case results']
    },
    {
      competitorName: 'Competitor A (Market Leader)',
      url: 'https://competitor-alpha.com',
      overallScore: 82,
      seoScore: 86,
      perfScore: 79,
      contentScore: 84,
      conversionScore: 81,
      strengths: ['Prominent sticky CTA', 'Strong meta tags', 'Rich customer testimonials'],
      weaknesses: ['Slightly slower mobile load time (lots of video scripts)', 'Cluttered footer'],
      opportunities: ['Outperform them on page speed and cleaner mobile experience']
    },
    {
      competitorName: 'Competitor B (Niche Challenger)',
      url: 'https://competitor-beta.io',
      overallScore: 79,
      seoScore: 81,
      perfScore: 85,
      contentScore: 76,
      conversionScore: 74,
      strengths: ['Fast WebP images', 'Clear starter pricing', 'Active social links'],
      weaknesses: ['Weak technical heading hierarchy', 'Limited educational content'],
      opportunities: ['Publish in-depth service guides and outrank them on commercial keywords']
    }
  ]
};

export const sampleAuditHistory: UserAuditRecord[] = [
  {
    id: 'hist-1',
    websiteUrl: 'https://example-saas.com',
    score: 81,
    date: 'Sep 20, 2026',
    status: 'Improved (+7 pts)',
    reportId: 'audit-002'
  },
  {
    id: 'hist-2',
    websiteUrl: 'https://example-saas.com',
    score: 74,
    date: 'Sep 13, 2026',
    status: 'Baseline Scan',
    reportId: 'audit-srivexa-sample-001'
  },
  {
    id: 'hist-3',
    websiteUrl: 'https://srivexadigital.com',
    score: 91,
    date: 'Sep 05, 2026',
    status: 'Optimized',
    reportId: 'audit-003'
  }
];

export const mockAuditHistory = [
  {
    id: 'hist-1',
    websiteUrl: 'https://example-saas.com',
    overallScore: 81,
    analyzedAt: '2026-09-20',
    status: 'Improved (+7 pts)'
  },
  {
    id: 'hist-2',
    websiteUrl: 'https://example-saas.com',
    overallScore: 74,
    analyzedAt: '2026-09-13',
    status: 'Baseline Scan'
  },
  {
    id: 'hist-3',
    websiteUrl: 'https://srivexadigital.com',
    overallScore: 91,
    analyzedAt: '2026-09-05',
    status: 'Optimized'
  }
];
