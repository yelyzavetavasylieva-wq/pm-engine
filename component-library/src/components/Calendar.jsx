import { useState } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function buildCells(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ d: daysInPrev - i, type: 'prev' })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ d, type: 'cur' })
  const rem = cells.length % 7
  if (rem > 0) for (let d = 1; d <= 7 - rem; d++) cells.push({ d, type: 'next' })
  return cells
}

function fmt(dt) {
  return `${String(dt.getMonth() + 1).padStart(2, '0')}/${String(dt.getDate()).padStart(2, '0')}/${dt.getFullYear()}`
}

export function Calendar({ initialYear = 2026, initialMonth = 5, onApply, onCancel, style, noFooter, onChange, initialStart, initialEnd }) {
  const [vYear, setVYear] = useState(initialYear)
  const [vMonth, setVMonth] = useState(initialMonth)
  const [start, setStart] = useState(initialStart || null)
  const [end, setEnd] = useState(initialEnd || null)

  const cells = buildCells(vYear, vMonth)

  const prevMo = () => {
    if (vMonth === 0) { setVMonth(11); setVYear(y => y - 1) }
    else setVMonth(m => m - 1)
  }
  const nextMo = () => {
    if (vMonth === 11) { setVMonth(0); setVYear(y => y + 1) }
    else setVMonth(m => m + 1)
  }

  const handleDayClick = (cell) => {
    if (cell.type !== 'cur') return
    const dt = new Date(vYear, vMonth, cell.d)
    let ns = start, ne = end
    if (!start || (start && end)) { ns = dt; ne = null }
    else { if (dt < start) { ne = start; ns = dt } else ne = dt }
    setStart(ns); setEnd(ne)
    onChange && onChange({ start: ns, end: ne })
  }

  const isSel = (cell) => {
    if (cell.type !== 'cur') return false
    const dt = new Date(vYear, vMonth, cell.d)
    return (start && dt.toDateString() === start.toDateString()) ||
           (end && dt.toDateString() === end.toDateString())
  }
  const isRange = (cell) => {
    if (!start || !end || cell.type !== 'cur') return false
    const dt = new Date(vYear, vMonth, cell.d)
    return dt > start && dt < end
  }

  const rows = Math.ceil(cells.length / 7)

  return (
    <div className="mini-cal" style={style}>
      <div className="mc-header">
        <span className="mc-month">{MONTHS[vMonth]} {vYear}</span>
        <button className="mc-nav" onClick={prevMo}><i className="ri-arrow-left-s-line" /></button>
        <button className="mc-nav" onClick={nextMo}><i className="ri-arrow-right-s-line" /></button>
      </div>
      <div className="mc-fields">
        <div className="mc-field">
          <div className="mc-field-label">Start</div>
          <input className="mc-field-input" readOnly value={start ? fmt(start) : ''} placeholder="MM/DD/YYYY" />
        </div>
        <div className="mc-field">
          <div className="mc-field-label">End</div>
          <input className="mc-field-input" readOnly value={end ? fmt(end) : ''} placeholder="MM/DD/YYYY" />
        </div>
      </div>
      <div className="mc-grid">
        <div className="mc-week-row">
          {WDAYS.map((d, i) => <div key={i} className="mc-wday">{d}</div>)}
        </div>
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="mc-day-row">
            {cells.slice(row * 7, row * 7 + 7).map((cell, ci) => (
              <div key={ci} className={'mc-day' + (isRange(cell) ? ' mc-range-cell' : '')} onClick={() => handleDayClick(cell)}>
                <div className={
                  'mc-day-inner' +
                  (cell.type !== 'cur' ? ' mc-other' : '') +
                  (isSel(cell) ? ' mc-sel' : '') +
                  (isRange(cell) ? ' mc-range' : '')
                }>
                  {cell.d}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {!noFooter && (
        <div className="mc-footer">
          <button className="mc-btn" onClick={onCancel}>Cancel</button>
          <button className="mc-btn primary" onClick={() => onApply && onApply({ start, end })}>Apply</button>
        </div>
      )}
    </div>
  )
}

export default Calendar
