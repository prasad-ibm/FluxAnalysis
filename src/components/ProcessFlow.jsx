import { useState, useRef, useEffect } from 'react'
import { AGENTS } from '../data.js'

const LEGEND = [
  { c: '#1f2328', l: 'Orchestrator' },
  { c: '#5b6169', l: 'Data Agents' },
  { c: '#157347', l: 'Analysis Agents' },
  { c: '#ed2a37', l: 'Anomaly Detection' },
  { c: '#7a8087', l: 'AI Commentary' },
  { c: '#b45309', l: 'Governance' },
]

const SIM_STEPS = [
  'Orchestrator · planning BS Flux workflow for 4 operating companies…',
  'Data Extractor · connecting to source ledger / RAC House (WD3/WD4)…',
  'Data Extractor · downloaded 4 OpCo ledgers · 13 accounts parsed',
  'Data Validator · completeness 100% · 0 missing entities',
  'RAC Connector · live connection cached · auth OK',
  'Variance Agent · computed Act vs Budget & Act vs PY · 13 lines',
  'Variance Agent · flagged 11 material variances (>$0.5M)',
  'Benchmark Agent · seasonality + peer-OpCo benchmarks applied',
  'Anomaly Agent · multi-model pass · storm-deferral & unbilled-revenue outliers',
  'Anomaly Agent · z-score, seasonal & trend-break models complete',
  'Commentary Agent · drafted commentary for 8 material variances',
  'Review Agent · scored drafts · routed to account owners',
  'Controls Agent · SOX checks passed · audit trail sealed',
  '✓ BS Flux cycle complete · report assembled',
]

const AGENT_CLS = {
  orchestrator: '#1f2328', data: '#5b6169', analysis: '#157347',
  anomaly: '#ed2a37', commentary: '#7a8087', governance: '#b45309',
}

export default function ProcessFlow() {
  const [view, setView] = useState('agentic')
  const [log, setLog] = useState([])
  const [running, setRunning] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  function run() {
    if (running) return
    setRunning(true)
    setLog([])
    let i = 0
    timer.current = setInterval(() => {
      setLog((prev) => [...prev, SIM_STEPS[i]])
      i += 1
      if (i >= SIM_STEPS.length) {
        clearInterval(timer.current)
        setRunning(false)
      }
    }, 450)
  }
  function reset() {
    clearInterval(timer.current)
    setRunning(false)
    setLog([])
  }

  return (
    <div className="page">
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="page-title">Agentic BS Flux — AI Orchestration Architecture</h2>
          <div className="page-sub">Point of view: how autonomous agents execute the full balance sheet flux cycle end-to-end</div>
        </div>
        <div className="seg">
          <button className={view === 'agentic' ? 'active' : ''} onClick={() => setView('agentic')}>Agentic View</button>
          <button className={view === 'sop' ? 'active' : ''} onClick={() => setView('sop')}>SOP Process Flow</button>
        </div>
      </div>

      <div className="legend" style={{ marginBottom: 16 }}>
        {LEGEND.map((x) => (
          <span key={x.l}><i className="dot" style={{ background: x.c, borderRadius: '50%' }} /> {x.l}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <button className="btn-save" onClick={run} disabled={running}>▶ Run Simulation</button>
        <button className="btn-ghost" onClick={reset}>↻ Reset</button>
      </div>

      <div className="panel">
        <div className="panel-head"><div className="panel-title">Agent Execution Log</div>
          <div className="panel-note">{running ? 'Running…' : log.length ? 'Complete' : 'Ready · Click Run to start simulation'}</div></div>
        <div className="panel-pad">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.9, minHeight: 80, color: 'var(--ink-2)' }}>
            {log.length === 0 && <span style={{ color: 'var(--ink-3)' }}>› waiting for run…</span>}
            {log.map((line, i) => (
              <div key={i} style={{ color: line.startsWith('✓') ? 'var(--pos)' : 'var(--ink-2)' }}>
                <span style={{ color: 'var(--brand)' }}>›</span> {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-title" style={{ margin: '24px 2px 12px', fontSize: 16 }}>Agent Roster — Capabilities &amp; Tools</div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {AGENTS.map((a) => (
          <div className="panel panel-pad" key={a.name} style={{ borderTop: `3px solid ${AGENT_CLS[a.cls]}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: AGENT_CLS[a.cls] }}>
                  {a.mode ? `${a.mode} · ` : ''}{a.kind}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.55, margin: '10px 0' }}>{a.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {a.tools.map((t) => (
                <span key={t} style={{ fontSize: 10.5, fontWeight: 600, background: 'var(--bg)', color: 'var(--ink-2)', padding: '3px 8px', borderRadius: 6 }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
