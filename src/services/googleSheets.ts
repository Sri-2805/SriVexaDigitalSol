import { AuditReport, LeadSubmission } from '../types';
import { getAccessToken, googleSignIn } from './googleAuth';

export interface GoogleSheetsExportResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  sheetsCreated: string[];
}

export interface DriveSpreadsheetFile {
  id: string;
  name: string;
  webViewLink: string;
  modifiedTime: string;
  createdTime: string;
}

/**
 * Extracts spreadsheet ID from a full Google Sheets URL or raw ID
 */
export function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * Ensures we have a valid access token. Prompts sign-in if absent.
 */
async function ensureValidAccessToken(): Promise<string> {
  let token = await getAccessToken();
  if (!token) {
    const res = await googleSignIn();
    if (!res?.accessToken) {
      throw new Error('Google authentication required to access Google Sheets.');
    }
    token = res.accessToken;
  }
  return token;
}

/**
 * Creates and formats a complete Google Spreadsheet for an Audit Report
 */
export async function exportAuditToGoogleSheets(
  report: AuditReport, 
  customTitle?: string
): Promise<GoogleSheetsExportResult> {
  const token = await ensureValidAccessToken();
  
  const cleanDomain = report.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const title = customTitle || `SriVexa Audit - ${cleanDomain} (${report.analyzedAt})`;

  // 1. Create Spreadsheet with predefined sheets
  const createPayload = {
    properties: {
      title
    },
    sheets: [
      {
        properties: {
          title: 'Executive Summary',
          gridProperties: { frozenRowCount: 1 }
        }
      },
      {
        properties: {
          title: 'Issues Checklist',
          gridProperties: { frozenRowCount: 1 }
        }
      },
      {
        properties: {
          title: '7-Day Action Plan',
          gridProperties: { frozenRowCount: 1 }
        }
      },
      {
        properties: {
          title: 'AI Meta & Copywriting',
          gridProperties: { frozenRowCount: 1 }
        }
      }
    ]
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createPayload)
  });

  if (!createRes.ok) {
    const errJson = await createRes.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `Failed to create Google Sheet (${createRes.status})`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Prepare Tab Data
  // Tab 1: Executive Summary
  const summaryRows: (string | number)[][] = [
    ['SRIVEXA WEBSITE GROWTH AUDIT - EXECUTIVE SUMMARY', '', '', ''],
    ['Target Website', report.websiteUrl, 'Audit Date', report.analyzedAt],
    ['Overall Health Score', `${report.overallScore}/100`, 'Health Status', report.healthStatus],
    ['Scan Mode', report.scanMode === 'live' ? 'Live Website Verified' : 'Benchmark Analysis Mode', 'Scanned By', 'SriVexa AI Engine & Sri Vatsa G'],
    ['', '', '', ''],
    ['CATEGORY BREAKDOWN', '', '', ''],
    ['Category', 'Score / 100', 'Status', 'Diagnostic Assessment']
  ];

  report.categoryScores.forEach(cat => {
    summaryRows.push([
      cat.name,
      cat.score,
      cat.status,
      cat.summary
    ]);
  });

  summaryRows.push(
    ['', '', '', ''],
    ['KEY TECHNICAL & PERFORMANCE CHECKS', '', '', ''],
    ['Check / Metric', 'Measured Value', 'Status', 'Benchmark Recommendation'],
    ['Server Response Time', `${report.technicalChecks.responseTimeMs}ms`, report.technicalChecks.responseTimeMs < 500 ? 'Optimal' : 'Needs Optimization', 'Aim for under 500ms for optimal crawling & conversions'],
    ['SSL / HTTPS Encryption', report.technicalChecks.httpsEnabled ? 'Active & Valid' : 'Missing', report.technicalChecks.httpsEnabled ? 'Secure' : 'Critical', 'Mandatory for user trust and search rankings'],
    ['XML Sitemap', report.technicalChecks.sitemapFound ? 'Detected' : 'Missing', report.technicalChecks.sitemapFound ? 'Good' : 'Needs Setup', 'Assists search engines in discovering all key URLs'],
    ['Robots.txt File', report.technicalChecks.robotsTxtFound ? 'Configured' : 'Missing', report.technicalChecks.robotsTxtFound ? 'Good' : 'Needs Setup', 'Directs search engine bots efficiently']
  );

  // Tab 2: Issues Checklist
  const issuesRows: (string | number)[][] = [
    ['Severity', 'Category', 'Issue Title', 'Diagnosis & Explanation', 'Why It Matters', 'Actionable SriVexa Fix']
  ];

  report.issues.forEach(issue => {
    issuesRows.push([
      issue.severity.toUpperCase(),
      issue.category.toUpperCase(),
      issue.title,
      issue.explanation,
      issue.whyItMatters,
      issue.recommendedFix
    ]);
  });

  // Tab 3: 7-Day Action Plan
  const planRows: (string | number)[][] = [
    ['Day', 'Strategic Sprint Focus', 'Immediate Action Step', 'Implementation Guide & Details', 'Primary Metric To Watch']
  ];

  report.sevenDayPlan.forEach(plan => {
    planRows.push([
      `Day ${plan.day}`,
      plan.title,
      plan.task,
      plan.details,
      plan.metricToWatch
    ]);
  });

  // Tab 4: AI Meta & Copywriting
  const aiRows: (string | number)[][] = [
    ['Optimization Element', 'AI High-Converting Recommendation', 'Strategic Reason / Conversion Gain'],
    ['Page Title (<title>)', report.metaTags.title, 'Front-loads primary intent keywords with high CTR click magnets (under 60 chars)'],
    ['Meta Description', report.metaTags.metaDescription, 'Includes clear value proposition and active call to action in under 155 characters'],
    ['Primary Heading (<h1>)', report.metaTags.h1, 'Clarifies core offer in 3 seconds to slash bounce rates and align user intent'],
    ['Open Graph Title (og:title)', report.metaTags.ogTitle, 'Ensures professional, branded preview when shared on LinkedIn, X, and WhatsApp'],
    ['Open Graph Description (og:description)', report.metaTags.ogDescription, 'Engaging preview snippet boosting external referral traffic'],
    ['', '', ''],
    ['COPYWRITING IMPROVEMENTS', '', ''],
    ['Page Section', 'Current Copy', 'AI High-Converting Revision', 'Why It Outperforms']
  ];

  report.contentImprovements.forEach(item => {
    aiRows.push([
      item.sectionName,
      item.currentCopy,
      item.improvedCopy,
      item.whyBetter
    ]);
  });

  // 3. Batch write all values to the new spreadsheet
  const batchValuePayload = {
    valueInputOption: 'USER_ENTERED',
    data: [
      {
        range: "'Executive Summary'!A1:D" + summaryRows.length,
        values: summaryRows
      },
      {
        range: "'Issues Checklist'!A1:F" + issuesRows.length,
        values: issuesRows
      },
      {
        range: "'7-Day Action Plan'!A1:E" + planRows.length,
        values: planRows
      },
      {
        range: "'AI Meta & Copywriting'!A1:D" + aiRows.length,
        values: aiRows
      }
    ]
  };

  const writeRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(batchValuePayload)
  });

  if (!writeRes.ok) {
    const errJson = await writeRes.json().catch(() => ({}));
    console.error('Batch write values error:', errJson);
  }

  // 4. Polish Formatting (Bold header rows, background colors, auto-fit columns)
  try {
    const formatPayload = {
      requests: [
        // Style Headers for sheet 0, 1, 2, 3
        ...sheetData.sheets.map((s: any) => ({
          repeatCell: {
            range: {
              sheetId: s.properties.sheetId,
              startRowIndex: 0,
              endRowIndex: 1
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.06, green: 0.09, blue: 0.16 }, // Navy #0f172a
                textFormat: {
                  foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                  bold: true,
                  fontSize: 10
                },
                horizontalAlignment: 'LEFT'
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        })),
        // Auto-resize columns for readability across all tabs
        ...sheetData.sheets.map((s: any) => ({
          autoResizeDimensions: {
            dimensions: {
              sheetId: s.properties.sheetId,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 6
            }
          }
        }))
      ]
    };

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formatPayload)
    });
  } catch (formatErr) {
    console.warn('Formatting batch update non-fatal warning:', formatErr);
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
    title,
    sheetsCreated: ['Executive Summary', 'Issues Checklist', '7-Day Action Plan', 'AI Meta & Copywriting']
  };
}

/**
 * Syncs agency client leads to a Google Sheet
 */
export async function syncLeadsToGoogleSheets(
  leads: LeadSubmission[],
  existingSpreadsheetId?: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; totalSynced: number }> {
  const token = await ensureValidAccessToken();

  let spreadsheetId = existingSpreadsheetId ? extractSpreadsheetId(existingSpreadsheetId) : '';
  let spreadsheetUrl = '';

  const headers = [
    'Timestamp',
    'Client Name',
    'Email Address',
    'Phone / WhatsApp',
    'Business / Brand',
    'Target Website URL',
    'Service Required',
    'Status',
    'Client Message / Notes'
  ];

  const leadRows = leads.map(l => [
    l.createdAt || new Date().toISOString(),
    l.name,
    l.email,
    l.phone || '-',
    l.businessName || '-',
    l.website || l.websiteUrl || '-',
    l.serviceRequired || l.serviceInterest || 'General Audit Consultation',
    l.status || 'new',
    l.message || l.notes || '-'
  ]);

  if (!spreadsheetId) {
    // Create new sheet
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          title: `SriVexa Digital - Client Leads (${new Date().toISOString().split('T')[0]})`
        },
        sheets: [{
          properties: {
            title: 'Leads & Inquiries',
            gridProperties: { frozenRowCount: 1 }
          }
        }]
      })
    });

    if (!createRes.ok) {
      throw new Error('Failed to create Leads spreadsheet.');
    }

    const created = await createRes.json();
    spreadsheetId = created.spreadsheetId;
    spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    // Write headers and data
    const allData = [headers, ...leadRows];
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Leads %26 Inquiries'!A1:I${allData.length}?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: allData })
    });

    // Style header
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.05, green: 0.25, blue: 0.25 }, // Dark Teal
                  textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true }
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)'
            }
          }
        ]
      })
    }).catch(() => {});

  } else {
    spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    
    // Append rows to existing spreadsheet
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: leadRows })
    });
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
    totalSynced: leadRows.length
  };
}

/**
 * Reads website URLs from a user's Google Sheet
 */
export async function importUrlsFromGoogleSheet(
  spreadsheetInput: string,
  range: string = 'A1:Z100'
): Promise<{ title: string; urls: string[]; sheetCount: number }> {
  const token = await ensureValidAccessToken();
  const spreadsheetId = extractSpreadsheetId(spreadsheetInput);

  // 1. Fetch metadata
  const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!metaRes.ok) {
    throw new Error('Unable to access spreadsheet. Please verify the URL or ID and ensure you have permissions.');
  }

  const meta = await metaRes.json();
  const firstSheetTitle = meta.sheets?.[0]?.properties?.title || 'Sheet1';

  // 2. Fetch cell values
  const valRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${encodeURIComponent(firstSheetTitle)}'!${range}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!valRes.ok) {
    throw new Error(`Failed to read data from tab "${firstSheetTitle}".`);
  }

  const data = await valRes.json();
  const values: string[][] = data.values || [];

  const extractedUrls = new Set<string>();
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|org|net|io|in|co|ai|dev|app|tech|agency|me)[^\s]*)/i;

  values.forEach(row => {
    row.forEach(cell => {
      if (typeof cell === 'string') {
        const text = cell.trim();
        const match = text.match(urlRegex);
        if (match) {
          let clean = match[0].replace(/[,;)]+$/, '');
          if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
            clean = `https://${clean}`;
          }
          extractedUrls.add(clean);
        }
      }
    });
  });

  return {
    title: meta.properties?.title || 'Google Sheet',
    urls: Array.from(extractedUrls),
    sheetCount: meta.sheets?.length || 1
  };
}

/**
 * Appends or updates an audit status row inside an existing Google Sheet
 */
export async function appendAuditToSheet(
  spreadsheetInput: string,
  report: AuditReport
): Promise<{ success: boolean; spreadsheetUrl: string }> {
  const token = await ensureValidAccessToken();
  const spreadsheetId = extractSpreadsheetId(spreadsheetInput);

  const row = [
    report.analyzedAt,
    report.websiteUrl,
    report.overallScore,
    report.healthStatus,
    report.categoryScores.find(c => c.key === 'seo')?.score || '-',
    report.categoryScores.find(c => c.key === 'performance')?.score || '-',
    report.categoryScores.find(c => c.key === 'content')?.score || '-',
    report.categoryScores.find(c => c.key === 'conversion')?.score || '-',
    report.issues.filter(i => i.severity === 'critical').length,
    `https://srivexadigital.com`
  ];

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [row] })
  });

  if (!res.ok) {
    throw new Error('Failed to append row to spreadsheet.');
  }

  return {
    success: true,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
  };
}

/**
 * Lists user's recent Google Sheets from Google Drive
 */
export async function listUserGoogleSheets(): Promise<DriveSpreadsheetFile[]> {
  const token = await ensureValidAccessToken();
  
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink,modifiedTime,createdTime)&orderBy=modifiedTime desc&pageSize=12`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.files || [];
}
