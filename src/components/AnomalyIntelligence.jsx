import { useState } from 'react'
import {
  ANOMALY_SUMMARY, ANOMALIES, HEATMAP, TREND_SIGNALS, REGIONAL_BENCHMARK,
  fmtM, scale,
} from '../data.js'
import Sparkline from './Sparkline.jsx'

const TAG_META = {
  statistical: { label: 'σ Statistical' },
  seasonal: { label: '📅 Seasonal' },
  trend: { label: '↗ Trend Break' },
  benchmark: { label: '⚡ Benchmark' },
  peer: { label: '◈ Peer Outlier' },
}
const RISK_LABEL = { high: '● High Risk', medium: '◑ Medium', low: '○ Low' }

const FILTERS = [
  ['all', 'All'], ['high', 'High Risk'], ['statistical', 'Statistical'],
  ['seasonal', 'Seasonal'], ['benchmark', 'Benchmark'],
]

function heatColor(z) {
  // 0 -> pale blue, ~2 -> amber, >=4 -> red
  const t = Math.min(z / 4, 1)
  if (t < 0.5) {
    const k = t / 0.5
    return mix([219, 234, 254], [245, 158, 11], k)
  }
  const k = (t - 0.5) / 0.5
  return mix([245, 158, 11], [220, 38, 38], k)
}
function mix(a, b, k) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * k))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

export default function AnomalyIntelligence({ region }) {
  const f = region.factor
  const [filter, setFilter] = useState('all')

  const anomalies = ANOMALIES.filter((a) => {
    if (filter === 'all') return true
    if (filter === 'high') return a.risk === 'high'
    return a.tags.includes(filter)
  })

  const highCount = ANOMALIES.filter((a) => a.risk === 'high').length

  return (
    <div className="page">
      <div className="page-head">
        <h2 className="page-title">Anomaly Intelligence — Comprehensive Variance Analysis</h2>
        <div className="page-sub">
          Historical trends · Benchmarks · Statistical outliers · Seasonality · Peer comparisons · Risk signals
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <span className="badge-count detected">⚡ {ANOMALIES.length} Anomalies Detected</span>
        <span className="badge-count high">● {highCount} High Risk</span>
      </div>

      <div className="anomaly-summary">
        {ANOMALY_SUMMARY.map((s) => (
          <div className="asum" key={s.key}>
            <div className="n">{s.value}</div>
            <div className="t">{s.title}</div>
            <div className="s">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="panel mt">
        <div className="panel-head">
          <div className="panel-title">Account-Level Anomaly Breakdown</div>
          <div className="filters">
            {FILTERS.map(([k, l]) => (
              <button key={k} className={`filter-chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="panel-pad grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {anomalies.map((a) => (
            <div className={`anom-card ${a.risk}`} key={a.code}>
              <div className="anom-top">
                <span className="anom-code">{a.code}</span>
                <span className="anom-desc">{a.desc}</span>
                <span className="cmt-spacer" />
                <span className={`risk-badge ${a.risk}`}>{RISK_LABEL[a.risk]}</span>
                <span className="z-badge">z={a.z}σ</span>
              </div>
              <div className="anom-tags">
                {a.tags.map((t) => <span className="anom-tag" key={t}>{TAG_META[t].label}</span>)}
              </div>
              <div className="anom-vars">
                <div className="anom-var">
                  <div className="l">vs Budget</div>
                  <div className="v" style={{ color: a.budVar >= 0 ? 'var(--pos)' : 'var(--neg)' }}>
                    {a.budVar >= 0 ? '+' : '-'}{fmtM(Math.abs(scale(a.budVar, f)))}
                  </div>
                  <div className="p">{a.budPct}%</div>
                </div>
                <div className="anom-var">
                  <div className="l">vs Prior Year</div>
                  <div className="v" style={{ color: a.pyVar >= 0 ? 'var(--pos)' : 'var(--neg)' }}>
                    {a.pyVar >= 0 ? '+' : '-'}{fmtM(Math.abs(scale(a.pyVar, f)))}
                  </div>
                  <div className="p">{a.pyPct}%</div>
                </div>
                <div className="anom-var" style={{ marginLeft: 'auto' }}>
                  <div className="l">6-Period</div>
                  <div className="spark"><Sparkline data={a.trend} color={a.risk === 'high' ? '#dc2626' : a.risk === 'medium' ? '#d97706' : '#16a34a'} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel mt">
        <div className="panel-head"><div className="panel-title">Risk Heat Map</div>
          <div className="panel-note">Risk Score by Account (z-score)</div></div>
        <div className="panel-pad">
          <div className="heat-grid">
            {HEATMAP.map((h, i) => (
              <div className="heat-cell" key={i}>
                <div className="heat-box" style={{ background: heatColor(h.z) }}>{h.z.toFixed(1)}</div>
                <div className="heat-lbl">{h.label}</div>
              </div>
            ))}
          </div>
          <div className="heat-scale">
            <span>Low</span>
            <div className="heat-gradient" />
            <span>High</span>
          </div>
        </div>
      </div>

      <div className="two-col mt">
        <div className="panel">
          <div className="panel-head"><div className="panel-title">6-Period Trend Signals</div></div>
          <div className="panel-pad">
            {TREND_SIGNALS.map((t) => (
              <div className="trend-row" key={t.code}>
                <div className="trend-meta">
                  <div className="c">{t.code}</div>
                  <div className="d">{t.desc}</div>
                </div>
                <Sparkline data={t.series} width={110} color={t.dir === 'up' ? '#16a34a' : '#dc2626'} />
                <div className="trend-val" style={{ color: t.dir === 'up' ? 'var(--pos)' : 'var(--neg)' }}>
                  {t.dir === 'up' ? '↑' : '↓'} {t.mag}
                </div>
                <div className="trend-z">z={t.z}σ</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><div className="panel-title">Regional Benchmark vs {region.name} Actuals</div></div>
          <div className="panel-pad">
            {REGIONAL_BENCHMARK.map((b) => {
              const vals = [
                { r: 'ELEC', v: b.na, c: '#1f2328' },
                { r: 'GAS', v: b.apac, c: '#91999f' },
                { r: 'WATER', v: b.intl, c: '#ed2a37' },
              ]
              const max = Math.max(...vals.map((x) => x.v))
              return (
                <div className="bench-group" key={b.label}>
                  <div className="bench-title">{b.label}</div>
                  {vals.map((x) => (
                    <div className="bench-row" key={x.r}>
                      <div className="bench-lbl">{x.r}</div>
                      <div className="bench-track">
                        <div className="bench-fill" style={{ width: `${(x.v / max) * 100}%`, background: x.c }}>
                          {fmtM(x.v)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
