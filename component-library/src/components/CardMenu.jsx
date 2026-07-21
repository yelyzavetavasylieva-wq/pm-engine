import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const ITEMS = [
  { icon: 'ri-forbid-2-line',        label: 'Mark as blocked' },
  { icon: 'ri-checkbox-circle-line', label: 'Mark as ready' },
  'divider',
  { icon: 'ri-links-line',           label: 'Copy card link' },
  { icon: 'ri-file-copy-line',       label: 'Duplicate' },
  'divider',
  { icon: 'ri-arrow-right-line',     label: 'Move to', submenu: true },
  { icon: 'ri-send-plane-line',      label: 'Deliver' },
  'divider',
  { icon: 'ri-delete-bin-line',      label: 'Delete', destructive: true },
]

export function CardMenu({ pos, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return createPortal(
    <div ref={ref} className="card-menu" style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 1000 }}>
      {ITEMS.map((item, i) =>
        item === 'divider'
          ? <div key={i} className="menu-divider" />
          : (
            <div key={i} className="menu-item" onClick={onClose}>
              <div className="menu-item-inner">
                <i className={item.icon + (item.destructive ? ' destructive-icon' : '')} />
                <span className={'menu-item-label' + (item.destructive ? ' destructive' : '')}>{item.label}</span>
                {item.submenu && <i className="ri-arrow-right-s-line menu-item-chevron" />}
              </div>
            </div>
          )
      )}
    </div>,
    document.body
  )
}

export default CardMenu
