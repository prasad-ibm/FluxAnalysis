import { useState } from 'react'
import { ASSISTANT_SCENARIOS, PMR_META } from '../data.js'
import { ProvenanceTag } from './ProvenanceTag.jsx'

// Finance-grade assistant: answers only from approved facts, clarifies
// ambiguity, and abstains on unsupported prompts — never invents.
export default function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [thread, setThread] = useState([])
  const [input, setInput] = useState('')

  function respond(scn) {
    setThread((t) => [
      ...t,
      { role: 'user', text: scn.q },
      { role: 'bot', kind: scn.kind, text: scn.a, source: scn.source },
    ])
  }

  function submit(e) {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    const match = ASSISTANT_SCENARIOS.find((s) =>
      s.q.toLowerCase().split(' ').some((w) => w.length > 4 && q.toLowerCase().includes(w))
    )
    const bot = match
      ? { role: 'bot', kind: match.kind, text: match.a, source: match.source }
      : {
          role: 'bot', kind: 'abstain',
          text: 'Insufficient data. I answer only from the approved PMR loaded for this period, with source-linked figures — I do not generate unsupported answers. Try an example question, or specify entity, comparison basis and period.',
        }
    setThread((t) => [...t, { role: 'user', text: q }, bot])
    setInput('')
  }

  return (
    <>
      <button className={`assist-fab ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}
        title="PMR AI Assistant" aria-label="PMR AI Assistant">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="assist-panel" role="dialog" aria-label="PMR AI Assistant">
          <div className="assist-head">
            <div>
              <div className="assist-title">PMR AI Assistant</div>
              <div className="assist-sub">Source-linked · clarifies · abstains — never invents</div>
            </div>
            <button className="assist-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>

          <div className="assist-body">
            {thread.length === 0 && (
              <div className="assist-empty">
                <p className="assist-empty-h">Ask about the approved {PMR_META.file}.</p>
                <p className="assist-empty-p">
                  Answers cite source. Ambiguous questions get a clarification; unsupported ones are
                  declined. Try one:
                </p>
                <div className="assist-examples">
                  {ASSISTANT_SCENARIOS.map((s) => (
                    <button key={s.q} className={`assist-chip chip-${s.kind}`} onClick={() => respond(s)}>
                      {s.q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {thread.map((m, i) =>
              m.role === 'user' ? (
                <div className="assist-msg user" key={i}>{m.text}</div>
              ) : (
                <div className={`assist-msg bot kind-${m.kind}`} key={i}>
                  <div className="assist-kind">
                    {m.kind === 'answer' && <><ProvenanceTag kind="calc" small /> <ProvenanceTag kind="ai" small /></>}
                    {m.kind === 'clarify' && <span className="assist-flag clarify">❓ Clarification needed</span>}
                    {m.kind === 'abstain' && <span className="assist-flag abstain">⛔ Insufficient data — abstained</span>}
                  </div>
                  <div className="assist-text">{m.text}</div>
                  {m.source && (
                    <div className="assist-src">
                      🔗 {m.source.tab} · {m.source.line} · {m.source.cell} · {m.source.basis} · {m.source.version}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <form className="assist-input" onSubmit={submit}>
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a finance question…" />
            <button type="submit">Ask</button>
          </form>
        </div>
      )}
    </>
  )
}
