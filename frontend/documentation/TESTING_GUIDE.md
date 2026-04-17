# Testing Guide

## 🧪 Complete Testing Checklist

Use this guide to ensure everything works correctly after migration and when adding new components.

---

## ✅ Phase 1 Testing (Current Components)

### 1. Initial Setup Test
```bash
cd frontend
npm install
npm run dev
```

**Expected:**
- ✅ No installation errors
- ✅ Dev server starts on port 5173
- ✅ Browser opens automatically
- ✅ No console errors

---

### 2. Hero Section Tests

**Visual Tests:**
- [ ] Hero section visible on page load
- [ ] Background image loads correctly
- [ ] Text is readable and properly styled
- [ ] Badges visible in bottom right

**Animation Tests:**
- [ ] Clip-path entrance animation plays on load
- [ ] Hero eyebrow fades in
- [ ] Title lines slide up with stagger
- [ ] Subtext fades in
- [ ] CTA button fades in
- [ ] Background image zooms on scroll
- [ ] Font weight changes on scroll

**Interaction Tests:**
- [ ] "START YOUR JOURNEY" button is clickable
- [ ] Button hover effect works (liquid wave)
- [ ] Scroll hint animates
- [ ] Liquid hover effect on "THE" works

---

### 3. Custom Cursor Tests

**Visual Tests:**
- [ ] Cursor dot visible and follows mouse
- [ ] Cursor ring visible and follows mouse (with lag)
- [ ] Default cursor is hidden

**Interaction Tests:**
- [ ] Cursor dot expands on hover over links
- [ ] Cursor ring expands on hover over buttons
- [ ] Cursor changes on click (clicking class)
- [ ] Cursor text appears on elements with data-cursor-text
- [ ] Cursor-follow image appears on HIW rows (when implemented)

**Performance Tests:**
- [ ] Cursor movement is smooth (60fps)
- [ ] No lag or jitter
- [ ] Works across entire page

---

### 4. Navbar Tests

**Visual Tests:**
- [ ] Navbar visible at top of page
- [ ] Glass panel effect visible
- [ ] TCC brand text visible
- [ ] Hamburger icon visible

**Animation Tests:**
- [ ] Navbar hides when scrolling down (after 200px)
- [ ] Navbar shows when scrolling up
- [ ] Magnetic effect on brand text
- [ ] Magnetic effect on hamburger
- [ ] Glitch hover effect on "TCC"

**Interaction Tests:**
- [ ] Hamburger click opens menu
- [ ] Hamburger transforms to X when menu open
- [ ] Keyboard navigation works (Tab, Enter, Space)

---

### 5. Fullscreen Menu Tests

**Visual Tests:**
- [ ] Menu overlay covers entire screen
- [ ] Menu background is black
- [ ] Menu links are visible and styled
- [ ] Footer text visible
- [ ] Social links visible
- [ ] Counter visible

**Animation Tests:**
- [ ] Menu background slides down
- [ ] Menu links reveal with stagger
- [ ] Footer fades in
- [ ] Social links slide in
- [ ] Counter fades in
- [ ] Reverse animation on close

**Interaction Tests:**
- [ ] Click menu link - smooth scrolls to section
- [ ] Click overlay - menu closes
- [ ] Press Escape - menu closes
- [ ] Hover menu link - text effect works
- [ ] Hover menu link - counter updates
- [ ] Email link is clickable
- [ ] Social links are clickable

**Scroll Tests:**
- [ ] Body scroll disabled when menu open
- [ ] Smooth scroll to section works
- [ ] Menu closes after navigation
- [ ] Lenis scroll resumes after close

---

### 6. Marquee Tests

**Visual Tests:**
- [ ] Marquee band visible
- [ ] Text is readable
- [ ] Accent dots visible
- [ ] Border lines visible

**Animation Tests:**
- [ ] Marquee scrolls continuously
- [ ] Direction is correct (left to right)
- [ ] Speed increases with scroll velocity
- [ ] Loop is seamless (no jump)

**Performance Tests:**
- [ ] Animation is smooth (60fps)
- [ ] No jitter or lag
- [ ] Works on mobile

---

### 7. Stats Section Tests

**Visual Tests:**
- [ ] Stats section visible
- [ ] SVG background visible
- [ ] Four stat items visible
- [ ] Numbers and labels readable

**Animation Tests:**
- [ ] SVG paths draw on scroll
- [ ] Numbers count up from 0
- [ ] Stat items fade in
- [ ] Animations trigger at correct scroll position

**Interaction Tests:**
- [ ] Counters animate once (not on scroll back)
- [ ] Final numbers are correct:
  - 265+ (Active Members)
  - 5+ (Live Projects)
  - 100% (Free to Join)
  - 100 (Sessions Coming Soon)

---

## 🔍 Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Screen Sizes
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🐛 Console Error Checks

### No Errors
- [ ] No JavaScript errors
- [ ] No TypeScript errors
- [ ] No React warnings
- [ ] No GSAP warnings
- [ ] No 404 errors (missing assets)

### Performance
- [ ] No memory leaks (check DevTools Memory)
- [ ] No excessive re-renders (check React DevTools)
- [ ] Smooth 60fps animations (check Performance tab)

---

## ⚡ Performance Testing

### Lighthouse Scores (Target)
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### Bundle Size
```bash
npm run build
```
- [ ] Check dist/ folder size
- [ ] Verify code splitting
- [ ] Check for unused dependencies

### Load Time
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Total page load < 5s

---

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes menu
- [ ] Focus visible on all elements

### Screen Reader
- [ ] All images have alt text
- [ ] All buttons have aria-labels
- [ ] Headings are in correct order
- [ ] Links are descriptive

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Accent color has sufficient contrast
- [ ] Focus indicators visible

---

## 📱 Mobile Testing

### Touch Interactions
- [ ] Tap works on all buttons
- [ ] Swipe scroll works
- [ ] No hover-only interactions
- [ ] Touch targets are large enough (44x44px)

### Responsive Design
- [ ] Layout adapts to screen size
- [ ] Text is readable (no tiny fonts)
- [ ] Images scale correctly
- [ ] No horizontal scroll

### Performance
- [ ] Animations smooth on mobile
- [ ] No lag or jitter
- [ ] Fast load time

---

## 🔄 State Management Tests

### Menu State
- [ ] Menu opens correctly
- [ ] Menu closes correctly
- [ ] State persists during navigation
- [ ] No state bugs

### Scroll State
- [ ] Lenis initializes correctly
- [ ] Scroll position tracked
- [ ] Smooth scroll works
- [ ] No scroll bugs

---

## 🧹 Cleanup Tests

### Memory Leaks
1. Open React DevTools Profiler
2. Navigate through page
3. Check for memory growth
4. Verify cleanup functions run

### Event Listeners
1. Open DevTools Console
2. Run: `getEventListeners(document)`
3. Verify no duplicate listeners
4. Check cleanup on unmount

### GSAP Animations
1. Check ScrollTrigger.getAll().length
2. Navigate and check again
3. Verify old triggers are killed
4. No orphaned animations

---

## 📊 Testing Tools

### Browser DevTools
- **Console** - Check for errors
- **Network** - Check asset loading
- **Performance** - Check FPS and load time
- **Memory** - Check for leaks
- **Lighthouse** - Check scores

### React DevTools
- **Components** - Check component tree
- **Profiler** - Check re-renders
- **Hooks** - Check hook state

### Extensions
- **React DevTools** - Component debugging
- **Redux DevTools** - State debugging (if using Redux)
- **WAVE** - Accessibility testing
- **axe DevTools** - Accessibility testing

---

## 🎯 Test Scenarios

### Scenario 1: First Visit
1. Clear cache and cookies
2. Visit site
3. Check all animations play
4. Check all assets load
5. Check no errors

### Scenario 2: Navigation
1. Click menu
2. Navigate to section
3. Check smooth scroll
4. Check menu closes
5. Check section loads

### Scenario 3: Scroll Journey
1. Start at top
2. Scroll slowly to bottom
3. Check all animations trigger
4. Check no jank
5. Scroll back up
6. Check animations don't re-trigger

### Scenario 4: Interaction
1. Hover over all interactive elements
2. Click all buttons
3. Open and close menu
4. Check all effects work
5. Check no errors

---

## 🚨 Critical Issues to Watch For

### Animation Issues
- ❌ Animations not triggering
- ❌ Animations triggering multiple times
- ❌ Jank or lag in animations
- ❌ Animations not cleaning up

### Scroll Issues
- ❌ Smooth scroll not working
- ❌ Scroll position jumping
- ❌ ScrollTrigger not firing
- ❌ Scroll locked when menu open

### Cursor Issues
- ❌ Cursor not following mouse
- ❌ Cursor lag or jitter
- ❌ Cursor not changing on hover
- ❌ Cursor visible when it shouldn't be

### Menu Issues
- ❌ Menu not opening
- ❌ Menu not closing
- ❌ Menu animations broken
- ❌ Menu links not working

---

## ✅ Sign-Off Checklist

Before considering Phase 1 complete:

### Functionality
- [ ] All components render
- [ ] All animations work
- [ ] All interactions work
- [ ] No console errors
- [ ] No TypeScript errors

### Performance
- [ ] Smooth 60fps animations
- [ ] Fast load time
- [ ] No memory leaks
- [ ] Good Lighthouse scores

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Good color contrast
- [ ] Proper ARIA labels

### Cross-Browser
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

### Mobile
- [ ] Responsive design
- [ ] Touch interactions work
- [ ] Good mobile performance
- [ ] No horizontal scroll

---

## 📝 Bug Report Template

If you find a bug, use this template:

```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Screen Size: [e.g., 1920x1080]

## Console Errors
[Any errors from console]

## Screenshots
[If applicable]
```

---

## 🎉 Testing Complete!

If all tests pass, you're ready to move to Phase 2!

See **IMPLEMENTATION_STEPS.md** for next components to build.
