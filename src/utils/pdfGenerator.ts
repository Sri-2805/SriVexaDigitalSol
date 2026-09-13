import jsPDF from 'jspdf';
import { AuditReport } from '../types';

export function generateAuditPDF(report: AuditReport) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SriVexa AI Website Growth Auditor', 14, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('SriVexa Digital  |  Founder: Sri Vatsa G  |  Digital & Performance Marketing', 14, 22);
  doc.text(`Report Generated: ${report.analyzedAt}  |  Scan Mode: ${report.scanMode.toUpperCase()}`, 14, 27);

  y = 42;

  // Overview Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Audited URL: ${report.websiteUrl}`, 20, y + 9);

  doc.setFontSize(16);
  doc.setTextColor(13, 148, 136); // teal-600
  doc.text(`Overall Health Score: ${report.overallScore}/100`, 20, y + 20);

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.text(`Status: ${report.healthStatus}`, 115, y + 20);

  y += 38;

  // Category Scores Table
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Category Performance Breakdown', 14, y);
  y += 6;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('Category', 18, y + 5);
  doc.text('Score', 60, y + 5);
  doc.text('Benchmark', 85, y + 5);
  doc.text('Status', 115, y + 5);
  doc.text('Core Insight', 145, y + 5);
  y += 9;

  report.categoryScores.forEach((cat) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(cat.name, 18, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`${cat.score}/100`, 60, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${cat.benchmark}/100`, 85, y);
    doc.text(cat.status, 115, y);
    const shortSummary = cat.summary.length > 38 ? cat.summary.substring(0, 35) + '...' : cat.summary;
    doc.text(shortSummary, 145, y);
    y += 6;
  });

  y += 6;

  // Critical Issues & Warnings
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. Critical Issues & Diagnostic Warnings', 14, y);
  y += 7;

  report.issues.slice(0, 4).forEach((issue, idx) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    const icon = issue.severity === 'critical' ? '[CRITICAL]' : issue.severity === 'warning' ? '[WARNING]' : '[SUGGESTION]';
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(issue.severity === 'critical' ? 225 : issue.severity === 'warning' ? 180 : 30, 29, 72);
    doc.text(`${idx + 1}. ${icon} ${issue.title}`, 14, y);
    y += 5;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Why it matters: ${issue.whyItMatters}`, 18, y, { maxWidth: pageWidth - 36 });
    y += 6;
    doc.setTextColor(13, 148, 136);
    doc.text(`Fix: ${issue.recommendedFix}`, 18, y, { maxWidth: pageWidth - 36 });
    y += 8;
  });

  // Page 2: AI Recommendations & 7-Day Plan
  doc.addPage();
  y = 20;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('3. AI Priority Recommendations (SriVexa Growth Engine)', 14, y);
  y += 8;

  report.aiRecommendations.forEach((rec, idx) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, pageWidth - 28, 20, 1.5, 1.5, 'F');

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`Priority ${idx + 1}: ${rec.issue} [${rec.impact} Impact]`, 18, y + 6);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(rec.recommendation, 18, y + 11, { maxWidth: pageWidth - 36 });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text(`Suggested Copy: "${rec.copyableText}"`, 18, y + 16, { maxWidth: pageWidth - 36 });

    y += 24;
  });

  y += 4;

  // 7-Day Growth Plan
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('4. SriVexa 7-Day Turnaround Growth Plan', 14, y);
  y += 6;

  report.sevenDayPlan.forEach((plan) => {
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`Day ${plan.day}: ${plan.title}`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`- ${plan.task}`, 48, y, { maxWidth: pageWidth - 65 });
    y += 6;
  });

  y += 8;

  // SriVexa Digital Footer Callout
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(14, y, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 95, 70); // emerald-800
  doc.text('Want SriVexa Digital to implement these fixes for you?', 20, y + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(4, 120, 87);
  doc.text('SEO Site Audit (₹300)  |  Poster Design (₹300-₹500)  |  Product Promotion (₹500)  |  Website Dev (₹3,000)', 20, y + 15);
  doc.text('Contact Sri Vatsa G (CEO & Founder, Digital & Performance Marketer) via SriVexa Digital.', 20, y + 21);

  // Save the PDF
  const safeName = report.websiteUrl.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 24);
  doc.save(`SriVexa_Audit_${safeName}_${report.analyzedAt}.pdf`);
}
