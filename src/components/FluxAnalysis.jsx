import { useState } from 'react'
import { ACCOUNTS, fmtM, fmtVar, varClass, scale } from '../data.js'

export default function FluxAnalysis({ region }) {
  const [view, setView] = useState('budget') // budget | py | both
  const [chartView, setChartView] = useState('budget')
  const f = region.factor

  const rows = ACCOUNTS.map((a) => {
    const py = scale(a.py, f), actual = scale(a.actual, f), budget = scale(a.budget, f), le = scale(a.le, f)
    return { ...a, py, actual, budget, le, vBud: actual - budget, vPy: actual - py }
  })

  const totals = rows.reduce(
    (t, r) => ({ py: t.py + r.py, actual: t.actual + r.actual, budget: t.budget + r.budget, le: t.le + r.le }),
    { py: 0, actual: 0, budget: 0, le: 0 }
  )
  const totBud = totals.actual - totals.budget
  const totPy = totals.actual - totals.py

  const kpis = [
    { label: 'Total Actuals (USD)', value: fmtM(totals.actual).replace('.0', ''), delta: `▼ ${fmtM(totPy)}`,
      cls: 'neg', dcls: 'neg', foot: 'FY2025 Period 12 Close' },
    { label: 'Total Budget', value: fmtM(totals.budget).replace('.0', ''), delta: `▲ ${fmtM(totBud)} above Actuals`,
      cls: 'pos', dcls: 'pos', foot: 'Annual Budget Target' },
    { label: 'Actual vs Budget', value: `+${fmtM(totBud)}`, delta: `+${(totBud / totals.budget * 100).toFixed(1)}% Favourable`,
      cls: 'pos', dcls: 'pos', foot: 'Actuals below Budget (liability view)' },
    { label: 'Actual vs Prior Year', value: `−${fmtM(Math.abs(totPy))}`, delta: `${(totPy / totals.py * 100).toFixed(1)}% vs PY`,
      cls: 'neg', dcls: 'neg', foot: `Prior Year End: ${fmtM(totals.py)}` },
  ]

  // chart uses top accounts by absolute actual value
  const chartRows = [...rows].sort((a, b) => Math.abs(b.actual) - Math.abs(a.actual)).slice(0, 8)
  const maxBar = Math.max(...chartRows.map((r) => Math.max(Math.abs(r.actual), Math.abs(r.budget))))

  const favCount = rows.filter((r) => r.vBud >= 0.5).length
  const unfavCount = rows.filter((r) => r.vBud <= -0.5).length
  const immCount = rows.filter((r) => Math.abs(r.vBud) < 0.5).length
  const favSum = rows.filter((r) => r.vBud >= 0.5).reduce((s, r) => s + r.vBud, 0)
  const unfavSum = rows.filter((r) => r.vBud <= -0.5).reduce((s, r) => s + Math.abs(r.vBud), 0)

  const topVars = [...rows].sort((a, b) => Math.abs(b.vBud) - Math.abs(a.vBud)).slice(0, 6)
  const maxTop = Math.max(...topVars.map((r) => Math.abs(r.vBud)))

  return (
    <div className="page">
      <div className="kpis">
        {kpis.map((k) => (
          <div className={`kpi ${k.cls}`} key={k.label}>
            <div className="kpi-label">{k.label}</div>
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
          <div className="seg">
            {[['budget', 'Act vs Budget'], ['py', 'Act vs Prior Year'], ['both', 'Both']].map(([v, l]) => (
              <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="tbl-wrap">
          <table className="flux">
            <thead>
              <tr>
                <th>Acct Code</th>
                <th>Account Description</th>
                <th>Prior Year End</th>
                <th>Actuals</th>
                <th>Budget</th>
                {(view === 'budget' || view === 'both') && <th>Act vs Budget</th>}
                {(view === 'py' || view === 'both') && <th>Act vs PY</th>}
                <th>LE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code}>
                  <td>{r.code}</td>
                  <td>{r.desc} ›</td>
                  <td>{fmtM(r.py)}</td>
                  <td className="actual">{fmtM(r.actual)}</td>
                  <td>{fmtM(r.budget)}</td>
                  {(view === 'budget' || view === 'both') && (
                    <td className={`v-${varClass(r.vBud)}`}>{fmtVar(r.vBud)}</td>
                  )}
                  {(view === 'py' || view === 'both') && (
                    <td className={`v-${varClass(r.vPy)}`}>{fmtVar(r.vPy)}</td>
                  )}
                  <td>{fmtM(r.le)}</td>
                  <td><button className="chip-detail">Detail</button></td>
                </tr>
              ))}
              <tr className="total">
                <td>Grand Total</td>
                <td></td>
                <td>{fmtM(totals.py)}</td>
                <td>{fmtM(totals.actual)}</td>
                <td>{fmtM(totals.budget)}</td>
                {(view === 'budget' || view === 'both') && <td className="v-pos">+{fmtM(totBud)}</td>}
                {(view === 'py' || view === 'both') && <td className="v-neg">{fmtM(totPy)}</td>}
                <td>{fmtM(totals.le)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel mt">
        <div className="panel-head">
          <div className="panel-title">Visual Analytics</div>
          <div className="seg">
            {[['budget', 'Act vs Budget'], ['py', 'Act vs Prior Year']].map(([v, l]) => (
              <button key={v} className={chartView === v ? 'active' : ''} onClick={() => setChartView(v)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="chart-area">
          <div className="panel-note" style={{ marginBottom: 10 }}>
            Actuals vs {chartView === 'budget' ? 'Budget' : 'Prior Year'} — Top Accounts (USD) · hover a bar for detail
          </div>
          <div className="bars">
            {chartRows.map((r) => {
              const comp = chartView === 'budget' ? r.budget : r.py
              const bH = Math.max(2, (Math.abs(comp) / maxBar) * 190)
              const aH = Math.max(2, (Math.abs(r.actual) / maxBar) * 190)
              const fav = (chartView === 'budget' ? r.vBud : r.vPy) >= 0
              return (
                <div className="bar-col" key={r.code}>
                  <div className="bar-stack">
                    <div className="bar budget" style={{ height: bH }}
                      title={`${chartView === 'budget' ? 'Budget' : 'PY'}: ${fmtM(comp)}`} />
                    <div className={`bar ${fav ? 'act-pos' : 'act-neg'}`} style={{ height: aH }}
                      title={`Actual: ${fmtM(r.actual)}`} />
                  </div>
                  <div className="bar-label">{r.code}</div>
                </div>
              )
            })}
          </div>
          <div className="legend">
            <span><i className="dot" style={{ background: '#cbd5e1' }} /> {chartView === 'budget' ? 'Budget' : 'Prior Year'}</span>
            <span><i className="dot" style={{ background: 'var(--pos)' }} /> Actual (Favourable)</span>
            <span><i className="dot" style={{ background: 'var(--neg)' }} /> Actual (Unfavourable)</span>
          </div>
        </div>
      </div>

      <div className="two-col mt">
        <div className="panel">
          <div className="panel-head"><div className="panel-title">Variance Summary</div>
            <div className="panel-note">Act vs Budget — by account count</div></div>
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
          <div className="panel-head"><div className="panel-title">Top Variances — Act vs Budget</div></div>
          <div className="panel-pad">
            <div className="topvar">
              {topVars.map((r) => {
                const pos = r.vBud >= 0
                const w = (Math.abs(r.vBud) / maxTop) * 100
                return (
                  <div className="topvar-row" key={r.code}>
                    <div className="topvar-name">{shortName(r.desc)}</div>
                    <div className="topvar-track">
                      <div className="topvar-fill" style={{ width: `${w}%`, background: pos ? 'var(--pos)' : 'var(--neg)' }} />
                    </div>
                    <div className="topvar-amt" style={{ color: pos ? 'var(--pos)' : 'var(--neg)' }}>
                      {pos ? '+' : '-'}{fmtM(Math.abs(r.vBud))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
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
