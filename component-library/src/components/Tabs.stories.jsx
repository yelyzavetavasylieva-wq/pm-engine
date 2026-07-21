import { useState } from 'react'
import { Tabs } from './Tabs'

export default {
  title: 'Blank/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export const Default = {
  render: () => {
    const tabs = ['Board', 'Calendar', 'Board reports', 'Delivered from board']
    const [active, setActive] = useState('Board')
    return <Tabs tabs={tabs} active={active} onChange={setActive} />
  },
}
