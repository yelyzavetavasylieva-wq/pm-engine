import { TicketCard } from './components/TicketCard'
import { Tag } from './components/Tag'
import { Avatar } from './components/Avatar'

/**
 * Tiny landing page for the Vite app (`npm run dev`).
 * The real workshop is Storybook (`npm run storybook`).
 */
export function App() {
  return (
    <div className="blank" data-theme="light" style={{ background: 'var(--bg-canvas)', minHeight: '100vh', padding: 40 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)' }}>PM Engine — “Blank” component library</h1>
      <p style={{ color: 'var(--text-tertiary)', marginTop: 6, fontSize: 14 }}>
        Browse and develop components in Storybook: <code>npm run storybook</code>
      </p>
      <div style={{ display: 'flex', gap: 8, margin: '20px 0' }}>
        <Tag label="01 Internal Alpha" color="brand" />
        <Tag label="UX/UI design" color="purple" />
        <Avatar initials="KP" color="success" size={28} />
      </div>
      <TicketCard
        code="CFW-481"
        title="Alpha feedback and bug reporting component development."
        properties={[
          { icon: 'ri-calendar-line', label: 'Apr 28 – May 1' },
          { icon: 'ri-bar-chart-line', label: '8 pts' },
        ]}
        assignees={[{ initials: 'KP', color: 'success' }, { src: 'https://i.pravatar.cc/80?img=47' }]}
        tags={[{ label: '01 Internal Alpha', color: 'brand' }]}
        comments={3} done={0} total={4} attach={1} state="completed"
      />
    </div>
  )
}

export default App
