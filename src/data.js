// ---------------------------------------------------------------------------
// Balance Sheet Flux Sol — synthetic data model
// All figures are illustrative (USD millions unless noted). Region toggles
// scale the North America baseline by a fixed factor so every module stays
// interactive across NA / APAC / INTL / SCF.
// ---------------------------------------------------------------------------

export const PERIOD = 'FY 2025 · Period 12'

export const REGIONS = [
  { code: 'NA', label: '🌎 North America', name: 'North America', factor: 1.0 },
  { code: 'APAC', label: '🌏 Asia Pacific', name: 'Asia Pacific', factor: 0.72 },
  { code: 'INTL', label: '🌍 International', name: 'International', factor: 0.88 },
  { code: 'SCF', label: '📊 SCF / Global', name: 'SCF / Global', factor: 1.34 },
]

// --- BS Flux Analysis : account-level detail (NA baseline, USD millions) -----
export const ACCOUNTS = [
  { code: '10501', desc: 'Finished Goods & Purchased Goods', py: 22.8, actual: 19.6, budget: 20.6, le: 22.6 },
  { code: '11202', desc: 'Accounts Receivable (Trade)', py: 85.3, actual: 26.6, budget: 21.7, le: 26.7 },
  { code: '11401', desc: 'Accounts Receivable (Other – Accrued)', py: 51.0, actual: 56.5, budget: 52.0, le: 55.1 },
  { code: '11461', desc: 'Consumption Taxes Receivable (VAT)', py: 0.177, actual: 2.1, budget: 0.277, le: 0.227 },
  { code: '11601', desc: 'Accounts Receivable (Other)', py: -0.459, actual: 0.954, budget: -0.226, le: -0.275 },
  { code: '11621', desc: 'Prepaid Expenses (Short-Term)', py: 0.88, actual: 4.6, budget: 0.76, le: 2.6 },
  { code: '21202', desc: 'Accounts Payable (Trade)', py: 138.3, actual: 106.5, budget: 98.3, le: 100.8 },
  { code: '21451', desc: 'Accrued Alcohol Tax', py: 7.4, actual: 4.6, budget: 6.9, le: 7.0 },
  { code: '21461', desc: 'Consumption Tax Payable', py: 0.617, actual: 0.643, budget: 0.71, le: 1.2 },
  { code: '21501', desc: 'Accrued Expenses', py: 59.5, actual: 53.3, budget: 52.4, le: 55.0 },
  { code: '21511', desc: 'Provision for Bonus', py: 8.6, actual: 8.6, budget: 10.5, le: 10.5 },
  { code: '21611', desc: 'Advances Received (Deferred Income)', py: 3.0, actual: 5.0, budget: 3.0, le: 5.1 },
  { code: '23699', desc: 'Other Non-Current Liabilities', py: 5.5, actual: 4.6, budget: 4.6, le: 4.6 },
]

// --- Commentary : owner assignment + drafted explanations --------------------
export const COMMENTARY = [
  {
    code: '10501', desc: 'Finished Goods & Purchased Goods', owner: 'R. Duncan',
    bud: -0.953, py: -3.2,
    budText: '',
    pyText: 'Differential seen actual versus PY can largely be attributed to unplanned transfer of stock, particularly high-level expressions, from the Liquor Control Board of Ontario at the end of last year. Sell-through of this stock commenced throughout 2025. Additionally, lower ordering post-tariff implementation and anti-US sentiment has eroded inventory levels of American-based products.',
  },
  {
    code: '11202', desc: 'Accounts Receivable (Trade)', owner: 'J. Carlson / N. Van Dyke',
    bud: 4.9, py: -58.7,
    budText: 'Variance driven by corporate budget task. Budget included ($5M) for WOOD entity that did not materialise.',
    pyText: 'A/R Trade significantly lower vs PY driven by timing of SGWS RTM billings. See A/R Flux explanation for detail.',
  },
  {
    code: '11401', desc: 'Accounts Receivable (Other – Accrued Income)', owner: 'N. Van Dyke / S. Galperin',
    bud: 4.6, py: 5.5,
    budText: 'Variance due to timing of SGWS RTM billings; billings were expected to be collected before YE in budget.',
    pyText: '$4.5M of variance vs PY is due to SGWS RTM and MI A&P billings being in AR trade last year, not WOC billings account.',
  },
  {
    code: '11621', desc: 'Prepaid Expenses (Short-Term)', owner: 'N. Van Dyke / S. Galperin',
    bud: 3.9, py: 3.8,
    budText: 'Variance driven by $3.4M more 2026 HHG buy prepayments that were budgeted to occur in 2026.',
    pyText: 'Variance driven by $3.4M more 2026 HHG buy prepayments that were budgeted to occur in 2026.',
  },
  {
    code: '21202', desc: 'Accounts Payable (Trade)', owner: 'N. Van Dyke / S. Galperin / K. Boucher',
    bud: 8.2, py: -31.8,
    budText: "$13.6M variance vs budget when combined with Acc'd Advertising. Driven by $14M in BI phasing plus $3.9M EG balance above budget. EG build driven by $2M CA scan build and $2M Control State build to normalise accrual balances. Offset by $1.7M less sport sponsorship accruals than expected and $2M quicker Nov/Dec invoice submission than expected.",
    pyText: "($20.4M) variance vs PYE when combined with Acc'd Advertising. $1.5M increase in EGs YOY driven by new CA scan processing offset by BI outflow of $21.8M. BI outflow driven by ($13.4M) Nov/Dec BI phasing, ($2.6M) LY MI ADA double payment, ($1.5M) Starcom Barter Deal now off balance sheet, ($1.1M) sports sponsorships, and ($2.3M) quicker Nov/Dec invoice submission.",
  },
  {
    code: '21451', desc: 'Accrued Alcohol Tax', owner: 'M. Blakey',
    bud: -2.3, py: -2.8,
    budText: 'The fluctuation in Excise Taxes is driven by lower than expected shipments and a plant shutdown during the second half of the month in 2025.',
    pyText: 'The fluctuation in Excise Taxes is driven by lower than expected shipments.',
  },
  {
    code: '21501', desc: "Accrued Expenses (incl. Acc'd Advertising)", owner: 'R. Duncan / N. Van Dyke',
    bud: 0.859, py: -6.3,
    budText: 'CA60: Variance driven primarily by LCBO chargebacks; deductions flowed through against GL 54537 (A&P - Other), offsetting the established accrual. Budget value was set under the assumption that the LCBO would take no action. DEER: See A/P explanation — $13.6M combined variance.',
    pyText: 'CA60: Variance driven primarily by LCBO chargebacks flowing through against GL 54537 (A&P - Other) in H1 2025, offsetting the established accrual. DEER: See A/P explanation.',
  },
  {
    code: '21611', desc: 'Advances Received (Deferred Income)', owner: 'N. Van Dyke / S. Galperin',
    bud: 2.1, py: 2.0,
    budText: 'Variance driven by increased accrual per new SGWS contract in H2 2025.',
    pyText: 'Variance driven by increased accrual per new SGWS contract in H2 2025.',
  },
  { code: '11461', desc: 'Consumption Taxes Receivable (VAT)', owner: 'S. Galperin', bud: 1.8, py: 1.9, budText: '', pyText: '' },
  { code: '11601', desc: 'Accounts Receivable (Other)', owner: 'J. Carlson', bud: 1.2, py: 1.4, budText: '', pyText: '' },
  { code: '21461', desc: 'Consumption Tax Payable', owner: 'M. Blakey', bud: -0.067, py: 0.026, budText: '', pyText: '' },
  { code: '21511', desc: 'Provision for Bonus', owner: 'R. Duncan', bud: -1.9, py: 0.0, budText: '', pyText: '' },
  { code: '23699', desc: 'Other Non-Current Liabilities', owner: 'K. Boucher', bud: -0.015, py: -0.9, budText: '', pyText: '' },
]

// --- Anomaly Intelligence ----------------------------------------------------
export const ANOMALY_SUMMARY = [
  { key: 'stat', value: 3, title: 'STATISTICAL OUTLIERS', sub: 'accounts >2σ from mean' },
  { key: 'seasonal', value: 2, title: 'SEASONAL ANOMALIES', sub: 'break P12 historical pattern' },
  { key: 'benchmark', value: 4, title: 'BENCHMARK GAPS', sub: 'vs industry / LE benchmarks' },
  { key: 'trend', value: 5, title: 'YOY TREND BREAKS', sub: 'direction reversals vs trend' },
  { key: 'peer', value: 2, title: 'PEER OUTLIERS', sub: 'vs APAC / INTL region norms' },
]

// tags: statistical, seasonal, trend, benchmark, peer
export const ANOMALIES = [
  {
    code: '11202', desc: 'Accounts Receivable (Trade)', risk: 'high', z: 3.8,
    tags: ['statistical', 'seasonal', 'trend'],
    budVar: 4.9, budPct: 22.3, pyVar: -58.7, pyPct: -68.8,
    trend: [92, 84, 71, 58, 40, 27],
  },
  {
    code: '21202', desc: 'Accounts Payable (Trade)', risk: 'high', z: 2.6,
    tags: ['statistical', 'trend', 'peer'],
    budVar: 8.2, budPct: 8.3, pyVar: -31.8, pyPct: -23.0,
    trend: [138, 132, 126, 121, 114, 107],
  },
  {
    code: '11401', desc: 'Accounts Receivable (Other – Accrued)', risk: 'medium', z: 1.4,
    tags: ['benchmark', 'seasonal'],
    budVar: 4.6, budPct: 8.8, pyVar: 5.5, pyPct: 10.7,
    trend: [48, 50, 51, 53, 55, 57],
  },
  {
    code: '11621', desc: 'Prepaid Expenses (Short-Term)', risk: 'high', z: 4.2,
    tags: ['statistical', 'seasonal', 'benchmark'],
    budVar: 3.9, budPct: 509.2, pyVar: 3.8, pyPct: 426.2,
    trend: [0.9, 1.1, 1.4, 2.2, 3.6, 4.6],
  },
  {
    code: '21501', desc: 'Accrued Expenses', risk: 'medium', z: 1.1,
    tags: ['trend', 'seasonal', 'peer'],
    budVar: 0.9, budPct: 1.6, pyVar: -6.3, pyPct: -10.6,
    trend: [59, 58, 57, 55, 54, 53],
  },
  {
    code: '21451', desc: 'Accrued Alcohol Tax', risk: 'medium', z: 2.1,
    tags: ['statistical', 'seasonal'],
    budVar: -2.3, budPct: -33.2, pyVar: -2.8, pyPct: -37.9,
    trend: [7.4, 7.1, 6.6, 5.8, 5.1, 4.6],
  },
  {
    code: '21611', desc: 'Advances Received (Deferred Income)', risk: 'low', z: 0.8,
    tags: ['trend', 'benchmark'],
    budVar: 2.1, budPct: 69.8, pyVar: 2.0, pyPct: 66.9,
    trend: [3.0, 3.2, 3.6, 4.1, 4.6, 5.0],
  },
]

// Heat-map ordering mirrors the account ledger sequence.
export const HEATMAP = [
  { label: '501', z: 0.2 }, { label: '202', z: 3.8 }, { label: '401', z: 1.4 },
  { label: '461', z: 0.2 }, { label: '601', z: 0.2 }, { label: '621', z: 4.2 },
  { label: '202', z: 2.6 }, { label: '451', z: 2.1 }, { label: '461', z: 0.2 },
  { label: '501', z: 1.1 }, { label: '511', z: 0.2 }, { label: '611', z: 0.8 },
  { label: '699', z: 0.2 },
]

export const TREND_SIGNALS = [
  { code: '11202', desc: 'Accounts Receivable', dir: 'down', mag: '27M', z: 3.8, series: [92, 84, 71, 58, 40, 27] },
  { code: '21202', desc: 'Accounts Payable', dir: 'down', mag: '107M', z: 2.6, series: [138, 132, 126, 121, 114, 107] },
  { code: '11401', desc: 'Accounts Receivable', dir: 'up', mag: '57M', z: 1.4, series: [48, 50, 51, 53, 55, 57] },
  { code: '11621', desc: 'Prepaid Expenses', dir: 'up', mag: '5M', z: 4.2, series: [0.9, 1.1, 1.4, 2.2, 3.6, 4.6] },
  { code: '21501', desc: 'Accrued Expenses', dir: 'down', mag: '53M', z: 1.1, series: [59, 58, 57, 55, 54, 53] },
]

export const REGIONAL_BENCHMARK = [
  { label: 'AR Trade', na: 26.6, apac: 31.2, intl: 44.7 },
  { label: 'AP Trade', na: 106.5, apac: 88.4, intl: 112.3 },
  { label: 'Accrued Exp', na: 53.3, apac: 41.2, intl: 47.8 },
  { label: 'Excise Tax', na: 4.6, apac: 2.1, intl: 5.3 },
]

// --- What-If simulator -------------------------------------------------------
// netDelta / varDelta = full-correction (100%) impact on the two headline
// metrics. varDelta sums to ~+12.1 so fully correcting closes the budget gap.
export const WHATIF_BASELINE = {
  net: 183.4,
  variance: -12.1,
  arDays: 42,
  liquidity: 1.82,
  confidence: 72,
}

export const WHATIF_ITEMS = [
  { code: '11202', icon: '📋', risk: 'high', mag: 58.7, desc: 'Accounts Receivable (Trade)',
    note: '$58.7M drop vs prior year — timing of LCBO settlements and trade deduction reclassification.',
    netDelta: 6.0, varDelta: 4.0 },
  { code: '10501', icon: '📦', risk: 'med', mag: 3.2, desc: 'Inventory — Finished Goods',
    note: '$3.2M decrease vs budget — SKU rationalisation and production scheduling pull-forward.',
    netDelta: 1.0, varDelta: 0.8 },
  { code: '21201', icon: '💳', risk: 'high', mag: 24.6, desc: 'Accounts Payable',
    note: '$24.6M surge — vendor invoice batching, GRNI timing, and accrued freight charges.',
    netDelta: 2.0, varDelta: 3.5 },
  { code: '11401', icon: '📊', risk: 'med', mag: 5.5, desc: 'Accrued Receivables',
    note: '$5.5M above PY — accelerated accruals for Q4 trade promotions not yet invoiced.',
    netDelta: 1.5, varDelta: 1.5 },
  { code: '31101', icon: '🏦', risk: 'high', mag: 18.3, desc: 'Long-Term Debt',
    note: '$18.3M increase — new RCF drawdown to fund working capital ahead of seasonal peak.',
    netDelta: -1.5, varDelta: 1.8 },
  { code: '11502', icon: '📄', risk: 'low', mag: 2.1, desc: 'Prepaid Expenses',
    note: '$2.1M unreconciled prepaid balance — insurance and SaaS renewals not yet amortised.',
    netDelta: 0.6, varDelta: 0.5 },
]

// --- Agent roster (Process Flow) --------------------------------------------
export const AGENTS = [
  { icon: '⚙️', name: 'Orchestrator', kind: 'MASTER CONTROLLER', cls: 'orchestrator',
    desc: 'The central brain that plans the full BS Flux workflow, assigns tasks to sub-agents, monitors progress, handles exceptions and assembles the final report.',
    tools: ['Task Planner', 'Agent Dispatcher', 'Progress Monitor', 'Exception Handler', 'Report Assembler'] },
  { icon: '📥', name: 'Data Extractor', kind: 'DATA AGENT', mode: 'PARALLEL', cls: 'data',
    desc: 'Connects to RAC House on WD3/WD4, downloads BS Flux files for all regions (NA, APAC, INTL, SCF), parses account lines and maps schema.',
    tools: ['RAC House API', 'File Parser', 'Schema Mapper', 'Region Filter'] },
  { icon: '✅', name: 'Data Validator', kind: 'DATA AGENT', mode: 'PARALLEL', cls: 'data',
    desc: 'Runs completeness checks, detects missing entities, validates numeric integrity, cross-references prior period balances.',
    tools: ['Completeness Check', 'Cross-Period Validator', 'Entity Matcher', 'Alert Engine'] },
  { icon: '🔗', name: 'RAC Connector', kind: 'DATA AGENT', mode: 'PARALLEL', cls: 'data',
    desc: 'Maintains live connection to RAC House, schedules automated data pulls by working day calendar, handles authentication and caching.',
    tools: ['Scheduler', 'Auth Manager', 'Webhook Trigger', 'Data Cache'] },
  { icon: '📊', name: 'Variance Agent', kind: 'ANALYSIS AGENT', mode: 'PARALLEL', cls: 'analysis',
    desc: 'Computes Act vs Budget and Act vs PY variances for every account line across all regions. Flags material variances against thresholds.',
    tools: ['Variance Engine', 'Materiality Filter', 'Trend Detector', 'Flagging Rules'] },
  { icon: '🎯', name: 'Benchmark Agent', kind: 'ANALYSIS AGENT', mode: 'PARALLEL', cls: 'analysis',
    desc: 'Compares current period results against LE, historical seasonality patterns, and peer-entity benchmarks. Provides context for anomalies.',
    tools: ['LE Comparator', 'Seasonality Model', 'Peer Ranker', 'Heat Map Generator'] },
  { icon: '⚡', name: 'Anomaly Agent', kind: 'INTELLIGENCE AGENT', cls: 'anomaly',
    desc: 'Runs a multi-model intelligence pass after variance and benchmark analysis. Detects statistical outliers (z-score), seasonal breaks and trend reversals.',
    tools: ['Z-Score Engine', 'Seasonality Detector', 'Trend Break Model', 'Peer Comparator', 'Risk Scorer', 'Insight Narrator', 'Heat Map Builder'] },
  { icon: '💬', name: 'Commentary Agent', kind: 'AI COMMENTARY', mode: 'PARALLEL', cls: 'commentary',
    desc: 'Uses LLM reasoning to draft initial commentary for each material variance, referencing account history and business context.',
    tools: ['LLM Reasoning', 'Template Library', 'Context Store', 'Anomaly Context', 'Draft Generator'] },
  { icon: '🔍', name: 'Review Agent', kind: 'AI COMMENTARY', mode: 'PARALLEL', cls: 'commentary',
    desc: 'Scores commentary drafts for completeness, clarity, and policy compliance. Routes to human account owners for approval.',
    tools: ['Quality Scorer', 'Routing Engine', 'Human-in-Loop', 'Template Filler'] },
  { icon: '🔒', name: 'Controls Agent', kind: 'GOVERNANCE', cls: 'governance',
    desc: 'Continuously monitors the entire pipeline for policy adherence, audit trail integrity and SOX controls compliance.',
    tools: ['Policy Engine', 'Audit Logger', 'SOX Controls', 'Escalation Manager'] },
]

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

// Format a USD-millions figure, e.g. 22.8 -> "$22.8M", 0.177 -> "$177K",
// -0.953 -> "$(953K)".
export function fmtM(v) {
  if (v === null || v === undefined) return '—'
  const neg = v < 0
  const abs = Math.abs(v)
  let body
  if (abs === 0) body = '$0'
  else if (abs < 1) body = `$${Math.round(abs * 1000)}K`
  else body = `$${abs.toFixed(1)}M`
  return neg ? `$(${body.slice(1)})` : body
}

// Signed variance with arrow, e.g. +4.9 -> "▲ $4.9M", -0.953 -> "▼ $(953K)".
export function fmtVar(v, immaterialThreshold = 0.5) {
  if (Math.abs(v) < immaterialThreshold) return `— ${fmtM(v)}`
  const arrow = v >= 0 ? '▲' : '▼'
  return `${arrow} ${fmtM(v)}`
}

export function varClass(v, immaterialThreshold = 0.5) {
  if (Math.abs(v) < immaterialThreshold) return 'neutral'
  return v >= 0 ? 'pos' : 'neg'
}

export function scale(v, factor) {
  return v * factor
}
