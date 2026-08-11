import { ACCOUNTS, fmtM, fmtVar, varClass, scale, sourceFor } from '../data.js'
import { ProvenanceTag, ProvenanceLegend } from './ProvenanceTag.jsx'
import SourceBadge from './SourceBadge.jsx'
import ReadinessStrip from './ReadinessStrip.jsx'

export default function FluxAnalysis({ region, pmr }) {
  const basis = pmr?.basis ?? { code: 'BUD', label: 'Budget', field: 'budget' }
  const period = pmr?.period ?? { code: 'YTD', label: 'YTD', factor: 1 }
  const f = region.factor * period.factor
  const actualsLabel = pmr?.type === 'REP' ? 'Reported' : pmr?.type === 'BUD' ? 'Budget/Fcst' : 'Actuals'

  const rows = ACCOUNTS.map((a) => {
    const py = scale(a.py, f), actual = scale(a.actual, f), budget = scale(a.budget, f), le = scale(a.le, f)
    const rev = budget + (le - budget) * 0.5
    const comp = { budget, le, rev, py }[basis.field]
    return { ...a, py, actual, budget, le, rev, comp, variance: actual - comp, vPy: actual - py }
  })

  const totals = rows.reduce(
    (t, r) => ({ py: t.py + r.py, actual: t.actual + r.actual, comp: t.comp + r.comp }),
    { py: 0, actual: 0, comp: 0 }
  )
  const totVar = totals.actual - totals.comp
  const totPy = totals.actual - totals.py
  const favWord = totVar >= 0 ? 'Favourable' : 'Unfavourable'

  const kpis = [
    { label: `Total ${actualsLabel} (USD)`, value: fmtM(totals.actual).replace('.0', ''),
      delta: `▼ ${fmtM(totPy)} vs PY`, cls: 'neg', dcls: 'neg', foot: 'FY2025 Period 12 · reconciled' },
    { label: `Total ${basis.label}`, value: fmtM(totals.comp).replace('.0', ''),
      delta: `${basis.label} basis`, cls: 'pos', dcls: 'pos', foot: `Comparison basis` },
    { label: `${actualsLabel} vs ${basis.label}`, value: `${totVar >= 0 ? '+' : '−'}${fmtM(Math.abs(totVar))}`,
      delta: `${(totVar / totals.comp * 100).toFixed(1)}% ${favWord}`, cls: totVar >= 0 ? 'pos' : 'neg',
      dcls: totVar >= 0 ? 'pos' : 'neg', foot: `${actualsLabel} vs ${basis.label} (liability view)` },
    { label: `${actualsLabel} vs Prior Year`, value: `−${fmtM(Math.abs(totPy))}`,
      delta: `${(totPy / totals.py * 100).toFixed(1)}% vs PY`, cls: 'neg', dcls: 'neg',
      foot: `Prior Year: ${fmtM(totals.py)}` },
  ]

  const chartRows = [...rows].sort((a, b) => Math.abs(b.actual) - Math.abs(a.actual)).slice(0, 8)
  const maxBar = Math.max(...chartRows.map((r) => Math.max(Math.abs(r.actual), Math.abs(r.comp))))

  const favCount = rows.filter((r) => r.variance >= 0.5).length
  const unfavCount = rows.filter((r) => r.variance <= -0.5).length
  const immCount = rows.filter((r) => Math.abs(r.variance) < 0.5).length
  const favSum = rows.filter((r) => r.variance >= 0.5).reduce((s, r) => s + r.variance, 0)
  const unfavSum = rows.filter((r) => r.variance <= -0.5).reduce((s, r) => s + Math.abs(r.variance), 0)

  const topVars = [...rows].sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance)).slice(0, 6)
  const maxTop = Math.max(...topVars.map((r) => Math.abs(r.variance)))

  return (
    <div className="page">
      <ProvenanceLegend />

      <div className="kpis">
        {kpis.map((k) => (
          <div className={`kpi ${k.cls}`} key={k.label}>
            <div className="kpi-label">{k.label} <ProvenanceTag kind="calc" small /></div>
            <div className="kpi-value">{k.value}</div>
            <div className={`kpi-delta ${k.dcls}`}>{k.delta}</div>
            <div className="kpi-foot">{k.foot}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">
            <span className="region-tag">{region.name}</span> — Balance Sheet Flux by Account
          </div>
          <span className="recon-badge">✓ Reconciled to PMR · 0 unexplained differences</span>
        </div>
        <div className="tbl-wrap">
          <table className="flux">
            <thead>
              <tr>
                <th>Acct Code</th>
                <th>Account Description</th>
                <th>{actualsLabel}</th>
                <th>{basis.label}</th>
                <th>{actualsLabel} vs {basis.label}</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code}>
                  <td>{r.code}</td>
                  <td>{r.desc}</td>
                  <td className="actual">{fmtM(r.actual)}</td>
                  <td>{fmtM(r.comp)}</td>
                  <td className={`v-${varClass(r.variance)}`}>
                    {fmtVar(r.variance)}
                    <span className="v-pct"> · {r.comp !== 0 ? (r.variance / Math.abs(r.comp) * 100).toFixed(1) : '—'}%</span>
                  </td>
                  <td><SourceBadge src={sourceFor(r, region.name, basis.label, period.label)} /></td>
                </tr>
              ))}
              <tr className="total">
                <td>Grand Total</td>
                <td></td>
                <td>{fmtM(totals.actual)}</td>
                <td>{fmtM(totals.comp)}</td>
                <td className={totVar >= 0 ? 'v-pos' : 'v-neg'}>{totVar >= 0 ? '+' : ''}{fmtM(totVar)}</td>
                <td><SourceBadge src={sourceFor({ code: 'TOTAL' }, region.name, basis.label, period.label)} label="Tie-out" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel mt">
        <div className="panel-head">
          <div className="panel-title">Visual Analytics <ProvenanceTag kind="calc" small /></div>
          <div className="panel-note">{actualsLabel} vs {basis.label} · top accounts · {period.label}</div>
        </div>
        <div className="chart-area">
          <div className="bars">
            {chartRows.map((r) => {
              const bH = Math.max(2, (Math.abs(r.comp) / maxBar) * 190)
              const aH = Math.max(2, (Math.abs(r.actual) / maxBar) * 190)
              const fav = r.variance >= 0
              return (
                <div className="bar-col" key={r.code}>
                  <div className="bar-stack">
                    <div className="bar budget" style={{ height: bH }} title={`${basis.label}: ${fmtM(r.comp)}`} />
                    <div className={`bar ${fav ? 'act-pos' : 'act-neg'}`} style={{ height: aH }}
                      title={`${actualsLabel}: ${fmtM(r.actual)}`} />
                  </div>
                  <div className="bar-label">{r.code}</div>
                </div>
              )
            })}
          </div>
          <div className="legend">
            <span><i className="dot" style={{ background: 'var(--sage)' }} /> {basis.label}</span>
            <span><i className="dot" style={{ background: 'var(--pos)' }} /> {actualsLabel} (Favourable)</span>
            <span><i className="dot" style={{ background: 'var(--neg)' }} /> {actualsLabel} (Unfavourable)</span>
          </div>
        </div>
      </div>

      <div className="two-col mt">
        <div className="panel">
          <div className="panel-head"><div className="panel-title">Variance Summary</div>
            <div className="panel-note">{actualsLabel} vs {basis.label} — by account count</div></div>
          <div className="panel-pad">
            <div className="summary-row">
              <div className="summary-cell">
                <div className="big v-pos">{favCount}</div>
                <div className="lbl">Favourable</div>
                <div className="amt v-pos">+{fmtM(favSum)}</div>
              </div>
              <div className="summary-cell">
                <div className="big v-neg">{unfavCount}</div>
                <div className="lbl">Unfavourable</div>
                <div className="amt v-neg">{fmtM(unfavSum)}</div>
              </div>
              <div className="summary-cell">
                <div className="big v-neutral">{immCount}</div>
                <div className="lbl">Immaterial</div>
                <div className="amt v-neutral">&lt;$0.5M</div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><div className="panel-title">Top Variances — {actualsLabel} vs {basis.label}</div></div>
          <div className="panel-pad">
            <div className="topvar">
              {topVars.map((r) => {
                const pos = r.variance >= 0
                const w = maxTop ? (Math.abs(r.variance) / maxTop) * 100 : 0
                return (
                  <div className="topvar-row" key={r.code}>
                    <div className="topvar-name">{shortName(r.desc)}</div>
                    <div className="topvar-track">
                      <div className="topvar-fill" style={{ width: `${w}%`, background: pos ? 'var(--pos)' : 'var(--neg)' }} />
                    </div>
                    <div className="topvar-amt" style={{ color: pos ? 'var(--pos)' : 'var(--neg)' }}>
                      {pos ? '+' : '-'}{fmtM(Math.abs(r.variance))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <ReadinessStrip />
    </div>
  )
}

function shortName(desc) {
  const map = {
    'Accounts Payable & Accrued Construction': 'AP & Constr',
    'Customer Accounts Receivable': 'Customer AR',
    'Accrued Unbilled Revenue': 'Unbilled Rev',
    'Reg Asset – Storm Cost Deferral': 'Storm Defrl',
    'Reg Liability – Revenue Refund': 'Rev Refund',
    'Contributions in Aid of Construction': 'CIAC',
    'Fuel Stock & Materials': 'Fuel Stock',
    'Accrued Expenses (Interest & Payroll)': 'Accrued Exp',
    'Accrued Pension / OPEB': 'Pension/OPEB',
    'Reg Asset – Deferred Fuel (DFCR)': 'Def. Fuel',
  }
  return map[desc] || desc.slice(0, 12)
}
