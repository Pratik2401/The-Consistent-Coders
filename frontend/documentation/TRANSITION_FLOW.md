# 🎬 Page Transition Flow Diagram

## Visual Flow

```
User Clicks Nav Link
        ↓
BarbaWrapper Intercepts Click
        ↓
Barba.js Triggers "leave" Hook
        ↓
┌─────────────────────────────┐
│  Curtain Panels Sweep Down  │
│  (5 colorful panels)         │
│  Duration: 0.7s              │
│  Stagger: 0.06s              │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│  Current Page Fades Out      │
│  Duration: 0.2s              │
└─────────────────────────────┘
        ↓
React Router Navigates
        ↓
New Page Component Mounts
        ↓
Barba.js Triggers "enter" Hook
        ↓
┌─────────────────────────────┐
│  Scroll to Top               │
│  ScrollTrigger.refresh()     │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│  New Page Fades In           │
│  Duration: 0.3s              │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│  Curtain Panels Sweep Up     │
│  Duration: 0.7s              │
│  Stagger: 0.06s              │
└─────────────────────────────┘
        ↓
Transition Complete!
New Page Fully Visible
```

## Component Architecture

```
App.tsx
  └── Router
      └── BarbaWrapper
          └── AppContent
              ├── Navbar (with navigation links)
              ├── FullscreenMenu
              ├── CustomCursor
              ├── Transition Curtain (5 panels)
              └── Routes
                  ├── HomePage
                  ├── LearnPage
                  ├── BuildPage
                  ├── JobsPage
                  └── ContactPage
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── BarbaWrapper.tsx       ← Main integration
│   │   ├── Navbar.tsx              ← Navigation links
│   │   └── TransitionDemo.tsx      ← Demo component
│   ├── transitions/
│   │   └── barbaTransitions.ts     ← 5 transition effects
│   ├── hooks/
│   │   └── useBarba.ts             ← Alternative hook
│   ├── App.tsx                     ← Wrapped with BarbaWrapper
│   └── App.css                     ← Transition styles
└── Documentation/
    ├── QUICK_TRANSITION_GUIDE.md
    ├── TRANSITION_SETUP_COMPLETE.md
    ├── BARBA_TRANSITIONS.md
    ├── TRANSITIONS_SUMMARY.md
    └── TRANSITION_FLOW.md (this file)
```

## Timing Breakdown

```
Total Transition Time: ~1.4 seconds

Leave Phase (0.7s):
├── Panels sweep down: 0.7s
└── Page fade out: 0.2s (overlaps at -0.3s)

Navigation: 0.05s
└── React Router + DOM update

Enter Phase (0.7s):
├── Page fade in: 0.3s
└── Panels sweep up: 0.7s (overlaps at -0.1s)
```

## Color Palette

```
Panel 1: Purple Gradient  (#667eea → #764ba2)
Panel 2: Pink Gradient    (#f093fb → #f5576c)
Panel 3: Blue Gradient    (#4facfe → #00f2fe)
Panel 4: Green Gradient   (#43e97b → #38f9d7)
Panel 5: Orange Gradient  (#fa709a → #fee140)
```

## Event Flow

```
1. Click Event
   └── Captured by BarbaWrapper

2. Barba.js Processing
   ├── Check if internal link
   ├── Prevent default navigation
   └── Trigger transition

3. Leave Animation
   ├── Show curtain
   ├── Animate panels
   └── Fade out content

4. Navigation
   ├── React Router navigate()
   ├── Component unmount
   └── New component mount

5. Enter Animation
   ├── Scroll to top
   ├── Refresh ScrollTrigger
   ├── Fade in content
   └── Hide curtain

6. Complete
   └── User can interact
```

## Integration Points

```
BarbaWrapper
├── Integrates with React Router (navigate)
├── Integrates with GSAP (animations)
├── Integrates with ScrollTrigger (refresh)
└── Integrates with Lenis (scroll position)
```

---

This visual guide helps you understand how everything works together! 🎨
