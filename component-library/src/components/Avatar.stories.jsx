import { Avatar } from './Avatar'

export default {
  title: 'Blank/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['brand', 'success', 'warning', 'error', 'purple', 'secondary'] },
    size: { control: { type: 'range', min: 16, max: 48, step: 2 } },
  },
}

export const Initials = {
  args: { initials: 'KP', color: 'success', size: 32 },
}

export const Image = {
  args: { src: 'https://i.pravatar.cc/80?img=47', size: 32 },
}

export const Colors = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar initials="P" color="warning" size={32} />
      <Avatar initials="KP" color="success" size={32} />
      <Avatar initials="AA" color="brand" size={32} />
      <Avatar initials="SD" color="purple" size={32} />
      <Avatar initials="+5" color="secondary" size={32} />
    </div>
  ),
}
