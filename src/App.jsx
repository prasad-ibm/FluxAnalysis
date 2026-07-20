import { useState } from 'react'
import { REGIONS, PERIOD } from './data.js'
import StandardLogo from './components/StandardLogo.jsx'
import ProcessFlow from './components/ProcessFlow.jsx'
import FluxAnalysis from './components/FluxAnalysis.jsx'
import Commentary from './components/Commentary.jsx'
import AnomalyIntelligence from './components/AnomalyIntelligence.jsx'
import WhatIf from './components/WhatIf.jsx'

const TABS = [
  { id: 'process', label: '🗺 Process Flow & RAC House' },
  { id: 'flux', label: '📊 BS Flux Analysis' },
  { id: 'commentary', label: '💬 Commentary' },
  { id: 'anomaly', label: '⚡ Anomaly Intelligence' },
  { id: 'whatif', label: '🎛 What-If Analysis', pill: 'NEW' },
]

export default function App() {
  const [tab, setTab] = useState('flux')
  const [regionCode, setRegionCode] = useState('NA')
  const region = REGIONS.find((r) => r.code === regionCode)

  return (
    <div className="app">
      <header className="appbar">
        <StandardLogo />
        <div className="brand-divider" />
        <div className="brand">
          <div>
            <div className="brand-name">BS Flux <span className="accent">Sol</span></div>
            <div className="brand-sub">Balance Sheet Flux Reporting</div>
          </div>
        </div>
        <div className="appbar-spacer" />
        <div className="period-chip">📅 {PERIOD}</div>
        <div className="region-wrap">
          <span className="region-label">Region</span>
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

      <main>
        {tab === 'process' && <ProcessFlow />}
        {tab === 'flux' && <FluxAnalysis region={region} />}
        {tab === 'commentary' && <Commentary region={region} />}
        {tab === 'anomaly' && <AnomalyIntelligence region={region} />}
        {tab === 'whatif' && <WhatIf region={region} />}
      </main>

      <footer className="foot">
        <strong style={{ color: 'var(--graphite)', letterSpacing: '0.06em' }}>STANDARD INDUSTRIES</strong>
        <span style={{ color: 'var(--brand)' }}> ◆ </span>
        Balance Sheet Flux Sol · illustrative demo build · FY2025 Period 12 · figures are synthetic ·
        brand elements shown for internal-tool alignment
      </footer>
    </div>
  )
}
