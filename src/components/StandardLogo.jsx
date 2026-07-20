// Standard Industries corporate lockup — brand-aligned representation.
// Colors match the official palette: wordmark gray #91999f, accent red #ed2a37.
// (A styled wordmark, not the trademarked vector artwork.)

const SI_RED = '#ed2a37'
const SI_GRAY = '#91999f'

export function SIDiamond({ size = 30 }) {
  // The red angular kite/diamond accent from the Standard Industries mark.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ display: 'block' }}>
      <rect x="16" y="2" width="19.8" height="19.8" transform="rotate(45 16 2)" rx="2" fill={SI_RED} />
      <rect x="16" y="9" width="9.9" height="9.9" transform="rotate(45 16 9)" rx="1.4" fill="#fff" opacity="0.16" />
    </svg>
  )
}

export default function StandardLogo() {
  return (
    <div className="si-logo" title="Standard Industries">
      <SIDiamond size={30} />
      <div className="si-word">
        <span className="si-l1">STANDARD</span>
        <span className="si-l2">INDUSTRIES</span>
      </div>
    </div>
  )
}

export { SI_RED, SI_GRAY }
