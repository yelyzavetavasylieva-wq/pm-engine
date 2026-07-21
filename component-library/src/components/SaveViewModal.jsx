import { useState } from 'react'

/**
 * SaveViewModal — confirmation dialog for saving a filter view.
 *
 *  onCancel()         close without saving
 *  onConfirm(name)    called with the trimmed view name when the user clicks Save
 */
export function SaveViewModal({ onCancel, onConfirm }) {
  const [name, setName] = useState('')

  const handleSave = () => {
    if (name.trim()) onConfirm(name.trim())
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Save view</span>
          <button className="modal-close" onClick={onCancel}>
            <i className="ri-close-line" />
          </button>
        </div>
        <p className="modal-desc">
          Save your current filters, sorting, grouping, and column settings as a reusable view
        </p>
        <div className="modal-field">
          <div className="modal-label">View name</div>
          <input
            className="modal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the view name"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && name.trim()) handleSave()
              if (e.key === 'Escape') onCancel()
            }}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn--secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn--primary" disabled={!name.trim()} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveViewModal
