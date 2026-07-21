import { IconButton } from './IconButton'

/**
 * Footer — board footer bar: a "N cards, M points" summary on the left and a
 * delivery action on the right. Matches the Figma footer component.
 */
export function Footer({ cards = 0, points = 0, onDeliver }) {
  return (
    <div className="footer-bar">
      <span className="summary">{cards} cards, {points} points</span>
      <IconButton icon="ri-truck-line" title="Delivered from board" onClick={onDeliver} />
    </div>
  )
}

export default Footer
