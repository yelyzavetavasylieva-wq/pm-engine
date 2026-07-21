import { useState } from 'react'
import { Toggle } from './Toggle'

export default {
  title: 'Blank/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export const Off = { args: { on: false } }
export const On = { args: { on: true } }

export const Interactive = {
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
        <Toggle on={on} onChange={setOn} />
        <span style={{ fontSize: 14 }}>{on ? 'On' : 'Off'}</span>
      </label>
    )
  },
}
