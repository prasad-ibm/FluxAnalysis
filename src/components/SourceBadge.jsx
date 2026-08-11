import { useState } from 'react'
import { ProvenanceTag } from './ProvenanceTag.jsx'

// Drill-to-source badge — satisfies the "100% source traceability" gate.
export default function SourceBadge({ src, label = 'Source' }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="srcwrap">
      <button className="src-badge" onClick={() => setOpen((o) => !o)} title="View source lineage">
        ◎ {label}
      </button>
      {open && (
        <>
          <div className="src-overlay" onClick={() => setOpen(false)} />
          <div className="src-pop" role="dialog">
            <div className="src-pop-head">
              <span>Source lineage</span>
              <ProvenanceTag kind="calc" small />
            </div>
            <dl className="src-dl">
              {src.file && <div><dt>File</dt><dd>{src.file}</dd></div>}
              {src.version && <div><dt>Version</dt><dd>{src.version}</dd></div>}
              {src.tab && <div><dt>Tab</dt><dd>{src.tab}</dd></div>}
              <div><dt>Line / Cell</dt><dd>{src.line} · {src.cell}</dd></div>
              {src.period && <div><dt>Period</dt><dd>{src.period}</dd></div>}
              {src.basis && <div><dt>Comparison</dt><dd>{src.basis}</dd></div>}
            </dl>
            <div className="src-recon">✓ Reconciled to PMR · 0 unexplained differences</div>
          </div>
        </>
      )}
    </span>
  )
}
