import { useState } from 'react'
import { FilterMenu } from './FilterMenu'

const CATEGORIES = [
  {
    id: 'member', label: 'Member', icon: 'ri-user-3-line',
    options: [
      { id: 'jen', label: 'Jennifer Pruitt', avatar: { src: 'https://i.pravatar.cc/80?img=47' } },
      { id: 'kp', label: 'Kasey Park', avatar: { initials: 'KP', color: 'success' } },
      { id: 'aa', label: 'Aaron Adams', avatar: { initials: 'AA', color: 'brand' } },
      { id: 'marc', label: 'Marcus Lee', avatar: { src: 'https://i.pravatar.cc/80?img=12' } },
      { id: 'liam', label: "Liam O'Brien", avatar: { src: 'https://i.pravatar.cc/80?img=33' } },
      { id: 'sd', label: 'Sora Diaz', avatar: { initials: 'SD', color: 'purple' } },
    ],
  },
  {
    id: 'tag', label: 'Tag', icon: 'ri-price-tag-3-line',
    options: [
      { id: 'alpha', label: '01 Internal Alpha', tag: 'brand' },
      { id: 'beta', label: '02 Beta Launch', tag: 'success' },
      { id: 'uxui', label: 'UX/UI design', tag: 'purple' },
      { id: 'merch', label: 'Merchandising and marketing', tag: 'warning' },
      { id: 'critical', label: 'Critical', tag: 'error' },
    ],
  },
  {
    id: 'date', label: 'Due date', icon: 'ri-calendar-line', type: 'radio',
    options: [
      { id: 'none', label: 'None' },
      { id: 'overdue', label: 'Overdue' },
      { id: 'today', label: 'Due today' },
      { id: 'week', label: 'Due this week' },
      { id: 'custom', label: 'Due custom date' },
    ],
  },
  {
    id: 'project', label: 'Project', icon: 'ri-stack-line',
    options: [
      { id: 'p-ecom', label: 'eCommerce platform', prefix: 'Dev-eCom', icon: 'ri-stack-line' },
      { id: 'p-hr',   label: 'Recruitment',        prefix: 'HR',       icon: 'ri-stack-line' },
      { id: 'p-wp',   label: 'Welcome project',    prefix: 'WP',       icon: 'ri-stack-line' },
    ],
  },
]

export default {
  title: 'Blank/FilterMenu',
  component: FilterMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export const Default = {
  render: () => {
    const [selected, setSelected] = useState({ member: ['kp'], tag: [], date: [], project: [] })
    const toggle = (cat, id) =>
      setSelected((s) => {
        const catDef = CATEGORIES.find((c) => c.id === cat)
        if (catDef?.type === 'radio') {
          return { ...s, [cat]: id === 'none' ? [] : [id] }
        }
        const a = s[cat] || []
        return { ...s, [cat]: a.includes(id) ? a.filter((x) => x !== id) : [...a, id] }
      })
    return (
      <FilterMenu
        categories={CATEGORIES}
        selected={selected}
        onToggle={toggle}
        onClear={() => setSelected({ member: [], tag: [], date: [], project: [] })}
        onSave={() => {}}
      />
    )
  },
}
