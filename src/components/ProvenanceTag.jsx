// Provenance chips — the deck's "separate math from AI" made visible.
const MAP = {
  calc: { icon: '🔢', label: 'Calculated', cls: 'prov-calc',
    title: 'Deterministic, rule-based calculation — traceable to the approved PMR' },
  ai: { icon: '🤖', label: 'AI-explained', cls: 'prov-ai',
    title: 'AI retrieves & interprets approved facts — it does not compute the figures' },
  src: { icon: '🔗', label: 'Source-linked', cls: 'prov-src',
    title: 'Drills back to PMR file / version / tab / line / cell' },
}

export function ProvenanceTag({ kind, small, label }) {
  const m = MAP[kind]
  if (!m) return null
  return (
    <span className={`prov ${m.cls} ${small ? 'prov-sm' : ''}`} title={m.title}>
      {m.icon} {label || m.label}
    </span>
  )
}

export function ProvenanceLegend() {
  return (
    <div className="prov-legend">
      <span className="prov-legend-lbl">How to read this screen:</span>
      <ProvenanceTag kind="calc" small />
      <span className="prov-legend-txt">figures are deterministic &amp; reconciled.</span>
      <ProvenanceTag kind="ai" small />
      <span className="prov-legend-txt">narratives interpret approved facts.</span>
      <ProvenanceTag kind="src" small />
      <span className="prov-legend-txt">every number drills to source.</span>
    </div>
  )
}
