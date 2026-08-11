import { useState } from 'react'
import { REGIONS, PERIOD, PMR_META, PMR_TYPES, COMPARISON_BASES, PERIOD_BASES } from './data.js'
import AvangridLogo from './components/AvangridLogo.jsx'
import ProcessFlow from './components/ProcessFlow.jsx'
import FluxAnalysis from './components/FluxAnalysis.jsx'
import Commentary from './components/Commentary.jsx'
import AnomalyIntelligence from './components/AnomalyIntelligence.jsx'
import WhatIf from './components/WhatIf.jsx'
import AiAssistant from './components/AiAssistant.jsx'

const TABS = [
  { id: 'flux', label: '📊 BS Flux Analysis' },
  { id: 'commentary', label: '💬 Commentary' },
  { id: 'anomaly', label: '⚡ Anomaly Intelligence' },
  { id: 'whatif', label: '🎛 What-If Analysis' },
  { id: 'process', label: '🗺 Process Flow' },
]

export default function App() {
  const [tab, setTab] = useState('flux')
  const [regionCode, setRegionCode] = useState('NA')
  const [pmrType, setPmrType] = useState('ACT')
  const [basisCode, setBasisCode] = useState('BUD')
  const [periodCode, setPeriodCode] = useState('YTD')

  const region = REGIONS.find((r) => r.code === regionCode)
  const basis = COMPARISON_BASES.find((b) => b.code === basisCode)
  const period = PERIOD_BASES.find((p) => p.code === periodCode)
  const pmr = { type: pmrType, basis, period }

  return (
    <div className="app">
      <header className="appbar">
        <AvangridLogo />
        <div className="brand-divider" />
        <div className="brand">
          <div>
            <div className="brand-name">Flux <span className="accent">Analysis</span></div>
            <div className="brand-sub">Financial Variance &amp; Performance Intelligence</div>
          </div>
        </div>
        <div className="appbar-spacer" />
        <div className="period-chip">📅 {PERIOD}</div>
        <div className="region-wrap">
          <span className="region-label">Operating Co</span>
          <select className="region-select" value={regionCode} onChange={(e) => setRegionCode(e.target.value)}>
            {REGIONS.map((r) => <option key={r.code} value={r.code}>{r.label}</option>)}
          </select>
        </div>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
            {t.pill && <span className="pill">{t.pill}</span>}
          </button>
        ))}
      </nav>

      {/* PMR context / governance ribbon (R4 + provenance density) */}
      <div className="pmr-ribbon">
        <div className="pmr-meta" title={`${PMR_META.repository} · owner ${PMR_META.owner}`}>
          📄 <strong>{PMR_META.file}</strong> · {PMR_META.version}
        </div>
        <div className="pmr-controls">
          <label>PMR
            <select value={pmrType} onChange={(e) => setPmrType(e.target.value)}>
              {PMR_TYPES.map((t) => <option key={t.code} value={t.code}>{t.label}</option>)}
            </select>
          </label>
          <label>Basis
            <select value={basisCode} onChange={(e) => setBasisCode(e.target.value)}>
              {COMPARISON_BASES.map((b) => <option key={b.code} value={b.code}>{b.label}</option>)}
            </select>
          </label>
          <label>Period
            <select value={periodCode} onChange={(e) => setPeriodCode(e.target.value)}>
              {PERIOD_BASES.map((p) => <option key={p.code} value={p.code}>{p.label}</option>)}
            </select>
          </label>
        </div>
        <div className="pmr-chips">
          <span className="pmr-chip role" title="Role-based access control scope">👤 {PMR_META.role}</span>
          <span className="pmr-chip host" title="Hosting & data-egress posture">🔒 {PMR_META.hosting}</span>
        </div>
      </div>

      <main>
        {tab === 'process' && <ProcessFlow />}
        {tab === 'flux' && <FluxAnalysis region={region} pmr={pmr} />}
        {tab === 'commentary' && <Commentary region={region} />}
        {tab === 'anomaly' && <AnomalyIntelligence region={region} />}
        {tab === 'whatif' && <WhatIf region={region} />}
      </main>

      <AiAssistant />

      <footer className="foot">
        <div>
          <strong style={{ color: 'var(--brand)' }}>Avangrid</strong>
          <span style={{ color: 'var(--brand-accent)' }}> ● </span>
          Flux Analysis · illustrative demo build · FY2025 Period 12 · figures are synthetic ·
          brand elements shown for internal-tool alignment
        </div>
        <div className="foot-sub">
          Powered by <strong style={{ color: 'var(--brand)' }}>Flux</strong> · statement coverage: P&amp;L (PMR) · Balance Sheet · Cash Flow
        </div>
      </footer>
    </div>
  )
}
