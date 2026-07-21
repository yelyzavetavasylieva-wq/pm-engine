import { useState } from 'react'
import { SidebarCell } from './SidebarCell'
import { SidebarLabel } from './SidebarLabel'
import { Toggle } from './Toggle'

export default {
  title: 'Blank/SidebarCell',
  component: SidebarCell,
  tags: ['autodocs'],
  argTypes: { active: { control: 'boolean' } },
}

export const Default = {
  args: { icon: 'ri-layout-column-line', label: 'Design', active: false },
}

export const Active = {
  args: { icon: 'ri-layout-column-line', label: 'Design', active: true },
}

export const Project = {
  args: { icon: 'ri-stack-line', prefix: 'Dev-eCom', label: 'eCommerce platform' },
}

const BOARDS_INIT = [
  { id: 'design',    icon: 'ri-layout-column-line', label: 'Design',       active: true,  favorite: 'off' },
  { id: 'dev',       icon: 'ri-layout-column-line', label: 'Development',  active: false, favorite: 'off' },
  { id: 'hrhiring',  icon: 'ri-layout-column-line', label: 'HR-Hiring',    active: false, favorite: 'off' },
]

export const Sections = {
  name: 'Sidebar sections',
  render: () => {
    const [dark, setDark] = useState(false)
    const [closed, setClosed] = useState({})
    const toggle = (id) => setClosed((s) => ({ ...s, [id]: !s[id] }))

    const [boards, setBoards] = useState(BOARDS_INIT)
    const sbDragRef = { current: null }
    const [sbDragOver, setSbDragOver] = useState(null)
    const [sbDragging, setSbDragging] = useState(null)

    const sbStart = (id) => { sbDragRef.current = id; setSbDragging(id) }
    const sbEnd   = () => { sbDragRef.current = null; setSbDragging(null); setSbDragOver(null) }
    const sbDrop  = (toId) => {
      const fromId = sbDragRef.current
      if (!fromId || fromId === toId) { sbEnd(); return }
      setBoards((prev) => {
        const fi = prev.findIndex((b) => b.id === fromId)
        const ti = prev.findIndex((b) => b.id === toId)
        if (fi < 0 || ti < 0) return prev
        const n = [...prev]; const [item] = n.splice(fi, 1); n.splice(ti, 0, item); return n
      })
      sbEnd()
    }

    return (
      <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-secondary)', borderRadius: 12 }}>
        <div className="sb-section">
          <div className="sb-group">
            <SidebarCell icon="ri-briefcase-line" label="My work" />
          </div>
          <div className="sb-group">
            <SidebarLabel collapsed={closed.fav} onToggle={() => toggle('fav')}>Favorites</SidebarLabel>
            {!closed.fav && <>
              <SidebarCell icon="ri-layout-column-line" label="Design" draggable favorite="on" />
              <SidebarCell icon="ri-stack-line" prefix="Dev-eCom" label="eCommerce platform" draggable favorite="on" />
            </>}
          </div>
          <div className="sb-group">
            <SidebarLabel active collapsed={closed.boards} onToggle={() => toggle('boards')}>Boards</SidebarLabel>
            {!closed.boards && boards.map((b) => (
              <SidebarCell
                key={b.id}
                icon={b.icon}
                label={b.label}
                active={b.active}
                draggable
                favorite={b.favorite}
                isDragging={sbDragging === b.id}
                isDragOver={sbDragOver === b.id}
                onDragStart={(e) => { e.stopPropagation(); sbStart(b.id) }}
                onDragEnd={sbEnd}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setSbDragOver(b.id)}
                onDrop={(e) => { e.preventDefault(); sbDrop(b.id) }}
              />
            ))}
          </div>
          <div className="sb-group">
            <SidebarCell
              icon="ri-moon-line"
              label="Dark mode"
              interactive={false}
              trailing={<Toggle on={dark} onChange={setDark} />}
            />
          </div>
        </div>
      </div>
    )
  },
}
