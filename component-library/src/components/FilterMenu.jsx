import { useState } from 'react'
import { Avatar } from './Avatar'
import { Calendar } from './Calendar'

/**
 * FilterMenu — a two-pane filter popover.
 *
 *  categories  [{ id, label, icon, type?, options: [{ id, label, avatar?, tag?, icon?, prefix? }] }]
 *              type: 'radio' makes options mutually exclusive; 'custom' option id triggers inline date picker
 *  selected    { [catId]: string[] }
 *  onToggle(catId, optionId)
 *  onClear()
 *  onSave()
 */
export function FilterMenu({ categories = [], selected = {}, onToggle, onClear, onSave }) {
  const [active, setActive] = useState(categories[0]?.id)
  const [q, setQ] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [pendingRange, setPendingRange] = useState({ start: null, end: null })
  const [appliedRange, setAppliedRange] = useState({ start: null, end: null })

  const cat = categories.find((c) => c.id === active) || categories[0]
  const isPickerCat = cat?.type === 'radio'
  const customApplied = appliedRange.start && (selected[cat?.id] || []).includes('custom')
  const customPending = isPickerCat && (selected[cat?.id] || []).includes('custom') && !appliedRange.start
  const rawCount = Object.values(selected).reduce((n, arr) => n + (arr?.length || 0), 0)
  const count = rawCount - (customPending ? 1 : 0)
  const opts = (cat?.options || []).filter((o) => o.label.toLowerCase().includes(q.toLowerCase()))

  const handleOptionChange = (optId) => {
    if (isPickerCat && optId === 'custom') {
      setPendingRange(appliedRange)
      setShowPicker(true)
      onToggle && onToggle(cat.id, optId)
    } else {
      if (isPickerCat) setShowPicker(false)
      onToggle && onToggle(cat.id, optId)
    }
  }

  const handlePickerApply = () => {
    setAppliedRange(pendingRange)
    setShowPicker(false)
  }

  const handlePickerCancel = () => {
    setShowPicker(false)
    if (!appliedRange.start) onToggle && onToggle(cat.id, 'custom')
  }

  const handleClear = () => {
    setAppliedRange({ start: null, end: null })
    setShowPicker(false)
    onClear && onClear()
  }

  const fmtDt = (dt) => {
    if (!dt) return ''
    const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${M[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
  }

  return (
    <div className="filter-menu">
      <div className="fm-search">
        <i className="ri-search-line" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search across all categories..." />
      </div>
      <div className="fm-body" style={showPicker && isPickerCat ? { maxHeight: 'none' } : {}}>
        <div className="fm-cats">
          {categories.map((c) => (
            <div
              key={c.id}
              className={'fm-cat' + (c.id === active ? ' active' : '')}
              onClick={() => { setActive(c.id); setQ(''); if (c.id !== 'date') setShowPicker(false) }}
            >
              <i className={c.icon} />
              <span className="fm-cat-label">{c.label}</span>
              {selected[c.id]?.length > 0 && <span className="fm-cat-count">{selected[c.id].length}</span>}
              <i className="ri-arrow-right-s-line fm-chev" />
            </div>
          ))}
        </div>
        <div className="fm-options" style={showPicker && isPickerCat ? { overflowY: 'visible' } : {}}>
          {opts.map((o) => {
            const sel = selected[cat?.id] || []
            const checked = isPickerCat
              ? (o.id === 'none' ? sel.length === 0 : sel[0] === o.id)
              : sel.includes(o.id)
            const isCustom = o.id === 'custom'
            const isApplied = isCustom && customApplied
            return (
              <label key={o.id} className="fm-opt" style={isApplied ? { alignItems: 'flex-start' } : {}}>
                <input
                  type={isPickerCat ? 'radio' : 'checkbox'}
                  checked={checked}
                  onChange={() => handleOptionChange(o.id)}
                  style={isApplied ? { marginTop: 3 } : {}}
                />
                {o.tag ? (
                  <span className="tag" style={{ background: `var(--${o.tag}-bg)`, color: `var(--${o.tag}-text)` }}>
                    <span className="tag-dot" />
                    {o.label}
                  </span>
                ) : isCustom ? (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <span className="fm-opt-label">{o.label}</span>
                    {isApplied && (
                      <span style={{ fontSize: 11, color: 'var(--text-quaternary)', lineHeight: '16px', marginTop: 1 }}>
                        {fmtDt(appliedRange.start)}{appliedRange.end ? ` – ${fmtDt(appliedRange.end)}` : ''}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    {o.avatar && <Avatar {...o.avatar} size={20} />}
                    {o.icon && <i className={o.icon} style={{ fontSize: 16, color: 'var(--text-tertiary)', margin: '0 2px' }} />}
                    <span className="fm-opt-label">
                      {o.prefix && <span style={{ color: 'var(--text-tertiary)', fontWeight: 400, marginRight: 4 }}>{o.prefix}</span>}
                      {o.label}
                    </span>
                  </>
                )}
                {isApplied && (
                  <i
                    className="ri-pencil-line"
                    style={{ fontSize: 14, color: 'var(--text-quaternary)', marginLeft: 'auto', flexShrink: 0, marginTop: 3, cursor: 'pointer' }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPendingRange(appliedRange); setShowPicker(true) }}
                  />
                )}
              </label>
            )
          })}
          {opts.length === 0 && <div className="fm-empty">No matches</div>}
          {showPicker && isPickerCat && (
            <div className="mc-picker-card">
              <Calendar
                noFooter
                initialStart={pendingRange.start}
                initialEnd={pendingRange.end}
                onChange={setPendingRange}
                style={{ border: 'none', boxShadow: 'none', borderRadius: 0, padding: 0, width: 'auto' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="fm-btn" style={{ flex: 1, height: 32 }} onClick={handlePickerCancel}>Cancel</button>
                <button className="fm-btn primary" style={{ flex: 1, height: 32 }} onClick={handlePickerApply}>Apply</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="fm-footer">
        <span className="fm-applied">{count} filter{count === 1 ? '' : 's'} applied</span>
        <div className="fm-actions">
          <button className="fm-btn" disabled={count === 0} onClick={handleClear}>Clear all</button>
          <button className={'fm-btn' + (count > 0 ? ' primary' : '')} disabled={count === 0} onClick={onSave}>
            Save view
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
