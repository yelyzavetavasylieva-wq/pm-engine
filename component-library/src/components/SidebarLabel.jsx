/**
 * SidebarLabel — a section heading in the sidebar (e.g. "Favorites", "Boards").
 * A collapse chevron is always visible (click the head to toggle). When the
 * active page belongs to this section, pass `active` to highlight it. More/add
 * actions appear on hover (per the Figma sidebar-label component).
 *
 *  active     highlight the section (it contains the current page)
 *  collapsed  rotates the chevron (section is collapsed)
 *  onToggle   called when the head is clicked
 */
export function SidebarLabel({ children, active = false, collapsed = false, onToggle }) {
  return (
    <div className={'sb-label' + (active && collapsed ? ' active' : '')}>
      <div className="sb-label-inner">
        <span className="sb-label-head" onClick={onToggle}>
          <span className="sb-label-text">{children}</span>
          <i className={'ri-arrow-down-s-line sb-label-chev' + (collapsed ? ' collapsed' : '')} />
        </span>
        <span className="sb-label-actions" onClick={(e) => e.stopPropagation()}>
          <button className="sb-label-act" title="More"><i className="ri-more-line" /></button>
          <button className="sb-label-act" title="Add"><i className="ri-add-line" /></button>
        </span>
      </div>
    </div>
  )
}

export default SidebarLabel
