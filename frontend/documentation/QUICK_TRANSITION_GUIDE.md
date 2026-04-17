# 🚀 Quick Start: Page Transitions

## What You Got

Beautiful animated page transitions using Barba.js! When you click navigation links, colorful curtain panels sweep across the screen with smooth animations.

## Try It Now

1. Run your dev server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Click any navigation link (Home, Learn, Build, Jobs, Contact)
3. Watch the magic happen! 🎨

## The Effect

- 5 colorful gradient panels sweep down
- Page content fades smoothly
- Panels sweep back up
- New page appears

## Customize Colors (Optional)

Open `frontend/src/App.css` and find `.curtain-panel` styles. Change the gradients:

```css
.curtain-panel:nth-child(1) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Pick your colors from [uiGradients](https://uigradients.com/) or [WebGradients](https://webgradients.com/)

## Switch Transition Style

Want a different effect? Open `frontend/src/components/BarbaWrapper.tsx`:

```typescript
// Import different transition
import { liquidTransition } from '../transitions/barbaTransitions';

// Use it in barba.init()
transitions: [liquidTransition]
```

Available options:
- `curtainTransition` - Colorful panels (current)
- `liquidTransition` - Liquid distortion
- `slideTransition` - Horizontal slide
- `fadeTransition` - Simple fade
- `zoomTransition` - Scale effect

## That's It!

Everything is already wired up and working. Just navigate around your site and enjoy the smooth transitions! 🎉

---

For more details, see `TRANSITION_SETUP_COMPLETE.md`
