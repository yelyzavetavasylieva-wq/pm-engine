import { Button } from './Button'

export default {
  title: 'Blank/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    hierarchy: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export const Secondary = {
  args: { hierarchy: 'secondary', children: 'Filter', leadIcon: 'ri-filter-3-line' },
}

export const Primary = {
  args: { hierarchy: 'primary', children: 'Save', leadIcon: 'ri-check-line' },
}

export const Tertiary = {
  args: { hierarchy: 'tertiary', children: 'Cancel' },
}

export const WithBadge = {
  args: { hierarchy: 'secondary', children: 'Filter', leadIcon: 'ri-filter-3-line', badge: 2 },
}

export const Hierarchies = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button hierarchy="primary" leadIcon="ri-add-line">Primary</Button>
      <Button hierarchy="secondary" leadIcon="ri-filter-3-line">Secondary</Button>
      <Button hierarchy="tertiary">Tertiary</Button>
    </div>
  ),
}
