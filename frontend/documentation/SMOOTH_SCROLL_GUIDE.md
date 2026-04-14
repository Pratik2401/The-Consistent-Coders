# Smooth Scrolling Guide

This project now uses both **Lenis** and **Locomotive Scroll** for buttery-smooth scrolling across all pages.

## Features

- Smooth wheel scrolling with easing
- GSAP ScrollTrigger integration
- Parallax effects support
- Scroll-triggered animations
- Mobile-optimized (native scroll on mobile for performance)
- Accessibility-friendly (respects prefers-reduced-motion)

## Usage

### Basic Setup

The smooth scrolling is automatically initialized in `App.tsx` via the `useLenis` hook. No additional setup needed!

### Scroll to Element

```typescript
import { scrollToElement } from './utils/smoothScroll';
import { useLenis } from './hooks/useLenis';

function MyComponent() {
  const lenisRef = useLenis();

  const handleClick = () => {
    scrollToElement(lenisRef.current, '#target-section', {
      offset: -100, // Optional offset
      duration: 1.5, // Optional duration
    });
  };

  return <button onClick={handleClick}>Scroll to Section</button>;
}
```

### Scroll to Top

```typescript
import { scrollToTop } from './utils/smoothScroll';

scrollToTop(lenisRef.current);
```

### Stop/Start Scrolling

```typescript
import { stopScroll, startScroll } from './utils/smoothScroll';

// Stop scrolling (useful for modals)
stopScroll(lenisRef.current);

// Resume scrolling
startScroll(lenisRef.current);
```

## Locomotive Scroll Data Attributes

Add these attributes to your HTML elements for scroll effects:

### Parallax Effect

```jsx
<div data-scroll data-scroll-speed="0.5">
  This moves slower than the scroll
</div>

<div data-scroll data-scroll-speed="2">
  This moves faster than the scroll
</div>
```

### Fade In on Scroll

```jsx
<div data-scroll data-scroll-class="fade-in">
  This fades in when scrolled into view
</div>
```

### Slide Up on Scroll

```jsx
<div data-scroll data-scroll-class="slide-up">
  This slides up when scrolled into view
</div>
```

### Scale on Scroll

```jsx
<div data-scroll data-scroll-class="scale">
  This scales up when scrolled into view
</div>
```

### Custom Scroll Trigger

```jsx
<div 
  data-scroll 
  data-scroll-call="myFunction"
  data-scroll-repeat
>
  Triggers a function on scroll
</div>
```

## Advanced Hook Usage

Use the `useSmoothScroll` hook for more control:

```typescript
import { useSmoothScroll } from './hooks/useSmoothScroll';

function MyPage() {
  const { lenisRef, locomotiveRef } = useSmoothScroll({
    enableLocomotiveScroll: true,
    duration: 1.5,
    lerp: 0.08,
  });

  return <div>Your content</div>;
}
```

## GSAP ScrollTrigger Integration

Smooth scrolling is automatically synced with GSAP ScrollTrigger:

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
  },
  x: 100,
  opacity: 1,
});
```

## Performance Tips

1. Use `will-change: transform` sparingly
2. Avoid animating too many elements simultaneously
3. Use `data-lenis-prevent` on elements that need native scroll (like carousels)
4. Smooth scrolling is disabled on mobile by default for better performance

## Accessibility

The smooth scrolling respects the `prefers-reduced-motion` media query. Users who prefer reduced motion will get native scrolling behavior.

## Troubleshooting

### ScrollTrigger not working?

Make sure to refresh ScrollTrigger after content loads:

```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

useEffect(() => {
  ScrollTrigger.refresh();
}, []);
```

### Scroll position incorrect?

Call `ScrollTrigger.refresh()` after dynamic content loads or layout changes.

### Need to prevent smooth scroll on specific element?

Add the `data-lenis-prevent` attribute:

```jsx
<div data-lenis-prevent>
  This uses native scroll
</div>
```

## Configuration

Edit `frontend/src/hooks/useLenis.ts` to customize:

- `duration`: Scroll animation duration (default: 1.2)
- `lerp`: Linear interpolation amount (default: 0.1, lower = smoother but slower)
- `touchMultiplier`: Touch scroll speed multiplier (default: 2)

## Examples

Check these files for implementation examples:
- `frontend/src/App.tsx` - Main setup
- `frontend/src/hooks/useLenis.ts` - Hook implementation
- `frontend/src/utils/smoothScroll.ts` - Helper functions
- `frontend/src/components/SmoothScroll.tsx` - Wrapper component
