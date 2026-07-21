/**
 * Avatar — round image or initials chip.
 * color: brand | success | warning | error | purple | secondary (used for initials background)
 */
export function Avatar({ src, initials, color = 'brand', size = 24, style }) {
  const base = {
    width: size,
    height: size,
    fontSize: size >= 28 ? 14 : 10,
    lineHeight: size + 'px',
    ...style,
  }
  if (src) {
    return <div className="av" style={{ ...base, backgroundImage: `url(${src})` }} />
  }
  return (
    <div
      className="av"
      style={{ ...base, background: `var(--${color}-bg)`, color: `var(--${color}-text)` }}
    >
      {initials}
    </div>
  )
}

export default Avatar
