/**
 * IconButton — square 32px button wrapping a Remix icon.
 * bordered: adds a border + subtle shadow (used in toolbars).
 */
export function IconButton({ icon, bordered = false, onClick, title }) {
  return (
    <button className={'icon-btn' + (bordered ? ' bordered' : '')} onClick={onClick} title={title}>
      <i className={icon} />
    </button>
  )
}

export default IconButton
