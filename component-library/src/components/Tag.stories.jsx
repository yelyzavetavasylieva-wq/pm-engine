import { Tag } from './Tag'

export default {
  title: 'Blank/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['brand', 'success', 'warning', 'error', 'purple'] },
  },
}

export const Default = {
  args: { label: 'UX/UI design', color: 'purple' },
}

export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 360 }}>
      <Tag label="01 Internal Alpha" color="brand" />
      <Tag label="02 Beta Launch" color="success" />
      <Tag label="UX/UI design" color="purple" />
      <Tag label="Merchandising" color="warning" />
      <Tag label="Critical" color="error" />
    </div>
  ),
}
