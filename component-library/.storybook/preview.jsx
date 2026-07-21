import '../src/styles/tokens.css'
import '../src/styles/components.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    // We provide our own themed canvas via the decorator below.
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },

  globalTypes: {
    theme: {
      description: 'Blank design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: { theme: 'light' },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      return (
        <div
          className="blank"
          data-theme={theme}
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: 24, minHeight: '100vh' }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
