/**
 * Button — text button with optional lead/trail icon and a count badge.
 * Matches the Figma Button component (gap 2px + 4px label padding = 6px icon→label).
 *
 * hierarchy: 'primary' | 'secondary' | 'tertiary'
 * size:      'md' | 'sm'
 */
export function Button({
  children,
  hierarchy = 'secondary',
  size = 'md',
  leadIcon,
  trailIcon,
  badge,
  disabled = false,
  onClick,
}) {
  const cls = ['btn', `btn--${hierarchy}`, size === 'sm' ? 'btn--sm' : '']
    .filter(Boolean)
    .join(' ')
  return (
    <button className={cls} disabled={disabled} onClick={onClick}>
      {leadIcon && <i className={leadIcon} />}
      <span className="btn-label">{children}</span>
      {badge != null && <span className="btn-badge">{badge}</span>}
      {trailIcon && <i className={trailIcon} />}
    </button>
  )
}

export default Button
