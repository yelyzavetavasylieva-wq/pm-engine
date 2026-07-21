/**
 * Tag — colored label used on cards. A colored dot (matching the text color)
 * leads the label, per the Figma ticket component.
 * color: brand | success | warning | error | purple | secondary
 */
export function Tag({ label, color = 'brand' }) {
  return (
    <span className="tag" style={{ background: `var(--${color}-bg)`, color: `var(--${color}-text)` }}>
      <span className="tag-dot" />
      {label}
    </span>
  )
}

export default Tag
