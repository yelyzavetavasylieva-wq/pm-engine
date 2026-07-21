import { useState } from 'react'
import { Calendar } from './Calendar'

export default {
  title: 'Blank/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export const Default = {
  render: () => {
    const [result, setResult] = useState(null)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
        {result && (
          <div style={{ fontSize: 13, color: 'var(--success-text)', padding: '6px 12px', background: 'var(--success-bg)', borderRadius: 8 }}>
            {result.start ? `${result.start.toLocaleDateString()} – ${result.end?.toLocaleDateString() ?? '…'}` : 'No range'}
          </div>
        )}
        <Calendar
          onApply={(range) => setResult(range)}
          onCancel={() => setResult(null)}
        />
      </div>
    )
  },
}
