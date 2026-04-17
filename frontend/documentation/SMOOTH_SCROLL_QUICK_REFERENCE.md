# Smooth Scroll Quick Reference

## 🚀 Quick Start

Smooth scrolling is already enabled! Just use these data attributes on your elements.

## 📝 Common Patterns

### Fade In on Scroll
```jsx
<div data-scroll data-scroll-class="fade-in">
  Your content
</div>
```

### Slide Up on Scroll
```jsx
<div data-scroll data-scroll-class="slide-up">
  Your content
</div>
```

### Scale on Scroll
```jsx
<div data-scroll data-scroll-class="scale">
  Your content
</div>
```

### Parallax (Slow)
```jsx
<div data-scroll data-scroll-speed="0.5">
  Moves slower than scroll
</div>
```

### Parallax (Fast)
```jsx
<div data-scroll data-scroll-speed="2">
  Moves faster than scroll
</div>
```

### Staggered Animations
```jsx
<div data-scroll data-scroll-class="fade-in" data-scroll-delay="0">
  First
</div>
<div data-scroll data-scroll-class="fade-in" data-scroll-delay="0.1">
  Second
</div>
<div data-scroll data-scroll-class="fade-in" data-scroll-delay="0.2">
  Third
</div>
```

## 🎯 Programmatic Scrolling

### Scroll to Element
```typescript
import { scrollToElement } from './utils/smoothScroll';
import { useLenis } from './hooks/useLenis';

const lenisRef = useLenis();
scrollToElement(lenisRef.current, '#section-id');
```

### Scroll to Top
```typescript
import { scrollToTop } from './utils/smoothScroll';
scrollToTop(lenisRef.current);
```

### Stop/Start Scrolling
```typescript
import { stopScroll, startScroll } from './utils/smoothScroll';

stopScroll(lenisRef.current);  // For modals
startScroll(lenisRef.current); // Resume
```

## 🎨 Speed Values

- `0.5` = Half speed (slow parallax)
- `1` = Normal speed (no parallax)
- `2` = Double speed (fast parallax)
- `-1` = Reverse direction

## ⚡ Performance Tips

1. Don't animate too many elements at once
2. Use `data-lenis-prevent` on carousels/sliders
3. Smooth scroll is auto-disabled on mobile
4. Respects `prefers-reduced-motion`

## 🔧 Need More Control?

Check `SMOOTH_SCROLL_GUIDE.md` for advanced usage!
