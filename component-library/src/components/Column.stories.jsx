import { useState } from 'react'
import { Column } from './Column'
import { TicketCard } from './TicketCard'

export default {
  title: 'Blank/Column',
  component: Column,
  tags: ['autodocs'],
}

// Title is click-to-edit (hover highlights it, click → inline input + Save).
export const ToDo = {
  render: () => {
    const [title, setTitle] = useState('To do')
    return (
    <Column title={title} count={2} summary="2 cards, 21 points" onRename={setTitle}>
      <TicketCard
        code="CFW-481"
        title="Alpha feedback and bug reporting component development."
        properties={[
          { icon: 'ri-calendar-line', label: 'Apr 28 – May 1' },
          { icon: 'ri-bar-chart-line', label: '8 pts' },
        ]}
        assignees={[{ initials: 'KP', color: 'success' }]}
        tags={[{ label: '01 Internal Alpha', color: 'brand' }]}
        comments={3}
        done={0}
        total={4}
        attach={1}
      />
      <TicketCard
        code="CFW-490"
        title="Wishlist sharing across social channels with privacy controls."
        properties={[{ icon: 'ri-bar-chart-line', label: '13 pts' }]}
        assignees={[{ initials: 'AA', color: 'brand' }]}
        tags={[{ label: 'Improvement', color: 'brand' }]}
        comments={1}
        done={0}
        total={6}
        attach={0}
      />
    </Column>
    )
  },
}
