export type ScanMode = 'live' | 'demo';

export interface CategoryScore {
  name: string;
  key: 'seo' | 'performance' | 'content' | 'conversion' | 'technical' | 'mobile';
  score: number;
  benchmark: number;
  status: 'Good' | 'Needs Improvement' | 'Critical';
  summary: string;
}

export type IssueSeverity = 'critical' | 'warning' | 'suggestion';

export interface AuditIssue {
  id: string;
  category: 'seo' | 'performance' | 'content' | 'conversion' | 'technical' | 'mobile';
  severity: IssueSeverity;
  title: string;
  explanation: string;
  whyItMatters: string;
  recommendedFix: string;
  snippet?: string;
}

export interface AIRecommendation {
  id: string;
  issue: string;
  whyItMatters: string;
  recommendation: string;
  copyableText: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface MetaTagSet {
  title: string;
  metaDescription: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
}

export interface ContentImprovementItem {
  id: string;
  sectionName: string;
  currentCopy: string;
  improvedCopy: string;
  whyBetter: string;
}

export interface ConversionAuditData {
  score: number;
  status: string;
  factors: {
    name: string;
    found: boolean;
    detail: string;
  }[];
  threeThingsToFixFirst: {
    rank: number;
    title: string;
    description: string;
    action: string;
  }[];
}

export interface SocialAuditItem {
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube' | 'X';
  found: boolean;
  url?: string;
  notes: string;
}

export interface BrokenLinkItem {
  url: string;
  status: number | string;
  issue: string;
  action: string;
}

export interface TechnicalChecks {
  sitemapFound: boolean;
  sitemapUrl?: string;
  robotsTxtFound: boolean;
  robotsTxtUrl?: string;
  canonicalFound: boolean;
  canonicalUrl?: string;
  httpsEnabled: boolean;
  hstsEnabled: boolean;
  responseTimeMs: number;
}

export interface PriorityActionItem {
  priority: number;
  impact: 'High Impact' | 'Medium Impact' | 'Low Impact';
  title: string;
  whyItMatters: string;
  estimatedEffort: string;
  actionStep: string;
}

export interface DayGrowthPlanItem {
  day: number;
  title: string;
  task: string;
  details: string;
  metricToWatch: string;
}

export interface CompetitorComparison {
  competitorName: string;
  url: string;
  overallScore: number;
  seoScore: number;
  perfScore: number;
  contentScore: number;
  conversionScore: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
}

export interface AuditReport {
  id: string;
  websiteUrl: string;
  analyzedAt: string;
  scanMode: ScanMode;
  liveScanNotes?: string;
  overallScore: number;
  healthStatus: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical';
  summaryQuote: string;
  categoryScores: CategoryScore[];
  issues: AuditIssue[];
  aiRecommendations: AIRecommendation[];
  metaTags: MetaTagSet;
  contentImprovements: ContentImprovementItem[];
  conversionAudit: ConversionAuditData;
  socialPresence: {
    platforms: SocialAuditItem[];
    ogTagsPresent: boolean;
    twitterCardPresent: boolean;
  };
  brokenLinks: BrokenLinkItem[];
  technicalChecks: TechnicalChecks;
  priorityActions: PriorityActionItem[];
  sevenDayPlan: DayGrowthPlanItem[];
  competitors: CompetitorComparison[];
}

export interface UserAuditRecord {
  id: string;
  websiteUrl: string;
  score: number;
  date: string;
  status: string;
  reportId: string;
}

export interface AuditHistoryItem {
  id: string;
  websiteUrl: string;
  analyzedAt: string;
  overallScore: number;
  status: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  website?: string;
  websiteUrl?: string;
  serviceRequired?: string;
  serviceInterest?: string;
  notes?: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'closed';
}

export interface AdminStats {
  totalUsers: number;
  totalAudits: number;
  websitesAnalyzed: number;
  averageWebsiteScore: number;
  totalLeads: number;
  totalServiceRequests: number;
  commonIssues: { issue: string; count: number; category: string }[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'expert';
  createdAt: string;
}
