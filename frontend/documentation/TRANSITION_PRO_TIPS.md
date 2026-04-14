# 💡 Pro Tips for Page Transitions

## Performance Optimization

### 1. Use GPU Acceleration
Already implemented! The transitions use `transform` and `opacity` which are GPU-accelerated properties.

### 2. Reduce Motion for Accessibility
Add this to your CSS for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .curtain-panel {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Preload Next Page
For even smoother transitions, you can preload the next page on hover:

```typescript
// In Navbar.tsx
const handleLinkHover = (href: string) => {
  // Preload the route
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};
```

## Design Tips

### 1. Match Your Brand Colors
Update the curtain panel gradients to match your brand:

```css
/* Example: Blue brand */
.curtain-panel:nth-child(1) {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
}
```

### 2. Seasonal Themes
Change colors for holidays or seasons:

```css
/* Halloween */
.curtain-panel:nth-child(1) {
  background: linear-gradient(135deg, #ff6b00 0%, #000000 100%);
}

/* Christmas */
.curtain-panel:nth-child(1) {
  background: linear-gradient(135deg, #c41e3a 0%, #0c5c3e 100%);
}
```

### 3. Adjust Panel Count
Want more or fewer panels? Edit App.tsx:

```tsx
{/* Add or remove panels */}
<div className="transition-curtain">
  <div className="curtain-panel"></div>
  <div className="curtain-panel"></div>
  <div className="curtain-panel"></div>
  {/* Add more or remove some */}
</div>
```

## Advanced Customization

### 1. Different Transitions for Different Routes
```typescript
// In BarbaWrapper.tsx
transitions: [
  {
    name: 'home-transition',
    from: { namespace: 'home' },
    to: { namespace: 'learn' },
    // Custom transition for home → learn
  },
  {
    name: 'default',
    // Default for all other routes
  }
]
```

### 2. Add Sound Effects
```typescript
// In the leave hook
const audio = new Audio('/transition-sound.mp3');
audio.volume = 0.3;
audio.play();
```

### 3. Loading Progress Bar
```typescript
// Show progress during transition
const progressBar = document.querySelector('.progress-bar');
gsap.to(progressBar, {
  width: '100%',
  duration: 0.7,
  ease: 'linear'
});
```

## Debugging Tips

### 1. Enable Barba Debug Mode
```typescript
barba.init({
  debug: true, // Add this
  transitions: [...]
});
```

### 2. Log Transition Events
```typescript
barba.hooks.before(() => {
  console.log('Transition starting');
});

barba.hooks.after(() => {
  console.log('Transition complete');
});
```

### 3. Check Animation Performance
Open Chrome DevTools → Performance → Record → Click a link → Stop
Look for smooth 60fps animations.

## Common Customizations

### 1. Faster Transitions
```typescript
// In BarbaWrapper.tsx
duration: 0.4, // Reduced from 0.7
stagger: 0.04, // Reduced from 0.06
```

### 2. Slower, More Dramatic
```typescript
duration: 1.2, // Increased from 0.7
stagger: 0.1,  // Increased from 0.06
```

### 3. Different Easing
```typescript
ease: 'elastic.out(1, 0.5)', // Bouncy
ease: 'back.inOut(1.7)',     // Overshoot
ease: 'expo.inOut',          // Exponential
```

## Mobile Optimization

### 1. Reduce Panels on Mobile
```css
@media (max-width: 768px) {
  .curtain-panel:nth-child(4),
  .curtain-panel:nth-child(5) {
    display: none;
  }
}
```

### 2. Faster on Mobile
```typescript
const isMobile = window.innerWidth < 768;
const duration = isMobile ? 0.4 : 0.7;
```

## SEO Considerations

### 1. Update Page Title
```typescript
// In enter hook
document.title = data.next.container.dataset.pageTitle || 'Default Title';
```

### 2. Update Meta Tags
```typescript
// In enter hook
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.setAttribute('content', newDescription);
}
```

## Accessibility

### 1. Announce Page Changes
```typescript
// In enter hook
const announcement = document.createElement('div');
announcement.setAttribute('role', 'status');
announcement.setAttribute('aria-live', 'polite');
announcement.textContent = `Navigated to ${pageName}`;
document.body.appendChild(announcement);
```

### 2. Focus Management
```typescript
// In enter hook
const mainHeading = document.querySelector('h1');
if (mainHeading) {
  mainHeading.focus();
}
```

## Testing Checklist

- [ ] Test all navigation links
- [ ] Test browser back/forward buttons
- [ ] Test on mobile devices
- [ ] Test with slow network (throttle in DevTools)
- [ ] Test with screen reader
- [ ] Test keyboard navigation
- [ ] Test external links (should not transition)
- [ ] Test hash links (should not transition)

## Resources

- [Barba.js Docs](https://barba.js.org/)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)
- [Gradient Generator](https://cssgradient.io/)
- [Color Palette Tool](https://coolors.co/)

---

Have fun creating amazing transitions! 🎨✨
