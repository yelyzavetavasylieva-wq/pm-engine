import { useEffect, useRef, useState } from 'react'

/**
 * Column — a board column: title + rectangular count badge, a compact "more"
 * action (with a hover summary), the card slot, and an add-card footer.
 * Matches the Figma column-header component (no status dot, single more button).
 *
 * If `onRename` is provided, the title becomes click-to-edit: clicking it shows
 * an inline input + Save button (the Figma "Active" header state).
 */
export function Column({ title, count, summary, children, onAdd, onRename }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(title)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) {
      setDraft(title)
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [editing, title])

  const save = () => {
    const v = draft.trim()
    if (v) onRename && onRename(v)
    setEditing(false)
  }

  return (
    <div className="column">
      <div className="col-head">
        {editing ? (
          <div className="col-rename">
            <input
              ref={inputRef}
              className="col-rename-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') setEditing(false)
              }}
              onBlur={() => setEditing(false)}
            />
            <button className="col-rename-save" onMouseDown={(e) => e.preventDefault()} onClick={save}>Save</button>
          </div>
        ) : (
          <>
            <div
              className="col-title-wrap"
              onClick={() => onRename && setEditing(true)}
              title={onRename ? 'Rename column' : undefined}
            >
              <span className="col-title">{title}</span>
              {count != null && <span className="col-count">{count}</span>}
            </div>
            <div className="col-actionrow">
              {summary && <span className="col-meta">{summary}</span>}
              <button className="col-more" title="More"><i className="ri-more-line" /></button>
            </div>
          </>
        )}
      </div>
      <div className="col-body">{children}</div>
      <div className="col-foot">
        <button className="add-card" onClick={onAdd}>
          <i className="ri-add-line" /> Add new card
        </button>
      </div>
    </div>
  )
}

export default Column
