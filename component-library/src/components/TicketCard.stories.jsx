import { TicketCard } from './TicketCard'

export default {
  title: 'Blank/TicketCard',
  component: TicketCard,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'inline-radio', options: [undefined, 'completed', 'blocked'] },
  },
}

const base = {
  code: 'CFW-481',
  title:
    'Alpha feedback and bug reporting component development. This helps capture real-time issues from internal testers.',
  properties: [
    { icon: 'ri-calendar-line', label: 'Apr 28 – May 1' },
    { icon: 'ri-bar-chart-line', label: '8 pts' },
    { icon: 'ri-time-line', label: '3 h 10 m' },
  ],
  assignees: [
    { src: 'https://i.pravatar.cc/80?img=47' },
    { initials: 'KP', color: 'success' },
  ],
  tags: [
    { label: '01 Internal Alpha', color: 'brand' },
    { label: 'UX/UI design', color: 'purple' },
    { label: 'Measurement', color: 'brand' },
  ],
  comments: 3,
  done: 0,
  total: 4,
  attach: 1,
}

export const Default = { args: base }

export const Completed = { args: { ...base, state: 'completed' } }

export const Blocked = { args: { ...base, code: 'CFW-493', state: 'blocked' } }

export const WithCover = {
  args: {
    ...base,
    code: 'CFW-455',
    title: 'Luxury Tier customer dashboard design and development. This differentiator provides high-value clients a tailored experience.',
    cover: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=70&auto=format&fit=crop',
    tags: [
      { label: '02 Beta Launch', color: 'success' },
      { label: 'Merchandising', color: 'warning' },
    ],
  },
}
