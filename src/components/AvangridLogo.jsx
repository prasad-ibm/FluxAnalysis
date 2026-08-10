// Avangrid corporate lockup — brand-aligned representation.
// Colors match Avangrid's palette: deep green #00402A wordmark, bright-green
// leaf accent #00A443. This is a styled wordmark, NOT the trademarked vector
// artwork — drop the official SVG into src/assets to use the literal logo.

const AVA_GREEN = '#00402A'
const AVA_LEAF = '#00A443'

export function AvangridLeaf({ size = 30 }) {
  // Stylized clean-energy leaf mark echoing the Avangrid symbol.
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={{ display: 'block' }}>
      <path
        d="M20 2 C 31 12, 34 27, 20 38 C 6 27, 9 12, 20 2 Z"
        fill={AVA_LEAF}
      />
      <path d="M20 7 L20 34" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <path d="M20 20 L27 15" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
      <path d="M20 25 L13 21" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export default function AvangridLogo() {
  return (
    <div className="ava-logo" title="Avangrid">
      <AvangridLeaf size={30} />
      <span className="ava-word">avangrid</span>
    </div>
  )
}

export { AVA_GREEN, AVA_LEAF }
