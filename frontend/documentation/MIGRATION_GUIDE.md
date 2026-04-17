# React + TypeScript Migration Guide

## ✅ Completed Components

### Core Infrastructure
- ✅ `src/hooks/useLenis.ts` - Smooth scroll hook with GSAP integration
- ✅ `src/utils/TextScramble.ts` - Glitch text effect utility
- ✅ `src/components/CustomCursor.tsx` - Custom cursor with GSAP quickTo
- ✅ `src/components/Navbar.tsx` - Navigation with magnetic effects
- ✅ `src/components/FullscreenMenu.tsx` - Animated fullscreen menu
- ✅ `src/components/Hero.tsx` - Hero section with entrance animations
- ✅ `src/App.tsx` - Main app component with Lenis integration
- ✅ `src/main.tsx` - React entry point
- ✅ `index.html` - Clean HTML with React root

## 🚧 Components To Create

### Sections (Priority Order)
1. **Marquee.tsx** - Velocity-reactive marquee bands
2. **Stats.tsx** - Animated statistics with SVG paths
3. **Craft.tsx** - Learning paths with craft cards
4. **CraftModal.tsx** - Modal for craft card details
5. **HowItWorks.tsx** - How it works section with hover images
6. **Sessions.tsx** - Live sessions section
7. **Comparator.tsx** - Before/After image comparator
8. **Jobs.tsx** - Jobs and internships grid
9. **Fame.tsx** - Hall of Fame with leaderboard
10. **Footer.tsx** - Footer with CTA

### Utilities & Hooks
- `hooks/useScrollAnimations.ts` - Reusable scroll trigger animations
- `hooks/useMarquee.ts` - Marquee animation logic
- `hooks/useMagnetic.ts` - Magnetic element effect
- `utils/animations.ts` - Shared animation configurations

## 📁 Current Structure

```
frontend/src/
├── components/
│   ├── CustomCursor.tsx ✅
│   ├── Navbar.tsx ✅
│   ├── FullscreenMenu.tsx ✅
│   ├── Hero.tsx ✅
│   ├── Marquee.tsx (TODO)
│   ├── Stats.tsx (TODO)
│   ├── Craft.tsx (TODO)
│   ├── CraftModal.tsx (TODO)
│   ├── HowItWorks.tsx (TODO)
│   ├── Sessions.tsx (TODO)
│   ├── Comparator.tsx (TODO)
│   ├── Jobs.tsx (TODO)
│   ├── Fame.tsx (TODO)
│   └── Footer.tsx (TODO)
├── hooks/
│   ├── useLenis.ts ✅
│   ├── useScrollAnimations.ts (TODO)
│   ├── useMarquee.ts (TODO)
│   └── useMagnetic.ts (TODO)
├── utils/
│   ├── TextScramble.ts ✅
│   └── animations.ts (TODO)
├── seo/
│   └── SEOMeta.tsx ✅
├── assets/ (unchanged)
├── App.tsx ✅
├── main.tsx ✅
└── style.css (unchanged)
```

## 🎯 Implementation Guidelines

### 1. Component Pattern
```tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ComponentName: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // All GSAP animations here
      gsap.from('.element', { /* animation */ });
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        // config
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={sectionRef}>
      {/* JSX */}
    </section>
  );
};
```

### 2. Animation Cleanup
- Always use `gsap.context()` for scoped animations
- Return cleanup function in `useEffect`
- Kill ScrollTriggers on unmount: `return () => ScrollTrigger.getAll().forEach(st => st.kill())`

### 3. Refs for GSAP
- Use `useRef` for elements that GSAP animates
- Don't use state for animation values
- Let GSAP handle DOM mutations

### 4. Lenis Integration
- Initialize once in App.tsx
- Pass lenisRef to components that need scroll control
- Use `lenis.scrollTo()` for smooth scrolling

## 🔧 Next Steps

1. **Create Marquee Component**
   - Velocity-reactive speed
   - Infinite loop animation
   - Two tracks (forward/reverse)

2. **Create Stats Component**
   - SVG path drawing
   - Counter animations
   - ScrollTrigger integration

3. **Create Craft Component**
   - Card grid with stagger
   - Preview animations
   - Modal integration

4. **Create CraftModal Component**
   - Overlay with backdrop
   - Content population from data attributes
   - Video embed support

5. **Continue with remaining sections...**

## ⚠️ Critical Rules

- ❌ Never change animation timings/easings
- ❌ Never modify CSS classes
- ❌ Never remove features
- ✅ Keep all data attributes
- ✅ Preserve exact visual appearance
- ✅ Test each component before moving to next
- ✅ Ensure proper cleanup (no memory leaks)

## 🧪 Testing Checklist

- [ ] Smooth scroll works
- [ ] Custom cursor follows mouse
- [ ] Menu opens/closes with animations
- [ ] Hero entrance animation plays
- [ ] All ScrollTrigger animations fire
- [ ] Counters animate on scroll
- [ ] Marquees move continuously
- [ ] Craft modal opens with data
- [ ] Tilt effects work on cards
- [ ] No console errors
- [ ] No animation jank

## 🚀 Running the Project

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to see the React version.

## 📝 Notes

- All animations preserved from original main.js
- CSS remains unchanged
- Assets remain in same location
- TypeScript for type safety
- React 19 with latest features
