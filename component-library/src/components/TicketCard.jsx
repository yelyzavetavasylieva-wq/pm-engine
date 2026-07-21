import { Avatar } from './Avatar'
import { Tag } from './Tag'
import { PropertyBadge } from './PropertyBadge'

/**
 * TicketCard — the board ticket.
 *
 * props:
 *   code, title
 *   cover?            cover image URL
 *   state?            'completed' (green check) | 'blocked' (red icon) — shown before the title
 *   properties[]      { icon, label, variant? }
 *   assignees[]       { src? , initials?, color? }
 *   tags[]            { label, color }
 *   comments, done, total, attach   footer counts
 */
export function TicketCard({
  code,
  title,
  cover,
  state,
  properties = [],
  assignees = [],
  tags = [],
  comments = 0,
  done = 0,
  total = 0,
  attach = 0,
  onClick,
}) {
  return (
    <div className="ticket" onClick={onClick}>
      <div className="tk-actions" onClick={(e) => e.stopPropagation()}>
        <button className="tk-act" title="Assign"><i className="ri-user-3-line" /></button>
        <button className="tk-act" title="Due date"><i className="ri-calendar-line" /></button>
        <button className="tk-act" title="Estimate"><i className="ri-bar-chart-line" /></button>
        <button className="tk-act" title="More"><i className="ri-more-line" /></button>
      </div>
      {cover && <div className="tk-cover" style={{ backgroundImage: `url(${cover})` }} />}
      <div className="tk-body">
        <div className="tk-text">
          <div className="tk-code">{code}</div>
          <div className="tk-title">
            {state === 'completed' && <i className="ri-checkbox-circle-fill tk-status completed" />}
            {state === 'blocked' && <i className="ri-indeterminate-circle-line tk-status blocked" />}
            {title}
          </div>
        </div>

        {properties.length > 0 && (
          <div className="tk-props">
            {properties.map((p, i) => (
              <PropertyBadge key={i} icon={p.icon} label={p.label} variant={p.variant} />
            ))}
          </div>
        )}

        {assignees.length > 0 && (
          <div className="tk-assignees">
            {assignees.map((a, i) => (
              <Avatar key={i} src={a.src} initials={a.initials} color={a.color} size={20} />
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="tk-tags">
            {tags.map((t, i) => (
              <Tag key={i} label={t.label} color={t.color} />
            ))}
          </div>
        )}

        <div className="tk-details">
          <div className="d"><i className="ri-align-left" /></div>
          <div className="d"><i className="ri-discuss-line" />{comments}</div>
          <div className="d"><i className="ri-checkbox-circle-line" />{done}/{total}</div>
          <div className="d"><i className="ri-attachment-2" />{attach}</div>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
