/**
 * SidebarCell — a navigation row in the sidebar.
 * Supports an optional project "prefix" (e.g. "Dev-eCom eCommerce platform").
 *
 *  draggable    show a drag handle on hover (reorderable rows)
 *  favorite     'on'  → filled star (remove from favorites)
 *               'off' → outline star (add to favorites)
 *               undefined → no star
 *  trailing     node rendered at the end of the row (e.g. a Toggle)
 *  interactive  when false, the row has no hover background and isn't clickable
 *               (e.g. the "Dark mode" row, where only the toggle reacts)
 */
export function SidebarCell({
  icon = 'ri-layout-column-line',
  label,
  prefix,
  active = false,
  draggable = false,
  favorite,
  trailing,
  interactive = true,
  onClick,
  isDragging = false,
  isDragOver = false,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDrop,
}) {
  const hasActions = draggable || favorite !== undefined
  const dragHandlers = draggable
    ? { onDragStart, onDragEnd, onDragEnter, onDragOver, onDrop }
    : {}
  return (
    <div className="sb-cell">
      <div
        className={
          'sb-row' +
          (active ? ' active' : '') +
          (interactive ? '' : ' sb-static') +
          (isDragging ? ' sb-dragging' : '') +
          (isDragOver ? ' sb-drag-over' : '')
        }
        draggable={draggable || undefined}
        onClick={interactive ? onClick : undefined}
        {...dragHandlers}
      >
        {icon && <i className={icon} />}
        <span className="txt">
          {prefix && <span className="prefix">{prefix}</span>}
          {label}
        </span>
        {hasActions && (
          <span className="sb-actions" onClick={(e) => e.stopPropagation()}>
            {draggable && <i className="ri-draggable sb-act grip" title="Drag to reorder" />}
            {favorite === 'on' && <i className="ri-star-fill sb-act starred" title="Remove from favorites" />}
            {favorite === 'off' && <i className="ri-star-line sb-act" title="Add to favorites" />}
          </span>
        )}
        {trailing}
      </div>
    </div>
  )
}

export default SidebarCell
