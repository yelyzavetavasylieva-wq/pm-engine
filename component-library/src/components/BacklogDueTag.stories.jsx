import { DueDateTag } from './DueDateTag'
import '../styles/components.css'
import '../styles/tokens.css'

export default {
  title: 'Components/DueDateTag',
  component: DueDateTag,
}

export const Default = () => (
  <div style={{ padding: 40, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <DueDateTag due="Jun 30" />
    <DueDateTag due="Jul 15" />
  </div>
)

export const Hover = () => (
  <div style={{ padding: 40, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <span className="bl-tag bl-due-tag" style={{ background: 'var(--bg-primary-hover)' }}>
      <i className="ri-calendar-line" />Jun 30
    </span>
  </div>
)

export const Focused = () => (
  <div style={{ padding: 40, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <span className="bl-tag bl-due-tag focused">
      <i className="ri-calendar-line" />Jun 30
    </span>
  </div>
)

export const Disabled = () => (
  <div style={{ padding: 40, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <DueDateTag due="Jun 30" disabled />
  </div>
)

export const WithCalendar = () => (
  <div style={{ padding: 40, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <DueDateTag due="Jun 30" />
    <span style={{ fontSize: 12, color: 'var(--text-tertiary)', alignSelf: 'center' }}>← click to open calendar</span>
  </div>
)
