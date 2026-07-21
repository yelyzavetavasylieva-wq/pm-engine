import { PropertyBadge } from './PropertyBadge'

export default {
  title: 'Blank/PropertyBadge',
  component: PropertyBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'warn'] },
  },
}

export const Date = {
  args: { icon: 'ri-calendar-line', label: 'Apr 29 – May 1', variant: 'default' },
}

export const Points = {
  args: { icon: 'ri-bar-chart-line', label: '40 pts', variant: 'default' },
}

export const TimeSpent = {
  args: { icon: 'ri-time-line', label: '1 h 2 m', variant: 'warn' },
}

export const Row = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <PropertyBadge icon="ri-calendar-line" label="Apr 29 – May 1" />
      <PropertyBadge icon="ri-bar-chart-line" label="40 pts" />
      <PropertyBadge icon="ri-time-line" label="1 h 2 m" variant="warn" />
    </div>
  ),
}
