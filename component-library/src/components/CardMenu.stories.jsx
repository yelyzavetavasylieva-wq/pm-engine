import { useState } from 'react'
import { CardMenu } from './CardMenu'
import '../styles/components.css'
import '../styles/tokens.css'

export default {
  title: 'Components/CardMenu',
  component: CardMenu,
}

export const Default = () => (
  <div style={{ padding: 40, height: 460, position: 'relative' }}>
    <div className="card-menu" style={{ position: 'static' }}>
      {[
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
      ].map((item, i) =>
        item === 'divider'
          ? <div key={i} className="menu-divider" />
          : (
            <div key={i} className="menu-item">
              <div className="menu-item-inner">
                <i className={item.icon + (item.destructive ? ' destructive-icon' : '')} />
                <span className={'menu-item-label' + (item.destructive ? ' destructive' : '')}>{item.label}</span>
                {item.submenu && <i className="ri-arrow-right-s-line menu-item-chevron" />}
              </div>
            </div>
          )
      )}
    </div>
  </div>
)

export const Portal = () => {
  const [open, setOpen] = useState(false)
  const btnRef = useState(null)

  return (
    <div style={{ padding: 40 }}>
      <button
        ref={el => { if (el && !open) btnRef[1](el) }}
        onClick={e => {
          const r = e.currentTarget.getBoundingClientRect()
          setOpen({ top: r.bottom + 4 + window.scrollY, left: r.right - 240 + window.scrollX })
        }}
        style={{ padding: '6px 12px', cursor: 'pointer' }}
      >
        ··· Open menu
      </button>
      {open && <CardMenu pos={open} onClose={() => setOpen(false)} />}
    </div>
  )
}
