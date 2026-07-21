import { IconButton } from './IconButton'

export default {
  title: 'Blank/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
  },
}

export const Plain = {
  args: { icon: 'ri-search-line', bordered: false },
}

export const Bordered = {
  args: { icon: 'ri-information-line', bordered: true },
}

export const Common = {
  render: () => (
    <div style={{ display: 'flex', gap: 4 }}>
      <IconButton icon="ri-search-line" />
      <IconButton icon="ri-notification-3-line" />
      <IconButton icon="ri-add-line" />
      <IconButton icon="ri-more-fill" />
      <IconButton icon="ri-information-line" bordered />
    </div>
  ),
}
