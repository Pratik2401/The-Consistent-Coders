# Adding Scroll Effects to Your Components

Quick guide to add smooth scroll effects to your existing components.

## 🎯 Common Patterns

### Hero Section with Fade In

```jsx
<section className="hero">
  <h1 data-scroll data-scroll-class="fade-in">
    Your Hero Title
  </h1>
  
  <p data-scroll data-scroll-class="fade-in" data-scroll-delay="0.1">
    Your subtitle
  </p>
  
  <button data-scroll data-scroll-class="slide-up" data-scroll-delay="0.2">
    Call to Action
  </button>
</section>
```

### Card Grid with Staggered Animation

```jsx
<div className="card-grid">
  {cards.map((card, index) => (
    <div 
      key={card.id}
      data-scroll 
      data-scroll-class="slide-up"
      data-scroll-delay={index * 0.1}
    >
      {card.content}
    </div>
  ))}
</div>
```

### Parallax Background

```jsx
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <div 
    data-scroll 
    data-scroll-speed="0.5"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(...)',
      zIndex: -1
    }}
  />
  
  <div className="content">
    Your content here
  </div>
</section>
```

### Image Gallery with Scale Effect

```jsx
<div className="gallery">
  {images.map((img) => (
    <div 
      key={img.id}
      data-scroll 
      data-scroll-class="scale"
    >
      <img src={img.src} alt={img.alt} />
    </div>
  ))}
</div>
```

### Text Reveal on Scroll

```jsx
<div className="text-section">
  <h2 data-scroll data-scroll-class="slide-up">
    Section Title
  </h2>
  
  <p data-scroll data-scroll-class="fade-in" data-scroll-delay="0.1">
    First paragraph
  </p>
  
  <p data-scroll data-scroll-class="fade-in" data-scroll-delay="0.2">
    Second paragraph
  </p>
</div>
```

### Scroll-to-Section Button

```jsx
import { scrollToElement } from './utils/smoothScroll';
import { useLenis } from './hooks/useLenis';

function MyComponent() {
  const lenisRef = useLenis();

  return (
    <>
      <button 
        onClick={() => scrollToElement(lenisRef.current, '#about-section')}
      >
        Learn More
      </button>
      
      <section id="about-section">
        About content
      </section>
    </>
  );
}
```

### Back to Top Button

```jsx
import { scrollToTop } from './utils/smoothScroll';
import { useLenis } from './hooks/useLenis';
import { useEffect, useState } from 'react';

function BackToTop() {
  const lenisRef = useLenis();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button 
      onClick={() => scrollToTop(lenisRef.current)}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000
      }}
    >
      ↑ Back to Top
    </button>
  );
}
```

### Navbar with Smooth Scroll Links

```jsx
import { scrollToElement } from './utils/smoothScroll';
import { useLenis } from './hooks/useLenis';

function Navbar() {
  const lenisRef = useLenis();

  const scrollTo = (id: string) => {
    scrollToElement(lenisRef.current, id, { offset: -80 }); // Account for fixed navbar
  };

  return (
    <nav>
      <button onClick={() => scrollTo('#home')}>Home</button>
      <button onClick={() => scrollTo('#about')}>About</button>
      <button onClick={() => scrollTo('#services')}>Services</button>
      <button onClick={() => scrollTo('#contact')}>Contact</button>
    </nav>
  );
}
```

### Modal with Scroll Lock

```jsx
import { stopScroll, startScroll } from './utils/smoothScroll';
import { useLenis } from './hooks/useLenis';
import { useEffect } from 'react';

function Modal({ isOpen, onClose }) {
  const lenisRef = useLenis();

  useEffect(() => {
    if (isOpen) {
      stopScroll(lenisRef.current);
    } else {
      startScroll(lenisRef.current);
    }

    return () => startScroll(lenisRef.current);
  }, [isOpen, lenisRef]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <div className="modal-content">
        Your modal content
      </div>
    </div>
  );
}
```

### Feature Section with Multiple Effects

```jsx
<section className="features">
  <h2 data-scroll data-scroll-class="fade-in">
    Our Features
  </h2>
  
  <div className="features-grid">
    <div data-scroll data-scroll-class="slide-up" data-scroll-delay="0">
      <h3>Feature 1</h3>
      <p>Description</p>
    </div>
    
    <div data-scroll data-scroll-class="slide-up" data-scroll-delay="0.1">
      <h3>Feature 2</h3>
      <p>Description</p>
    </div>
    
    <div data-scroll data-scroll-class="slide-up" data-scroll-delay="0.2">
      <h3>Feature 3</h3>
      <p>Description</p>
    </div>
  </div>
  
  <div 
    data-scroll 
    data-scroll-speed="1.5"
    className="floating-element"
  >
    Decorative element
  </div>
</section>
```

## 🎨 Animation Types Reference

| Effect | Attribute | Description |
|--------|-----------|-------------|
| Fade In | `data-scroll-class="fade-in"` | Fades from 0 to 1 opacity |
| Slide Up | `data-scroll-class="slide-up"` | Slides up from 50px below |
| Scale | `data-scroll-class="scale"` | Scales from 0.9 to 1 |
| Parallax Slow | `data-scroll-speed="0.5"` | Moves at half scroll speed |
| Parallax Fast | `data-scroll-speed="2"` | Moves at double scroll speed |

## ⏱️ Delay Values

Use `data-scroll-delay` for staggered animations:

- `0` - No delay
- `0.1` - 100ms delay
- `0.2` - 200ms delay
- `0.3` - 300ms delay

## 💡 Pro Tips

1. **Don't overdo it** - Too many animations can be overwhelming
2. **Stagger wisely** - Use 0.1s increments for smooth staggering
3. **Test on mobile** - Animations are disabled on mobile for performance
4. **Use parallax sparingly** - Too much parallax can cause motion sickness
5. **Combine effects** - Mix fade-in with slide-up for nice results

## 🚫 What NOT to Do

```jsx
// ❌ Don't animate every single element
<div data-scroll data-scroll-class="fade-in">
  <p data-scroll data-scroll-class="fade-in">
    <span data-scroll data-scroll-class="fade-in">Text</span>
  </p>
</div>

// ✅ Animate the parent instead
<div data-scroll data-scroll-class="fade-in">
  <p>
    <span>Text</span>
  </p>
</div>
```

```jsx
// ❌ Don't use extreme parallax speeds
<div data-scroll data-scroll-speed="10">Too fast!</div>

// ✅ Use subtle speeds
<div data-scroll data-scroll-speed="1.5">Just right</div>
```

Happy scrolling! 🎉
