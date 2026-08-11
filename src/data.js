// ---------------------------------------------------------------------------
// Balance Sheet Flux Sol — synthetic data model (UTILITY demo)
// FERC-style utility line items. All figures are illustrative (USD millions
// unless noted). The operating-company toggle scales a base OpCo by a fixed
// factor so every module stays interactive across Electric / Gas / Water / Holdco.
// ---------------------------------------------------------------------------

export const PERIOD = 'FY 2025 · Period 12'

// Region toggle reframed as regulated operating companies / jurisdictions.
export const REGIONS = [
  { code: 'NA', label: '🔌 Power Delivery', name: 'Power Delivery Co', factor: 1.0 },
  { code: 'APAC', label: '🔥 Gas Distribution', name: 'Gas Distribution Co', factor: 0.72 },
  { code: 'INTL', label: '💧 Water Utility', name: 'Water Utility Co', factor: 0.88 },
  { code: 'SCF', label: '🏢 Holdco / Consol', name: 'Holdco / Consolidated', factor: 1.34 },
]

// --- BS Flux Analysis : account-level detail (base OpCo, USD millions) --------
export const ACCOUNTS = [
  { code: '151', desc: 'Fuel Stock & Materials', py: 22.8, actual: 19.6, budget: 20.6, le: 22.6 },
  { code: '142', desc: 'Customer Accounts Receivable', py: 85.3, actual: 26.6, budget: 21.7, le: 26.7 },
  { code: '173', desc: 'Accrued Unbilled Revenue', py: 51.0, actual: 56.5, budget: 52.0, le: 55.1 },
  { code: '190', desc: 'Reg Asset – Deferred Fuel (DFCR)', py: 0.177, actual: 2.1, budget: 0.277, le: 0.227 },
  { code: '143', desc: 'Other Receivables (net)', py: -0.459, actual: 0.954, budget: -0.226, le: -0.275 },
  { code: '182.3', desc: 'Reg Asset – Storm Cost Deferral', py: 0.88, actual: 4.6, budget: 0.76, le: 2.6 },
  { code: '232', desc: 'Accounts Payable & Accrued Construction', py: 138.3, actual: 106.5, budget: 98.3, le: 100.8 },
  { code: '254', desc: 'Reg Liability – Revenue Refund', py: 7.4, actual: 4.6, budget: 6.9, le: 7.0 },
  { code: '237', desc: 'Customer Deposits', py: 0.617, actual: 0.643, budget: 0.71, le: 1.2 },
  { code: '242', desc: 'Accrued Expenses (Interest & Payroll)', py: 59.5, actual: 53.3, budget: 52.4, le: 55.0 },
  { code: '228', desc: 'Accrued Pension / OPEB', py: 8.6, actual: 8.6, budget: 10.5, le: 10.5 },
  { code: '252', desc: 'Contributions in Aid of Construction', py: 3.0, actual: 5.0, budget: 3.0, le: 5.1 },
  { code: '253', desc: 'Other Deferred Credits', py: 5.5, actual: 4.6, budget: 4.6, le: 4.6 },
]

// --- Commentary : owner assignment + drafted explanations --------------------
export const COMMENTARY = [
  {
    code: '151', desc: 'Fuel Stock & Materials', owner: 'R. Duncan',
    bud: -0.953, py: -3.2,
    budText: '',
    pyText: 'Fuel stock lower versus PY driven by drawdown of coal inventory ahead of the scheduled coal-unit retirement and higher gas burn during the winter peak. Reduced spot procurement following a mild shoulder season further eroded materials balances.',
  },
  {
    code: '142', desc: 'Customer Accounts Receivable', owner: 'J. Carlson / N. Van Dyke',
    bud: 4.9, py: -58.7,
    budText: 'Variance driven by the corporate budget task. Budget assumed a $5M large industrial-customer settlement that shifted into the next period.',
    pyText: 'Customer A/R materially lower vs PY on timing of the seasonal billing true-up and accelerated collections following the rate-order effective date. See A/R flux detail.',
  },
  {
    code: '173', desc: 'Accrued Unbilled Revenue', owner: 'N. Van Dyke / S. Galperin',
    bud: 4.6, py: 5.5,
    budText: 'Variance driven by cycle-billing timing at period end; the unbilled estimate ran higher than budget on a colder-than-normal December load.',
    pyText: '$4.5M of the PY variance relates to the deferred-fuel component now recorded in the DFCR regulatory asset rather than in unbilled revenue.',
  },
  {
    code: '182.3', desc: 'Reg Asset – Storm Cost Deferral', owner: 'N. Van Dyke / S. Galperin',
    bud: 3.9, py: 3.8,
    budText: 'Variance driven by $3.4M of December ice-storm restoration costs deferred to the storm regulatory asset, pending recovery in the pending rate case.',
    pyText: 'Storm-restoration deferral established in H2 2025; recovery mechanism filed with the commission. $3.4M above prior year.',
  },
  {
    code: '232', desc: 'Accounts Payable & Accrued Construction', owner: 'N. Van Dyke / S. Galperin / K. Boucher',
    bud: 8.2, py: -31.8,
    budText: '$13.6M variance vs budget when combined with accrued construction. Driven by $14M of capital-program invoice phasing on the transmission rebuild plus $3.9M of accrued contractor retention. Offset by $1.7M lower materials accrual and $2M faster December invoice submission.',
    pyText: '($20.4M) variance vs PYE when combined with accrued construction. Driven by capital-program cash-out of $21.8M as the transmission project moved from CWIP to plant-in-service, partly offset by $1.5M higher retention YoY.',
  },
  {
    code: '254', desc: 'Reg Liability – Revenue Refund', owner: 'M. Blakey',
    bud: -2.3, py: -2.8,
    budText: 'The movement is driven by a lower fuel/revenue true-up owed to customers following lower-than-forecast wholesale volumes and a partial generating-unit outage in the second half of the period.',
    pyText: 'The movement is driven by settlement of the revenue-refund liability during the year per the commission order.',
  },
  {
    code: '242', desc: 'Accrued Expenses (Interest & Payroll)', owner: 'R. Duncan / N. Van Dyke',
    bud: 0.859, py: -6.3,
    budText: 'Variance driven primarily by interest-accrual timing on the revolver drawdown and payroll-accrual phasing, partially offset by a lower incentive accrual. See A/P explanation — $13.6M combined capital movement.',
    pyText: 'Interest accrual higher YoY on the revolver draw, offset by a lower incentive accrual. See A/P explanation for the combined capital-accrual movement.',
  },
  {
    code: '252', desc: 'Contributions in Aid of Construction', owner: 'N. Van Dyke / S. Galperin',
    bud: 2.1, py: 2.0,
    budText: 'Variance driven by increased developer CIAC receipts for new service connections under the H2 2025 line-extension agreements.',
    pyText: 'Higher CIAC on new residential and commercial connections versus prior year.',
  },
  { code: '190', desc: 'Reg Asset – Deferred Fuel (DFCR)', owner: 'S. Galperin', bud: 1.8, py: 1.9, budText: '', pyText: '' },
  { code: '143', desc: 'Other Receivables (net)', owner: 'J. Carlson', bud: 1.2, py: 1.4, budText: '', pyText: '' },
  { code: '237', desc: 'Customer Deposits', owner: 'M. Blakey', bud: -0.067, py: 0.026, budText: '', pyText: '' },
  { code: '228', desc: 'Accrued Pension / OPEB', owner: 'R. Duncan', bud: -1.9, py: 0.0, budText: '', pyText: '' },
  { code: '253', desc: 'Other Deferred Credits', owner: 'K. Boucher', bud: -0.015, py: -0.9, budText: '', pyText: '' },
]

// --- Anomaly Intelligence ----------------------------------------------------
export const ANOMALY_SUMMARY = [
  { key: 'stat', value: 3, title: 'STATISTICAL OUTLIERS', sub: 'accounts >2σ from mean' },
  { key: 'seasonal', value: 2, title: 'SEASONAL ANOMALIES', sub: 'break P12 historical pattern' },
  { key: 'benchmark', value: 4, title: 'BENCHMARK GAPS', sub: 'vs industry / LE benchmarks' },
  { key: 'trend', value: 5, title: 'YOY TREND BREAKS', sub: 'direction reversals vs trend' },
  { key: 'peer', value: 2, title: 'PEER OUTLIERS', sub: 'vs peer operating-company norms' },
]

// tags: statistical, seasonal, trend, benchmark, peer
export const ANOMALIES = [
  {
    code: '142', desc: 'Customer Accounts Receivable', risk: 'high', z: 3.8,
    tags: ['statistical', 'seasonal', 'trend'],
    budVar: 4.9, budPct: 22.3, pyVar: -58.7, pyPct: -68.8,
    trend: [92, 84, 71, 58, 40, 27],
  },
  {
    code: '232', desc: 'Accounts Payable & Accrued Construction', risk: 'high', z: 2.6,
    tags: ['statistical', 'trend', 'peer'],
    budVar: 8.2, budPct: 8.3, pyVar: -31.8, pyPct: -23.0,
    trend: [138, 132, 126, 121, 114, 107],
  },
  {
    code: '173', desc: 'Accrued Unbilled Revenue', risk: 'medium', z: 1.4,
    tags: ['benchmark', 'seasonal'],
    budVar: 4.6, budPct: 8.8, pyVar: 5.5, pyPct: 10.7,
    trend: [48, 50, 51, 53, 55, 57],
  },
  {
    code: '182.3', desc: 'Reg Asset – Storm Cost Deferral', risk: 'high', z: 4.2,
    tags: ['statistical', 'seasonal', 'benchmark'],
    budVar: 3.9, budPct: 509.2, pyVar: 3.8, pyPct: 426.2,
    trend: [0.9, 1.1, 1.4, 2.2, 3.6, 4.6],
  },
  {
    code: '242', desc: 'Accrued Expenses (Interest & Payroll)', risk: 'medium', z: 1.1,
    tags: ['trend', 'seasonal', 'peer'],
    budVar: 0.9, budPct: 1.6, pyVar: -6.3, pyPct: -10.6,
    trend: [59, 58, 57, 55, 54, 53],
  },
  {
    code: '254', desc: 'Reg Liability – Revenue Refund', risk: 'medium', z: 2.1,
    tags: ['statistical', 'seasonal'],
    budVar: -2.3, budPct: -33.2, pyVar: -2.8, pyPct: -37.9,
    trend: [7.4, 7.1, 6.6, 5.8, 5.1, 4.6],
  },
  {
    code: '252', desc: 'Contributions in Aid of Construction', risk: 'low', z: 0.8,
    tags: ['trend', 'benchmark'],
    budVar: 2.1, budPct: 69.8, pyVar: 2.0, pyPct: 66.9,
    trend: [3.0, 3.2, 3.6, 4.1, 4.6, 5.0],
  },
]

// Heat-map ordering mirrors the account ledger sequence.
export const HEATMAP = [
  { label: '151', z: 0.2 }, { label: '142', z: 3.8 }, { label: '173', z: 1.4 },
  { label: '190', z: 0.2 }, { label: '143', z: 0.2 }, { label: '182', z: 4.2 },
  { label: '232', z: 2.6 }, { label: '254', z: 2.1 }, { label: '237', z: 0.2 },
  { label: '242', z: 1.1 }, { label: '228', z: 0.2 }, { label: '252', z: 0.8 },
  { label: '253', z: 0.2 },
]

export const TREND_SIGNALS = [
  { code: '142', desc: 'Customer AR', dir: 'down', mag: '27M', z: 3.8, series: [92, 84, 71, 58, 40, 27] },
  { code: '232', desc: 'AP & Construction', dir: 'down', mag: '107M', z: 2.6, series: [138, 132, 126, 121, 114, 107] },
  { code: '173', desc: 'Unbilled Revenue', dir: 'up', mag: '57M', z: 1.4, series: [48, 50, 51, 53, 55, 57] },
  { code: '182.3', desc: 'Storm Cost Deferral', dir: 'up', mag: '5M', z: 4.2, series: [0.9, 1.1, 1.4, 2.2, 3.6, 4.6] },
  { code: '242', desc: 'Accrued Expenses', dir: 'down', mag: '53M', z: 1.1, series: [59, 58, 57, 55, 54, 53] },
]

export const REGIONAL_BENCHMARK = [
  { label: 'Customer AR', na: 26.6, apac: 31.2, intl: 44.7 },
  { label: 'AP & Construction', na: 106.5, apac: 88.4, intl: 112.3 },
  { label: 'Accrued Expenses', na: 53.3, apac: 41.2, intl: 47.8 },
  { label: 'Storm Deferral', na: 4.6, apac: 2.1, intl: 5.3 },
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
  { code: '142', icon: '📋', risk: 'high', mag: 58.7, desc: 'Customer Accounts Receivable',
    note: '$58.7M swing vs prior year — timing of the seasonal billing true-up and accelerated collections after the rate order took effect.',
    netDelta: 6.0, varDelta: 4.0 },
  { code: '151', icon: '⛽', risk: 'med', mag: 3.2, desc: 'Fuel Stock & Materials',
    note: '$3.2M decrease vs budget — coal inventory drawdown ahead of unit retirement and lower gas storage injection.',
    netDelta: 1.0, varDelta: 0.8 },
  { code: '232', icon: '💳', risk: 'high', mag: 24.6, desc: 'Accounts Payable & Accrued Construction',
    note: '$24.6M surge — capital-program invoice batching, contractor retention, and GRNI timing on the transmission rebuild.',
    netDelta: 2.0, varDelta: 3.5 },
  { code: '173', icon: '📊', risk: 'med', mag: 5.5, desc: 'Accrued Unbilled Revenue',
    note: '$5.5M above PY — colder December load and cycle-billing timing not yet invoiced.',
    netDelta: 1.5, varDelta: 1.5 },
  { code: '224', icon: '🏦', risk: 'high', mag: 18.3, desc: 'Long-Term Debt / Revolver',
    note: '$18.3M increase — revolver drawdown to fund the capital program ahead of the fall construction peak.',
    netDelta: -1.5, varDelta: 1.8 },
  { code: '182.3', icon: '📄', risk: 'low', mag: 2.1, desc: 'Reg Asset – Storm Cost Deferral',
    note: '$2.1M of storm-restoration cost pending deferral treatment and commission recovery.',
    netDelta: 0.6, varDelta: 0.5 },
]

// --- Agent roster (Process Flow) --------------------------------------------
export const AGENTS = [
  { icon: '⚙️', name: 'Orchestrator', kind: 'MASTER CONTROLLER', cls: 'orchestrator',
    desc: 'The central brain that plans the full BS Flux workflow, assigns tasks to sub-agents, monitors progress, handles exceptions and assembles the final report.',
    tools: ['Task Planner', 'Agent Dispatcher', 'Progress Monitor', 'Exception Handler', 'Report Assembler'] },
  { icon: '📥', name: 'Data Extractor', kind: 'DATA AGENT', mode: 'PARALLEL', cls: 'data',
    desc: 'Connects to the source ledger (RAC House) on WD3/WD4, downloads BS Flux files for all operating companies (Electric, Gas, Water, Holdco), parses account lines and maps schema.',
    tools: ['RAC House API', 'File Parser', 'Schema Mapper', 'OpCo Filter'] },
  { icon: '✅', name: 'Data Validator', kind: 'DATA AGENT', mode: 'PARALLEL', cls: 'data',
    desc: 'Runs completeness checks, detects missing entities, validates numeric integrity, cross-references prior period balances.',
    tools: ['Completeness Check', 'Cross-Period Validator', 'Entity Matcher', 'Alert Engine'] },
  { icon: '🔗', name: 'RAC Connector', kind: 'DATA AGENT', mode: 'PARALLEL', cls: 'data',
    desc: 'Maintains live connection to the source ledger, schedules automated data pulls by working-day calendar, handles authentication and caching.',
    tools: ['Scheduler', 'Auth Manager', 'Webhook Trigger', 'Data Cache'] },
  { icon: '📊', name: 'Variance Agent', kind: 'ANALYSIS AGENT', mode: 'PARALLEL', cls: 'analysis',
    desc: 'Computes Act vs Budget and Act vs PY variances for every account line across all operating companies. Flags material variances against thresholds.',
    tools: ['Variance Engine', 'Materiality Filter', 'Trend Detector', 'Flagging Rules'] },
  { icon: '🎯', name: 'Benchmark Agent', kind: 'ANALYSIS AGENT', mode: 'PARALLEL', cls: 'analysis',
    desc: 'Compares current period results against LE, historical seasonality patterns, and peer-OpCo benchmarks. Provides context for anomalies.',
    tools: ['LE Comparator', 'Seasonality Model', 'Peer Ranker', 'Heat Map Generator'] },
  { icon: '⚡', name: 'Anomaly Agent', kind: 'INTELLIGENCE AGENT', cls: 'anomaly',
    desc: 'Runs a multi-model intelligence pass after variance and benchmark analysis. Detects statistical outliers (z-score), seasonal breaks and trend reversals.',
    tools: ['Z-Score Engine', 'Seasonality Detector', 'Trend Break Model', 'Peer Comparator', 'Risk Scorer', 'Insight Narrator', 'Heat Map Builder'] },
  { icon: '💬', name: 'Commentary Agent', kind: 'AI COMMENTARY', mode: 'PARALLEL', cls: 'commentary',
    desc: 'Uses LLM reasoning to draft initial commentary for each material variance, referencing account history, rate-case context and business drivers.',
    tools: ['LLM Reasoning', 'Template Library', 'Context Store', 'Anomaly Context', 'Draft Generator'] },
  { icon: '🔍', name: 'Review Agent', kind: 'AI COMMENTARY', mode: 'PARALLEL', cls: 'commentary',
    desc: 'Scores commentary drafts for completeness, clarity, and policy compliance. Routes to human account owners for approval.',
    tools: ['Quality Scorer', 'Routing Engine', 'Human-in-Loop', 'Template Filler'] },
  { icon: '🔒', name: 'Controls Agent', kind: 'GOVERNANCE', cls: 'governance',
    desc: 'Continuously monitors the entire pipeline for policy adherence, audit trail integrity and SOX controls compliance.',
    tools: ['Policy Engine', 'Audit Logger', 'SOX Controls', 'Escalation Manager'] },
]

// ---------------------------------------------------------------------------
// Governance / PMR provenance (trust-signal layer)
// ---------------------------------------------------------------------------

export const PMR_META = {
  repository: 'Avangrid PMR Repository',
  file: 'Networks_PMR_2025_P12.xlsx',
  version: 'v4 · approved 2026-07-15',
  owner: 'Networks FP&A',
  hosting: 'Avangrid-hosted · US East · no external egress',
  role: 'Networks Controller',
}

export const PMR_TYPES = [
  { code: 'ACT', label: 'Actual PMR' },
  { code: 'REP', label: 'Reported PMR' },
  { code: 'BUD', label: 'Budget / Forecast PMR' },
]

// field = which account column supplies the comparison value ('rev' derived).
export const COMPARISON_BASES = [
  { code: 'BUD', label: 'Budget', field: 'budget' },
  { code: 'FCT', label: 'Forecast', field: 'le' },
  { code: 'REV', label: 'Revisions', field: 'rev' },
  { code: 'PY', label: 'Prior Year', field: 'py' },
]

export const PERIOD_BASES = [
  { code: 'YTD', label: 'YTD', factor: 1.0 },
  { code: 'MOM', label: 'MoM', factor: 0.085 },
  { code: 'QOQ', label: 'QoQ', factor: 0.25 },
  { code: 'FY', label: 'Full Year', factor: 1.0 },
]

// Deterministic (illustrative) spreadsheet cell for an account code.
export function cellFor(code) {
  const digits = code.replace(/\D/g, '')
  const row = 20 + (parseInt(digits.slice(-3), 10) % 60)
  return `Col N · Row ${row}`
}

export function sourceFor(account, regionName, basisLabel, periodLabel) {
  return {
    file: PMR_META.file,
    version: PMR_META.version,
    tab: `${regionName} · GAAP P&L`,
    line: `Line ${account.code}`,
    cell: cellFor(account.code),
    period: `${periodLabel} · FY2025 P12`,
    basis: `Actual vs ${basisLabel}`,
  }
}

// Four acceptance gates (from the delivery model). status: shown | partial | target
export const ACCEPTANCE_GATES = [
  { key: 'accuracy', name: 'Financial Accuracy & Reconciliation', icon: '🎯', status: 'shown',
    demo: 'Reconciled · 0 unexplained differences',
    detail: '100% of figures tie to the approved PMR within rounding.' },
  { key: 'trace', name: 'Source Traceability', icon: '🔗', status: 'shown',
    demo: '100% source-linked · file · version · tab · cell',
    detail: 'Every number drills back to a Finance-verifiable source.' },
  { key: 'guardrails', name: 'Guardrails & Security', icon: '🔒', status: 'partial',
    demo: 'RBAC scope · clarifies / abstains',
    detail: 'Ambiguity → clarify; unsupported → abstain; no data egress.' },
  { key: 'readiness', name: 'Quality & Readiness', icon: '✅', status: 'target',
    demo: 'Monitoring · runbook · handoff',
    detail: 'Finance sign-off, monitoring, recovery, support & handoff.' },
]

// AI Assistant demonstration scenarios — answer / clarify / abstain.
export const ASSISTANT_SCENARIOS = [
  {
    q: 'What drove the Customer AR variance vs budget?',
    kind: 'answer',
    a: 'Customer Accounts Receivable is +$4.9M (22.3%) vs Budget. Budget assumed a $5M large industrial-customer settlement that shifted into the next period. The figure is a deterministic calculation; the driver is drawn from the approved P12 commentary.',
    source: { file: PMR_META.file, version: PMR_META.version, tab: 'Networks · GAAP P&L', line: 'Line 142', cell: 'Col N · Row 42', basis: 'Actual vs Budget' },
  },
  {
    q: 'How is margin trending?',
    kind: 'clarify',
    a: 'That question is ambiguous. Please specify: (a) entity / OpCo (e.g., NYSEG, CMP, Networks consolidated), (b) comparison basis (Budget, Forecast, Revisions, Prior Year), and (c) period basis (YTD, MoM, QoQ). I will not infer these.',
  },
  {
    q: 'What will net income be next quarter?',
    kind: 'abstain',
    a: 'Insufficient data. A forward net-income projection is outside the approved PMR scope loaded for this period. I return facts traceable to the PMR and do not generate forecasts that are not in an approved Budget/Forecast PMR.',
  },
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
