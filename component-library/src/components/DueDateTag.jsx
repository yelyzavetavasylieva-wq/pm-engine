import { useState, useRef, useEffect, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { Calendar } from './Calendar'

export const DueDateTag = forwardRef(function DueDateTag({ due = 'Jun 30', disabled, onOpenChange }, fwdRef) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const tagRef = useRef(null)
  const calRef = useRef(null)

  const setRef = el => {
    tagRef.current = el
    if (typeof fwdRef === 'function') fwdRef(el)
    else if (fwdRef) fwdRef.current = el
  }

  const toggle = e => {
    e.stopPropagation()
    const next = !open
    if (next && tagRef.current) {
      const r = tagRef.current.getBoundingClientRect()
      setPos({ top: r.bottom + 4 + window.scrollY, left: r.left + window.scrollX })
    }
    setOpen(next)
    onOpenChange && onOpenChange(next)
  }
  const close = () => { setOpen(false); onOpenChange && onOpenChange(false) }

  useEffect(() => {
    if (!open) return
    const handler = e => {
      if (tagRef.current && tagRef.current.contains(e.target)) return
      if (calRef.current && calRef.current.contains(e.target)) return
      close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <>
      <span
        ref={setRef}
        className={'bl-tag bl-due-tag' + (open ? ' focused' : '') + (disabled ? ' disabled' : '')}
        onClick={disabled ? undefined : toggle}
      >
        <i className="ri-calendar-line" />{due}
      </span>
      {open && createPortal(
        <div ref={calRef} style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 1000 }}>
          <Calendar onCancel={close} onApply={close} />
        </div>,
        document.body
      )}
    </>
  )
})

export default DueDateTag
