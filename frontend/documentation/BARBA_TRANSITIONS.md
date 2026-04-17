# Barba.js Page Transitions

Beautiful page transitions have been implemented using Barba.js and GSAP. When you click on navigation links, you'll see smooth animated transitions between pages.

## Current Transition: Curtain Effect

The default transition uses a colorful curtain effect with 5 animated panels that sweep across the screen.

## Available Transitions

You can easily switch between different transition styles by modifying `BarbaWrapper.tsx`:

### 1. Curtain Transition (Current)
- Colorful panels sweep across the screen
- 5 gradient panels with staggered animation
- Duration: ~0.7s

### 2. Liquid Transition
- Smooth liquid-like distortion effect
- Uses SVG filter for organic feel
- Duration: ~0.6s

### 3. Slide Transition
- Pages slide horizontally
- Clean and simple
- Duration: ~0.5s

### 4. Fade Transition
- Classic crossfade
- Minimal and elegant
- Duration: ~0.4s

### 5. Zoom Transition
- Scale in/out effect
- Modern and dynamic
- Duration: ~0.5s

## How to Change Transitions

1. Open `frontend/src/components/BarbaWrapper.tsx`
2. Import the desired transition from `../transitions/barbaTransitions`
3. Replace the transition in the `barba.init()` configuration

Example:
```typescript
import { liquidTransition, slideTransition } from '../transitions/barbaTransitions';

// In barba.init():
transitions: [liquidTransition]
```

## Customizing Curtain Colors

Edit the gradient colors in `frontend/src/App.css`:

```css
.curtain-panel:nth-child(1) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
/* Modify other panels similarly */
```

## Performance Tips

- Transitions are GPU-accelerated using GSAP
- ScrollTrigger is automatically refreshed after each transition
- Smooth scrolling is maintained with Lenis integration

## Disabling Transitions

To disable transitions for specific links, add the `no-barba` class:

```tsx
<a href="/page" className="no-barba">No Transition</a>
```

External links automatically skip transitions.
