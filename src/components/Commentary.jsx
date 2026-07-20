import { useState } from 'react'
import { COMMENTARY, fmtVar, varClass, scale } from '../data.js'

export default function Commentary({ region }) {
  const f = region.factor
  const [entries, setEntries] = useState(() =>
    COMMENTARY.map((c) => ({
      code: c.code,
      budText: c.budText,
      pyText: c.pyText,
      status: 'unassigned', // unassigned | assigned | submitted | approved
      budSaved: false,
      pySaved: false,
    }))
  )
  const [expanded, setExpanded] = useState(COMMENTARY[0]?.code ?? null)

  const total = entries.length
  const assigned = entries.filter((e) => e.status !== 'unassigned').length
  const submitted = entries.filter((e) => e.status === 'submitted').length
  const approved = entries.filter((e) => e.status === 'approved').length
  const pending = entries.filter((e) => e.status === 'assigned').length
  const done = submitted + approved
  const pct = Math.round((done / total) * 100)

  function update(code, patch) {
    setEntries((prev) => prev.map((e) => (e.code === code ? { ...e, ...patch } : e)))
  }
  function bulkAssign() {
    setEntries((prev) => prev.map((e) => (e.status === 'unassigned' ? { ...e, status: 'assigned' } : e)))
  }
  function toggleAssign(code) {
    update(code, (() => {
      const e = entries.find((x) => x.code === code)
      return { status: e.status === 'unassigned' ? 'assigned' : 'unassigned' }
    })())
  }
  function save(code, field) {
    const e = entries.find((x) => x.code === code)
    const patch = field === 'bud' ? { budSaved: true } : { pySaved: true }
    const next = { ...e, ...patch }
    if (next.status === 'unassigned' || next.status === 'assigned') patch.status = 'submitted'
    update(code, patch)
  }
  function approve(code) {
    update(code, { status: 'approved' })
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2 className="page-title">Commentary — Budget vs Actuals &amp; PY vs Actuals</h2>
        <div className="page-sub"><span className="region-tag">{region.name}</span> Region · FY2025 P12</div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">Commentary Workflow</div>
          <button className="btn-bulk" onClick={bulkAssign}>+ Bulk Assign</button>
        </div>
        <div className="panel-pad">
          <div className="workflow">
            <div className="wf-progress">{done}<small>/{total}</small></div>
            <div className="wf-stat"><div className="n">{assigned}</div><div className="l">Assigned</div></div>
            <div className="wf-stat"><div className="n">{pending}</div><div className="l">Pending</div></div>
            <div className="wf-stat"><div className="n">{submitted}</div><div className="l">Submitted</div></div>
            <div className="wf-stat"><div className="n">{approved}</div><div className="l">Approved</div></div>
            <div />
            <div className="wf-bar"><div className="wf-bar-fill" style={{ width: `${pct}%` }} /></div>
            <div className="wf-pct">{pct}% complete</div>
          </div>
        </div>
      </div>

      {COMMENTARY.map((c) => {
        const e = entries.find((x) => x.code === c.code)
        const open = expanded === c.code
        const bud = scale(c.bud, f), py = scale(c.py, f)
        return (
          <div className="panel cmt-card" key={c.code}>
            <div className="cmt-head">
              <span className="cmt-code">{c.code}</span>
              <span className="cmt-desc">{c.desc}</span>
              <span className="cmt-owner">👤 {c.owner}</span>
              <span className={`cmt-var ${varClass(bud)}`}>BUD: {fmtVar(bud)}</span>
              <span className={`cmt-var ${varClass(py)}`}>PY: {fmtVar(py)}</span>
              <span className="cmt-spacer" />
              {e.status === 'submitted' && (
                <button className="btn-assign" onClick={() => approve(c.code)}>Approve</button>
              )}
              <span className={`status-chip ${e.status}`}>{statusLabel(e.status)}</span>
              <button className="btn-assign" onClick={() => toggleAssign(c.code)}>
                {e.status === 'unassigned' ? 'Assign' : 'Unassign'}
              </button>
              <button className="btn-assign" onClick={() => setExpanded(open ? null : c.code)}>
                {open ? '▾' : '›'}
              </button>
            </div>
            {open && (
              <div className="cmt-body">
                <div className="cmt-col">
                  <div className="cmt-col-head">
                    <span className="cmt-tag bud">BUD</span>
                    <span className="cmt-col-lbl">Explanation vs Budget</span>
                  </div>
                  <textarea
                    className="cmt-textarea"
                    value={e.budText}
                    placeholder="No commentary."
                    onChange={(ev) => update(c.code, { budText: ev.target.value, budSaved: false })}
                  />
                  <div className="cmt-save-row">
                    <button className="btn-save" onClick={() => save(c.code, 'bud')}>Save</button>
                    {e.budSaved && <span className="saved-flag">✓ Saved</span>}
                  </div>
                </div>
                <div className="cmt-col">
                  <div className="cmt-col-head">
                    <span className="cmt-tag py">PY</span>
                    <span className="cmt-col-lbl">Explanation vs Prior Year</span>
                  </div>
                  <textarea
                    className="cmt-textarea"
                    value={e.pyText}
                    placeholder="No commentary."
                    onChange={(ev) => update(c.code, { pyText: ev.target.value, pySaved: false })}
                  />
                  <div className="cmt-save-row">
                    <button className="btn-save" onClick={() => save(c.code, 'py')}>Save</button>
                    {e.pySaved && <span className="saved-flag">✓ Saved</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function statusLabel(s) {
  return { unassigned: 'Unassigned', assigned: 'Assigned', submitted: 'Submitted', approved: 'Approved' }[s]
}
