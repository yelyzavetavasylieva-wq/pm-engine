/**
 * PropertyBadge — bordered icon + label badge (date, points, time…).
 * variant: default | warn (warn used for time/effort)
 */
export function PropertyBadge({ icon, label, variant = 'default' }) {
  return (
    <span className={'prop' + (variant === 'warn' ? ' warn' : '')}>
      {icon && <i className={icon} />}
      {label}
    </span>
  )
}

export default PropertyBadge
