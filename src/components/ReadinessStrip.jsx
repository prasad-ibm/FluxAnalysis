import { ACCEPTANCE_GATES } from '../data.js'

const STATUS_LABEL = { shown: 'Shown in demo', partial: 'Partial', target: 'Production target' }

// The four acceptance gates — frames the demo as a step on the path to an
// accepted, governed solution.
export default function ReadinessStrip() {
  return (
    <div className="panel readiness mt">
      <div className="readiness-head">
        <div>
          <span className="rdy-title">Path to acceptance</span>
          <span className="rdy-sub">four gates define project completion — this demo evidences the first two</span>
        </div>
        <span className="rdy-legend">
          <i className="rdy-dot shown" /> shown
          <i className="rdy-dot partial" /> partial
          <i className="rdy-dot target" /> target
        </span>
      </div>
      <div className="readiness-grid">
        {ACCEPTANCE_GATES.map((g) => (
          <div className={`gate gate-${g.status}`} key={g.key}>
            <div className="gate-top">
              <span className="gate-icon">{g.icon}</span>
              <span className={`gate-status ${g.status}`}>{STATUS_LABEL[g.status]}</span>
            </div>
            <div className="gate-name">{g.name}</div>
            <div className="gate-demo">{g.demo}</div>
            <div className="gate-detail">{g.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
