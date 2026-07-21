import { useState, useEffect, useRef } from 'react'
import '../styles/components.css'
import '../styles/tokens.css'

const INFO_ACTIVITY = [
  { date: 'Today', items: [
    { initials: 'JE', name: 'Jennifer Pruitt', time: '2 hours ago', avatarBg: 'var(--bg-brand-primary)', avatarColor: 'var(--text-brand)',
      body: "attached dashboard.jpg to 'Luxury Tier' customer dashboard design and development. This differentiator provides high-value members with a gold-themed account experience." },
    { initials: 'JE', name: 'Jennifer Pruitt', time: '3 hours ago', avatarBg: 'var(--bg-brand-primary)', avatarColor: 'var(--text-brand)',
      body: "removed attachment dashboard-light.jpg from 'Luxury Tier' customer dashboard design and development." },
    { initials: 'ML', name: 'Marcus Lee', time: '5 hours ago', avatarBg: 'var(--bg-success-primary)', avatarColor: 'var(--text-success)',
      body: "moved 'Alpha feedback and bug reporting component development' to Done" },
  ]},
  { date: 'Yesterday', items: [
    { initials: 'AA', name: 'Alice Anderson', time: 'Yesterday, 3:14 PM', avatarBg: 'var(--bg-warning-primary)', avatarColor: 'var(--text-warning)',
      body: "created 'CV parsing pipeline using NLP to extract skills' in To do" },
    { initials: 'KP', name: 'Kyle Peterson', time: 'Yesterday, 1:22 PM', avatarBg: 'var(--bg-secondary)', avatarColor: 'var(--text-secondary)',
      body: "assigned Kyle Peterson to 'Interview scheduling integration with Google Calendar'" },
  ]},
]

const TAG_COLORS = [
  { key: 'gray', swatch: 'var(--fg-tertiary)', bg: 'var(--bg-secondary)', color: 'var(--text-secondary)' },
  { key: 'blue', swatch: 'var(--text-brand)', bg: 'var(--bg-brand-primary)', color: 'var(--text-brand)' },
  { key: 'red', swatch: 'var(--text-error)', bg: 'var(--bg-error-primary)', color: 'var(--text-error)' },
  { key: 'orange', swatch: 'var(--text-warning)', bg: 'var(--bg-warning-primary)', color: 'var(--text-warning)' },
  { key: 'green', swatch: 'var(--text-success)', bg: 'var(--bg-success-primary)', color: 'var(--text-success)' },
  { key: 'purple', swatch: 'var(--fg-purple)', bg: 'var(--bg-purple-primary)', color: 'var(--text-purple)' },
]
const INFO_TAG_GROUPS = [
  { id: 'milestone', label: 'Milestone', tags: [
    { name: '01 Internal Alpha', bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', count: 3 },
    { name: '02 Beta Launch', bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', count: 1 },
  ]},
  { id: 'severity', label: 'Severity', tags: [
    { name: 'Critical', bg: 'var(--bg-error-primary)', color: 'var(--text-error)', count: 0 },
    { name: 'High', bg: 'var(--bg-purple-primary)', color: 'var(--text-purple)', count: 0 },
    { name: 'Medium', bg: 'var(--bg-warning-primary)', color: 'var(--text-warning)', count: 2 },
    { name: 'Low', bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', count: 1 },
  ]},
  { id: 'type', label: 'Type', tags: [
    { name: 'Bugfix', bg: 'var(--bg-error-primary)', color: 'var(--text-error)', count: 1 },
    { name: 'Improvement', bg: 'var(--bg-success-primary)', color: 'var(--text-success)', count: 2 },
    { name: 'New feature', bg: 'var(--bg-brand-primary)', color: 'var(--text-brand)', count: 3 },
    { name: 'UX/UI design', bg: 'var(--bg-brand-primary)', color: 'var(--text-brand)', count: 1 },
  ]},
  { id: 'theme', label: 'Theme', tags: [
    { name: 'Catalog and product data', bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', count: 1 },
    { name: 'Platform and engineering', bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', count: 2 },
  ]},
]

function InfoPanelDemo({ open, onClose, activityDisabled }) {
  const [tab, setTab] = useState(activityDisabled ? 'Tags' : 'Activity')
  const [tagSearch, setTagSearch] = useState('')
  const [collapsed, setCollapsed] = useState({})
  const [selectedTags, setSelectedTags] = useState([])
  const [tagMenu, setTagMenu] = useState(null)
  const [tagGroups, setTagGroups] = useState(INFO_TAG_GROUPS)
  const [tagEdit, setTagEdit] = useState(null)
  const [sMenu, setSMenu] = useState(null)
  const [showArchived, setShowArchived] = useState(false)
  const grpSeq = useRef(0)
  const toggleSection = id => setCollapsed(c => ({ ...c, [id]: !c[id] }))
  const toggleTag = key => setSelectedTags(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  const openTagMenu = (gid, name, e) => {
    e.stopPropagation()
    const key = gid + ':' + name
    const r = e.currentTarget.getBoundingClientRect()
    setTagMenu(prev => prev && prev.key === key ? null : { key, gid, name, x: r.right, y: r.bottom + 4 })
  }
  const [colorPicker, setColorPicker] = useState(null)
  const [hsl, setHsl] = useState({ h: 297, s: 95, l: 46 })
  const startRename = () => { if (tagMenu) { setTagEdit({ gid: tagMenu.gid, name: tagMenu.name, value: tagMenu.name, isNew: false }); setTagMenu(null) } }
  const startSetColor = () => { if (tagMenu) { setColorPicker({ gid: tagMenu.gid, name: tagMenu.name, x: tagMenu.x, y: tagMenu.y, mode: 'swatches' }); setTagMenu(null) } }
  const applyTagColor = (patch) => setTagGroups(gs => gs.map(g => g.id === colorPicker.gid ? { ...g, tags: g.tags.map(t => t.name === colorPicker.name ? { ...t, ...patch } : t) } : g))
  const pickSwatch = (c) => { applyTagColor({ bg: c.bg, color: c.color }); setColorPicker(null) }
  const clearColor = () => { applyTagColor({ bg: 'var(--bg-secondary)', color: 'var(--text-secondary)' }); setColorPicker(null) }
  const applyPalette = () => { applyTagColor({ bg: `hsl(${hsl.h},${Math.min(hsl.s, 100)}%,95%)`, color: `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)` }); setColorPicker(null) }
  const cpTag = colorPicker ? (tagGroups.find(g => g.id === colorPicker.gid) || { tags: [] }).tags.find(t => t.name === colorPicker.name) : null
  const startAddTag = () => { setTagEdit({ gid: tagGroups[0].id, name: null, value: '', isNew: true }) }
  const saveTagEdit = () => {
    const v = (tagEdit.value || '').trim()
    if (v) {
      setTagGroups(gs => gs.map(g => {
        if (g.id !== tagEdit.gid) return g
        if (tagEdit.isNew) return { ...g, tags: [{ name: v, bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', count: 0 }, ...g.tags] }
        return { ...g, tags: g.tags.map(t => t.name === tagEdit.name ? { ...t, name: v } : t) }
      }))
    }
    setTagEdit(null)
  }
  const convertToWs = () => {
    if (!tagMenu) return
    setTagGroups(gs => gs.map(g => g.id === tagMenu.gid ? { ...g, tags: g.tags.map(t => t.name === tagMenu.name ? { ...t, ws: true } : t) } : g))
    setTagMenu(null)
  }
  const openSMenu = (type, e) => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); setSMenu(prev => prev && prev.type === type ? null : { type, x: r.right, y: r.bottom + 4 }) }
  const newGroup = () => { const id = 'grp' + (grpSeq.current++); setTagGroups(gs => [{ id, label: 'New group', tags: [] }, ...gs]); setSMenu(null) }
  const collapseAll = () => { const c = {}; tagGroups.forEach(g => { c[g.id] = true; c['ws:' + g.id] = true; c['board:' + g.id] = true }); c['sec:ws'] = true; c['sec:board'] = true; setCollapsed(c); setSMenu(null) }
  const expandAll = () => { setCollapsed({}); setSMenu(null) }
  const renderTagGroup = (group, tags, ckey, allowEmpty) => {
    if (tags.length === 0 && !allowEmpty) return null
    const isOpen = !collapsed[ckey]
    return (
      <div key={ckey} className="ip-tag-group">
        <div className="ip-group-label" onClick={() => toggleSection(ckey)}>
          <div className="ip-group-label-inner">
            <div className="ip-group-label-left">
              <span className="ip-group-label-text">{group.label}</span>
              <i className={'ri-arrow-down-s-line ip-group-chevron' + (collapsed[ckey] ? ' collapsed' : '')} />
            </div>
            <div className="ip-group-actions">
              <button className="ip-group-act-btn" onClick={e => e.stopPropagation()}><i className="ri-more-line" style={{ fontSize: 16 }} /></button>
              <button className="ip-group-act-btn" onClick={e => e.stopPropagation()}><i className="ri-add-line" style={{ fontSize: 16 }} /></button>
            </div>
          </div>
        </div>
        {isOpen && <div className="ip-tag-options">{tags.map((t, ti) => {
          const tagKey = group.id + ':' + t.name
          const isSel = selectedTags.includes(tagKey)
          const isEditing = tagEdit && !tagEdit.isNew && tagEdit.gid === group.id && tagEdit.name === t.name
          return (
          <div key={ti} className="ip-tag-row" onClick={() => { if (!isEditing) toggleTag(tagKey) }}>
            {isEditing ? (
              <div className="ip-tag-rename">
                <input className="ip-rename-input" autoFocus value={tagEdit.value}
                  onChange={e => setTagEdit(te => ({ ...te, value: e.target.value }))}
                  onFocus={e => e.target.select()}
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => { if (e.key === 'Enter') saveTagEdit(); if (e.key === 'Escape') setTagEdit(null) }}
                  onBlur={() => setTagEdit(null)} />
                <button className="ip-rename-save" onMouseDown={e => e.preventDefault()} onClick={e => { e.stopPropagation(); saveTagEdit() }}>Save</button>
              </div>
            ) : (
            <div className={'ip-tag-row-inner' + (isSel ? ' selected' : '') + (tagMenu && tagMenu.key === tagKey ? ' menu-open' : '')}>
              <span className="ip-badge" style={{ background: t.bg }}>
                <span className="ip-badge-dot" style={{ color: t.color }} />
                <span className="ip-badge-label" style={{ color: t.color }}>{t.name}</span>
              </span>
              <div className="ip-tag-right">
                {isSel && <span className="ip-tag-filtered" onClick={e => { e.stopPropagation(); toggleTag(tagKey) }}><i className="ri-filter-3-line" />Filtered</span>}
                <button className="ip-tag-act-btn more" onClick={e => openTagMenu(group.id, t.name, e)}><i className="ri-more-line" /></button>
                <span className="ip-tag-count">{t.count}</span>
              </div>
            </div>
            )}
          </div>
          )
        })}</div>}
      </div>
    )
  }
  useEffect(() => {
    if (!tagMenu) return
    const close = () => setTagMenu(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [tagMenu])
  useEffect(() => {
    if (!colorPicker) return
    const close = () => setColorPicker(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [colorPicker])
  useEffect(() => {
    if (!sMenu) return
    const close = () => setSMenu(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [sMenu])

  return (
    <div className={'info-panel' + (open ? ' open' : '')}>
      <div className="ip-header">
        <div className="ip-header-row1">
          <span className="ip-title">Info panel</span>
          <button className="ip-close" onClick={onClose}>
            <i className="ri-close-line" style={{ fontSize: 16 }} />
          </button>
        </div>
        <div className="ip-header-row2">
          <div className="ip-tab-menu">
            {['Activity', 'Tags'].map(t => {
              const disabled = t === 'Activity' && activityDisabled
              return <button key={t} className={'ip-tab-btn' + (tab === t ? ' active' : '') + (disabled ? ' disabled' : '')} disabled={disabled} onClick={() => { if (!disabled) setTab(t) }}>{t}</button>
            })}
          </div>
        </div>
      </div>
      <div className="ip-content">
        {tab === 'Activity' && <div className="ip-activity">{INFO_ACTIVITY.map((group, gi) => (
          <div key={gi}>
            <div className="ip-date-label"><div className="ip-date-label-inner"><span className="ip-date-label-text">{group.date}</span></div></div>
            {group.items.map((item, ii) => (
              <div key={ii} className="ip-msg-row">
                <div className="ip-msg-av" style={{ background: item.avatarBg }}>
                  <span style={{ color: item.avatarColor }}>{item.initials}</span>
                </div>
                <div className="ip-msg-body">
                  <div className="ip-msg-head">
                    <span className="ip-msg-name">{item.name}</span>
                    <span className="ip-msg-time">{item.time}</span>
                  </div>
                  <div className="ip-msg-text">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        ))}</div>}
        {tab === 'Tags' && <>
          <div className="ip-search">
            <div className="ip-search-box">
              <i className="ri-search-line" />
              <input placeholder="Search across tags..." value={tagSearch} onChange={e => setTagSearch(e.target.value)} />
            </div>
            <button className={'ip-search-act' + (sMenu && sMenu.type === 'add' ? ' active' : '')} onClick={e => openSMenu('add', e)}><i className="ri-add-line" style={{ fontSize: 16 }} /></button>
            <button className={'ip-search-act' + (sMenu && sMenu.type === 'more' ? ' active' : '')} onClick={e => openSMenu('more', e)}><i className="ri-more-line" style={{ fontSize: 16 }} /></button>
          </div>
          {sMenu && (
            <div className="ip-ctx-menu" style={{ left: sMenu.x - 200, top: sMenu.y, width: 200 }} onClick={e => e.stopPropagation()}>
              {sMenu.type === 'add' ? (<>
                <button className="ip-ctx-item" onClick={() => { startAddTag(); setSMenu(null) }}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-price-tag-3-line" /></span><span className="ip-ctx-label">New tag</span></span></button>
                <button className="ip-ctx-item" onClick={newGroup}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-folder-add-line" /></span><span className="ip-ctx-label">New group</span></span></button>
              </>) : (<>
                <button className="ip-ctx-item" onClick={collapseAll}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-contract-up-down-line" /></span><span className="ip-ctx-label">Collapse all</span></span></button>
                <button className="ip-ctx-item" onClick={expandAll}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-expand-up-down-line" /></span><span className="ip-ctx-label">Expand all</span></span></button>
                <div className="ip-ctx-divider" />
                <button className="ip-ctx-item" onClick={() => { setShowArchived(s => !s); setSMenu(null) }}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-archive-line" /></span><span className="ip-ctx-label">Show archived</span></span></button>
              </>)}
            </div>
          )}
          {tagEdit && tagEdit.isNew && (
            <div className="ip-tag-options">
              <div className="ip-tag-row">
                <div className="ip-tag-rename">
                  <input className="ip-rename-input" autoFocus placeholder="Tag name" value={tagEdit.value}
                    onChange={e => setTagEdit(te => ({ ...te, value: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') saveTagEdit(); if (e.key === 'Escape') setTagEdit(null) }}
                    onBlur={() => setTagEdit(null)} />
                  <button className="ip-rename-save" onMouseDown={e => e.preventDefault()} onClick={saveTagEdit}>Save</button>
                </div>
              </div>
            </div>
          )}
          {(() => {
            const filt = (arr) => tagSearch ? arr.filter(t => t.name.toLowerCase().includes(tagSearch.toLowerCase())) : arr
            const anyWs = tagGroups.some(g => g.tags.some(t => t.ws))
            if (!anyWs) return tagGroups.map(g => renderTagGroup(g, filt(g.tags), g.id, !tagSearch))
            return (<>
              <div className="ip-wsv-block">
                <div className="ip-wsv-row clickable" onClick={() => toggleSection('sec:ws')}>
                  <div className="ip-wsv-inner">
                    <i className="ri-global-line lead" />
                    <div className="ip-wsv-left"><span className="ip-wsv-name">PM Engine</span><i className={'ri-arrow-down-s-line ip-wsv-chev' + (collapsed['sec:ws'] ? ' collapsed' : '')} /></div>
                  </div>
                </div>
                {!collapsed['sec:ws'] && <div className="ip-wsv-groups">{tagGroups.map(g => renderTagGroup(g, filt(g.tags.filter(t => t.ws)), 'ws:' + g.id))}</div>}
              </div>
              <div className="ip-wsv-block">
                <div className="ip-wsv-row clickable" onClick={() => toggleSection('sec:board')}>
                  <div className="ip-wsv-inner">
                    <i className="ri-layout-column-line lead" />
                    <div className="ip-wsv-left"><span className="ip-wsv-name">Design</span><i className={'ri-arrow-down-s-line ip-wsv-chev' + (collapsed['sec:board'] ? ' collapsed' : '')} /></div>
                  </div>
                </div>
                {!collapsed['sec:board'] && <div className="ip-wsv-groups">{tagGroups.map(g => renderTagGroup(g, filt(g.tags.filter(t => !t.ws)), 'board:' + g.id))}</div>}
              </div>
            </>)
          })()}
          {tagMenu && (
            <div className="ip-ctx-menu" style={{ left: tagMenu.x - 240, top: tagMenu.y }} onClick={e => e.stopPropagation()}>
              <button className="ip-ctx-item" onClick={startRename}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-edit-line" /></span><span className="ip-ctx-label">Rename</span></span></button>
              <button className="ip-ctx-item" onClick={startSetColor}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-palette-line" /></span><span className="ip-ctx-label">Set color</span></span></button>
              <div className="ip-ctx-divider" />
              <button className="ip-ctx-item" onClick={() => setTagMenu(null)}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-archive-line" /></span><span className="ip-ctx-label">Archive</span></span></button>
              <button className="ip-ctx-item" onClick={convertToWs}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-global-line" /></span><span className="ip-ctx-label">Convert to workspace-level tag</span></span></button>
              <div className="ip-ctx-divider" />
              <button className="ip-ctx-item" onClick={() => setTagMenu(null)}><span className="ip-ctx-item-wrap"><span className="ip-ctx-icon"><i className="ri-delete-bin-line" /></span><span className="ip-ctx-label">Delete</span></span></button>
            </div>
          )}
          {colorPicker && (
            <div className="ip-cp" style={{ left: colorPicker.x - 240, top: colorPicker.y }} onClick={e => e.stopPropagation()}>
              {colorPicker.mode === 'swatches' ? (<>
                <div className="ip-cp-grid">
                  {TAG_COLORS.map(c => (
                    <button key={c.key} className="ip-cp-sw" style={{ background: c.swatch }} onClick={() => pickSwatch(c)}>
                      {cpTag && cpTag.color === c.color && <i className="ri-check-line" />}
                    </button>
                  ))}
                  <button className="ip-cp-add" onClick={() => setColorPicker(cp => ({ ...cp, mode: 'palette' }))}><i className="ri-add-line" /></button>
                </div>
                <div className="ip-cp-clear-wrap">
                  <button className="ip-cp-clear" onClick={clearColor}>Clear color</button>
                </div>
              </>) : (
                <div className="ip-cp-palette">
                  <div className="ip-cp-area" style={{ background: `linear-gradient(to top, #000, rgba(0,0,0,0)), linear-gradient(to right, #fff, hsl(${hsl.h},100%,50%))` }}
                    onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const s = Math.round((e.clientX - r.left) / r.width * 100); const l = Math.round((1 - (e.clientY - r.top) / r.height) * 100); setHsl(h => ({ ...h, s: Math.max(0, Math.min(100, s)), l: Math.max(0, Math.min(100, l)) })) }} />
                  <input type="range" min="0" max="360" value={hsl.h} className="ip-cp-hue" onChange={e => setHsl(h => ({ ...h, h: +e.target.value }))} />
                  <div className="ip-cp-hsl">
                    <span className="ip-cp-hsl-label">HSL</span>
                    <input type="number" value={hsl.h} onChange={e => setHsl(h => ({ ...h, h: Math.max(0, Math.min(360, +e.target.value || 0)) }))} />
                    <input type="number" value={hsl.s} onChange={e => setHsl(h => ({ ...h, s: Math.max(0, Math.min(100, +e.target.value || 0)) }))} />
                    <input type="number" value={hsl.l} onChange={e => setHsl(h => ({ ...h, l: Math.max(0, Math.min(100, +e.target.value || 0)) }))} />
                  </div>
                  <div className="ip-cp-actions">
                    <button className="ip-cp-cancel" onClick={() => setColorPicker(cp => ({ ...cp, mode: 'swatches' }))}>Cancel</button>
                    <button className="ip-cp-apply" onClick={applyPalette}>Apply</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>}
      </div>
    </div>
  )
}

export default {
  title: 'Components/InfoPanel',
}

export const ActivityTab = () => (
  <div style={{ position: 'relative', height: 700, overflow: 'hidden', background: 'var(--bg-primary)' }}>
    <InfoPanelDemo open={true} onClose={() => {}} />
  </div>
)

export const TagsTab = () => {
  const [tab] = useState('Tags')
  return (
    <div style={{ position: 'relative', height: 700, overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <InfoPanelDemo open={true} onClose={() => {}} />
    </div>
  )
}

export const Toggled = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', height: 700, overflow: 'hidden', background: 'var(--bg-primary)', display: 'flex', alignItems: 'flex-start', padding: 16 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ padding: '6px 12px', cursor: 'pointer', border: '1px solid var(--border-secondary)', borderRadius: 8, background: open ? 'var(--bg-secondary)' : 'var(--bg-primary)', fontSize: 14 }}
      >
        {open ? 'Close panel' : 'Open panel'}
      </button>
      <InfoPanelDemo open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
