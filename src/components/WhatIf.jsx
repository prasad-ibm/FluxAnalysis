import { useState, useMemo } from 'react'
import { WHATIF_BASELINE, WHATIF_ITEMS, fmtM, scale } from '../data.js'

export default function WhatIf({ region }) {
  const f = region.factor
  const [pcts, setPcts] = useState(() => Object.fromEntries(WHATIF_ITEMS.map((i) => [i.code, 0])))
  const [open, setOpen] = useState(null)

  const base = {
    net: scale(WHATIF_BASELINE.net, f),
    variance: scale(WHATIF_BASELINE.variance, f),
    arDays: WHATIF_BASELINE.arDays,
    liquidity: WHATIF_BASELINE.liquidity,
    confidence: WHATIF_BASELINE.confidence,
  }

  const calc = useMemo(() => {
    let netDelta = 0, varDelta = 0, sumPct = 0, correctedCount = 0
    const steps = []
    for (const item of WHATIF_ITEMS) {
      const p = pcts[item.code] / 100
      sumPct += pcts[item.code]
      if (p > 0) {
        correctedCount += 1
        const d = scale(item.netDelta, f) * p
        netDelta += d
        varDelta += scale(item.varDelta, f) * p
        steps.push({ code: item.code, desc: item.desc, delta: d, pct: pcts[item.code] })
      }
    }
    const progress = sumPct / (WHATIF_ITEMS.length * 100)
    return {
      net: base.net + netDelta,
      variance: base.variance + varDelta,
      arDays: Math.round(base.arDays - 4 * progress),
      liquidity: base.liquidity + 0.15 * progress,
      confidence: Math.round(base.confidence + (100 - base.confidence) * progress),
      correctedCount,
      progress,
      netDelta,
      steps,
    }
  }, [pcts, f]) // eslint-disable-line react-hooks/exhaustive-deps

  function setPct(code, v) { setPcts((prev) => ({ ...prev, [code]: v })) }
  function resetAll() { setPcts(Object.fromEntries(WHATIF_ITEMS.map((i) => [i.code, 0]))) }

  const netSign = calc.netDelta >= 0 ? '+' : '−'
  const varToBudgetPct = calc.variance >= 0 ? 'pos' : 'neg'

  const metricRows = [
    { l: 'Net Working Capital', v: fmtM(calc.net), base: fmtM(base.net), changed: Math.abs(calc.netDelta) > 0.05,
      chg: `${netSign}${fmtM(Math.abs(calc.netDelta))}` },
    { l: 'AR Turnover Days', v: `${calc.arDays} days`, base: `${base.arDays} days`, changed: calc.arDays !== base.arDays,
      chg: `${calc.arDays - base.arDays} days` },
    { l: 'Liquidity Ratio', v: `${calc.liquidity.toFixed(2)}x`, base: `${base.liquidity.toFixed(2)}x`,
      changed: Math.abs(calc.liquidity - base.liquidity) > 0.005, chg: `+${(calc.liquidity - base.liquidity).toFixed(2)}` },
    { l: 'Variance to Budget', v: `${calc.variance >= 0 ? '+' : '−'}${fmtM(Math.abs(calc.variance))}`,
      base: `−${fmtM(Math.abs(base.variance))}`, changed: Math.abs(calc.variance - base.variance) > 0.05,
      chg: `${fmtM(Math.abs(calc.variance - base.variance))} closed` },
  ]

  return (
    <div className="page">
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="page-title">What-If Analysis — Anomaly Impact Simulator</h2>
          <div className="page-sub">
            Click any anomaly card to expand its inline controls. Adjust correction sliders and see live metric
            impacts and the scenario waterfall update instantly. <span className="region-tag">{region.name}</span>
          </div>
        </div>
        <button className="btn-ghost" onClick={resetAll}>↺ Reset All</button>
      </div>

      <div className="wi-metrics">
        <div className="wi-metric">
          <div className="l">Adjusted Net Position</div>
          <div className="v">{fmtM(calc.net)}</div>
          <div className={`d ${Math.abs(calc.netDelta) > 0.05 ? (calc.netDelta >= 0 ? 'pos' : 'neg') : ''}`}>
            {netSign} {fmtM(Math.abs(calc.netDelta))} vs baseline
          </div>
        </div>
        <div className="wi-metric">
          <div className="l">Variance to Budget</div>
          <div className="v">{calc.variance >= 0 ? '+' : '−'}{fmtM(Math.abs(calc.variance))}</div>
          <div className={`d ${varToBudgetPct === 'pos' ? 'pos' : ''}`}>
            {calc.correctedCount === 0 ? 'No correction yet' : `${fmtM(Math.abs(calc.variance - base.variance))} closed`}
          </div>
        </div>
        <div className="wi-metric">
          <div className="l">Anomalies Corrected</div>
          <div className="v">{calc.correctedCount} / {WHATIF_ITEMS.length}</div>
          <div className="d">{Math.round(calc.progress * 100)}% resolved</div>
        </div>
        <div className="wi-metric">
          <div className="l">Forecast Confidence</div>
          <div className="v">{calc.confidence}%</div>
          <div className={`d ${calc.confidence > base.confidence ? 'pos' : ''}`}>
            {calc.confidence > base.confidence ? `+${calc.confidence - base.confidence}% improved` : 'Baseline accuracy'}
          </div>
        </div>
      </div>

      <div className="wi-layout">
        <div>
          {WHATIF_ITEMS.map((item) => {
            const isOpen = open === item.code
            const p = pcts[item.code]
            const mag = scale(item.mag, f)
            const impact = scale(item.netDelta, f) * (p / 100)
            return (
              <div className={`wi-card ${item.risk}`} key={item.code}>
                <div className="wi-card-head" onClick={() => setOpen(isOpen ? null : item.code)}>
                  <span className="wi-icon">{item.icon}</span>
                  <span className="wi-code">{item.code}</span>
                  <span className={`wi-risk ${item.risk}`}>{item.risk.toUpperCase()}</span>
                  <span className="wi-mag">{fmtM(mag)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="wi-name">{item.desc}</div>
                    <div className="wi-note">{item.note}</div>
                  </div>
                  {p > 0 && <span className="wi-pct" style={{ width: 'auto' }}>{p}%</span>}
                  <span className={`wi-caret ${isOpen ? 'open' : ''}`}>▼</span>
                </div>
                {isOpen && (
                  <div className="wi-body">
                    <div className="wi-slider-row">
                      <input
                        className="wi-slider" type="range" min="0" max="100" value={p}
                        onChange={(e) => setPct(item.code, Number(e.target.value))}
                      />
                      <span className="wi-pct">{p}%</span>
                    </div>
                    <div className="wi-impact">
                      <span><span className="l">Correction applied: </span><span className="v">{fmtM(mag * p / 100)}</span></span>
                      <span><span className="l">Net position impact: </span>
                        <span className="v" style={{ color: impact >= 0 ? 'var(--pos)' : 'var(--neg)' }}>
                          {impact >= 0 ? '+' : '−'}{fmtM(Math.abs(impact))}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">Impact on Key Metrics</div></div>
            <div className="panel-pad">
              {metricRows.map((m) => (
                <div className="metric-mini" key={m.l}>
                  <div className="l">{m.l}</div>
                  <div>
                    <span className="v">{m.v}</span>
                    <span className="chg" style={{ color: m.changed ? 'var(--brand)' : 'var(--ink-3)' }}>
                      {m.changed ? m.chg : '— baseline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel mt">
            <div className="panel-head"><div className="panel-title">Scenario Waterfall — Applied Corrections</div></div>
            <div className="panel-pad">
              {calc.steps.length === 0 ? (
                <div className="wf-empty">Apply corrections on the left to build the waterfall chart</div>
              ) : (
                <Waterfall baseNet={base.net} steps={calc.steps} finalNet={calc.net} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Waterfall({ baseNet, steps, finalNet }) {
  const W = 480, H = 260, padL = 46, padR = 12, padT = 16, padB = 46
  const plotW = W - padL - padR, plotH = H - padT - padB

  // running totals to find axis bounds
  let run = baseNet
  const running = [baseNet]
  for (const s of steps) { run += s.delta; running.push(run) }
  const allVals = [baseNet, finalNet, ...running]
  let yMin = Math.min(...allVals), yMax = Math.max(...allVals)
  const pad = (yMax - yMin) * 0.25 || 5
  yMin -= pad; yMax += pad
  const yToPx = (v) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH

  const cols = steps.length + 2 // baseline + steps + final
  const gap = 14
  const colW = (plotW - gap * (cols - 1)) / cols
  const x = (i) => padL + i * (colW + gap)

  const shortName = (s) => s.code

  const bars = []
  // baseline
  bars.push({ i: 0, top: yToPx(baseNet), bot: yToPx(yMin), color: '#A2BCB1', label: 'Baseline', val: baseNet, connectFrom: baseNet })
  let prev = baseNet
  steps.forEach((s, idx) => {
    const start = prev, end = prev + s.delta
    const top = yToPx(Math.max(start, end)), bot = yToPx(Math.min(start, end))
    bars.push({ i: idx + 1, top, bot: Math.max(bot, top + 2), color: s.delta >= 0 ? '#008737' : '#c62828', label: shortName(s), val: s.delta, isDelta: true, endLevel: end })
    prev = end
  })
  // final
  bars.push({ i: cols - 1, top: yToPx(finalNet), bot: yToPx(yMin), color: '#00402A', label: 'Adjusted', val: finalNet })

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%' }}>
      {/* baseline gridline */}
      <line x1={padL} y1={yToPx(baseNet)} x2={W - padR} y2={yToPx(baseNet)} stroke="#e2e8f0" strokeDasharray="3 3" />
      {bars.map((b, i) => {
        const bx = x(b.i)
        const barH = Math.max(2, b.bot - b.top)
        return (
          <g key={i}>
            <rect x={bx} y={b.top} width={colW} height={barH} rx="3" fill={b.color} />
            {/* connector line to next bar top level */}
            {b.isDelta && i < bars.length - 1 && (
              <line x1={bx} y1={yToPx(b.endLevel)} x2={bx + colW + gap} y2={yToPx(b.endLevel)}
                stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            )}
            {!b.isDelta && i === 0 && (
              <line x1={bx + colW} y1={yToPx(baseNet)} x2={bx + colW + gap} y2={yToPx(baseNet)}
                stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            )}
            <text x={bx + colW / 2} y={b.top - 5} textAnchor="middle" fontSize="10" fontWeight="700"
              fill={b.isDelta ? b.color : '#334155'}>
              {b.isDelta ? `${b.val >= 0 ? '+' : '−'}${fmtM(Math.abs(b.val))}` : fmtM(b.val)}
            </text>
            <text x={bx + colW / 2} y={H - padB + 16} textAnchor="middle" fontSize="9.5" fill="#94a3b8">{b.label}</text>
          </g>
        )
      })}
      {/* y axis labels */}
      {[yMin, (yMin + yMax) / 2, yMax].map((v, i) => (
        <text key={i} x={padL - 8} y={yToPx(v) + 3} textAnchor="end" fontSize="9" fill="#cbd5e1">{fmtM(v)}</text>
      ))}
    </svg>
  )
}
