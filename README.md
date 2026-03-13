# AuraToast: Premium React Toast & Notification Manager

![AuraToast Preview](./aura-toast-preview.png)

A high-performance npm package for React toast notifications with a stunning glassmorphism design and a strict "single-toast-at-a-time" constraint.

## Live Demo & Playground

- **Interactive Playground**: [Try it on StackBlitz](https://stackblitz.com/github/damicode18/aura-toast)
- **Live Showcase**: [damicode18.github.io/aura-toast](https://damicode18.github.io/aura-toast/)

## Features

- ✨ **Unique Aesthetic**: Modern glassmorphism design with `backdrop-filter`, glowing borders, and sleek transitions.
- 🚫 **Anti-Clutter**: Enforces a single toast policy. New toasts automatically replace the current one.
- 🛠️ **Framework Agnostic Core**: Core logic is written in TypeScript and can be used with any framework.
- ⚛️ **React Ready**: Comes with first-class React support (`AuraProvider`, `useAuraToast`).
- 🎨 **Highly Customizable**: Uses CSS variables for easy theme adjustments.

## Why AuraToast?

In a world of cluttered notification stacks, **AuraToast** takes a "less is more" approach. It's built for developers who want:
- **Focus**: The single-toast constraint ensures users are never overwhelmed.
- **Aesthetics**: Premium glassmorphism UI that fits modern, high-end applications.
- **Lightweight**: Zero-dependency core with first-class React support.
- **Performance**: Optimized for speed and smooth transitions.

## Installation

```bash
npm install aura-toast
```

## Quick Start (React)

1. Import the styles in your main entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import 'aura-toast/dist/style.css';
```

2. Wrap your application with `AuraProvider`:

```tsx
import { AuraProvider } from 'aura-toast';
```

## Live Demo

Check out the interactive showcase: [Live Demo Link (GitHub Pages/Vercel)]

> [!TIP]
> **Single Toast Policy**: AuraToast is designed for focus. Each new toast replaces the previous one with a smooth transition, preventing UI clutter.

2. Trigger toasts using the `auraToast` object:

```tsx
import { auraToast } from 'aura-toast';

function MyComponent() {
  const handleClick = () => {
    auraToast.success('Changes saved successfully!', {
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      }
    });
  };

  return <button onClick={handleClick}>Save</button>;
}
```

## API

### `auraToast.success(message, config?)`
### `auraToast.error(message, config?)`
### `auraToast.info(message, config?)`
### `auraToast.warning(message, config?)`
### `auraToast.dismiss()`

#### Configuration Object
| Property | Type | Description |
| --- | --- | --- |
| `duration` | `number` | Time in ms before auto-dismiss (default: 4000). Set to 0 to disable. |
| `action` | `{ label: string, onClick: () => void }` | Optional action button. |

## Customization

You can override the default styles by providing values for these CSS variables:

```css
:root {
  --aura-bg: rgba(17, 25, 40, 0.75);
  --aura-success: #10b981;
  /* ... see aura-toast.css for more */
}
```

## License

MIT
