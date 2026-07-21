import { useState } from 'react'
import { SaveViewModal } from './SaveViewModal'

export default {
  title: 'Blank/SaveViewModal',
  component: SaveViewModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export const Default = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [saved, setSaved] = useState(null)

    return (
      <div style={{ height: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        {saved && (
          <div style={{ fontSize: 14, color: 'var(--success-text)', padding: '8px 16px', background: 'var(--success-bg)', borderRadius: 8 }}>
            Saved: "{saved}"
          </div>
        )}
        <button
          className="btn btn--primary"
          onClick={() => { setOpen(true); setSaved(null) }}
        >
          Open Save view modal
        </button>
        {open && (
          <SaveViewModal
            onCancel={() => setOpen(false)}
            onConfirm={(name) => { setSaved(name); setOpen(false) }}
          />
        )}
      </div>
    )
  },
}
