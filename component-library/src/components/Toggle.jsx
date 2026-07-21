/**
 * Toggle — on/off switch.
 */
export function Toggle({ on = false, onChange }) {
  return (
    <button
      type="button"
      className={'toggle' + (on ? ' on' : '')}
      role="switch"
      aria-checked={on}
      onClick={() => onChange && onChange(!on)}
    >
      <span className="knob" />
    </button>
  )
}

export default Toggle
