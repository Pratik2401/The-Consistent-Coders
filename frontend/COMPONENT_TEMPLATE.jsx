/**
 * COMPONENT TEMPLATE
 *
 * Use this as a starting point for creating new components.
 * Copy this file and modify as needed.
 *
 * Key Patterns:
 * 1. Use useRef for elements GSAP animates
 * 2. Use gsap.context() for scoped animations
 * 3. Always return cleanup function
 * 4. Register ScrollTrigger if using it
 * 5. Keep animation timings from original
 */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
export const ComponentName = ({ title, data }) => {
    // Refs for elements that GSAP will animate
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    // Setup animations
    useEffect(() => {
        // Create GSAP context for scoped animations
        const ctx = gsap.context(() => {
            // Example: Fade in animation
            gsap.from('.fade-element', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    // markers: true, // Uncomment for debugging
                },
            });
            // Example: Stagger animation
            gsap.from('.stagger-item', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.stagger-container',
                    start: 'top 85%',
                },
            });
            // Example: ScrollTrigger with scrub
            gsap.to('.parallax-element', {
                y: 100,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
            // Example: Counter animation
            const counters = document.querySelectorAll('.counter');
            counters.forEach((counter) => {
                const target = +(counter.getAttribute('data-target') || 0);
                const proxy = { val: 0 };
                ScrollTrigger.create({
                    trigger: counter,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        gsap.to(proxy, {
                            val: target,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: () => {
                                counter.textContent = Math.round(proxy.val).toString();
                            },
                        });
                    },
                });
            });
        }, sectionRef); // Scope to sectionRef
        // Cleanup function - CRITICAL!
        return () => {
            ctx.revert(); // Kills all animations in this context
        };
    }, []); // Empty deps array - run once on mount
    // Event handlers
    const handleClick = (e) => {
        e.preventDefault();
        // Handle click
    };
    const handleHover = (e) => {
        // Handle hover
    };
    return (<section id="section-id" className="section-component theme-dark" ref={sectionRef}>
      {/* Header */}
      <div className="component-header">
        <div className="component-label mono-text reveal-up">
          // SECTION LABEL
        </div>
        <h2 className="component-title reveal-text" ref={titleRef}>
          {title || 'Default Title'}
        </h2>
        <p className="component-subtitle reveal-up">
          Subtitle text goes here
        </p>
      </div>

      {/* Content */}
      <div className="component-content">
        {/* Example: Grid of items */}
        <div className="stagger-container">
          {data?.map((item, index) => (<div key={index} className="stagger-item" onClick={handleClick} onMouseEnter={handleHover}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>))}
        </div>

        {/* Example: Counter */}
        <div className="counter" data-target="100">
          0
        </div>

        {/* Example: Parallax element */}
        <div className="parallax-element">
          <img src="/path/to/image.jpg" alt="Description"/>
        </div>
      </div>
    </section>);
};
/**
 * USAGE EXAMPLE:
 *
 * import { ComponentName } from './components/ComponentName';
 *
 * function App() {
 *   return (
 *     <ComponentName
 *       title="My Section"
 *       data={[
 *         { title: 'Item 1', description: 'Description 1' },
 *         { title: 'Item 2', description: 'Description 2' },
 *       ]}
 *     />
 *   );
 * }
 */
/**
 * COMMON PATTERNS:
 *
 * 1. SCROLL TRIGGER REVEAL
 * gsap.from('.element', {
 *   opacity: 0,
 *   y: 50,
 *   scrollTrigger: {
 *     trigger: '.element',
 *     start: 'top 80%',
 *   }
 * });
 *
 * 2. STAGGER ANIMATION
 * gsap.from('.items', {
 *   opacity: 0,
 *   y: 30,
 *   stagger: 0.1,
 *   scrollTrigger: { trigger: '.container', start: 'top 85%' }
 * });
 *
 * 3. PARALLAX SCROLL
 * gsap.to('.element', {
 *   y: 100,
 *   scrollTrigger: {
 *     trigger: '.section',
 *     start: 'top bottom',
 *     end: 'bottom top',
 *     scrub: 1
 *   }
 * });
 *
 * 4. PINNED SECTION
 * ScrollTrigger.create({
 *   trigger: '.section',
 *   start: 'top top',
 *   end: '+=100%',
 *   pin: true,
 *   scrub: true
 * });
 *
 * 5. COUNTER ANIMATION
 * const proxy = { val: 0 };
 * gsap.to(proxy, {
 *   val: targetNumber,
 *   duration: 2,
 *   onUpdate: () => {
 *     element.textContent = Math.round(proxy.val);
 *   }
 * });
 *
 * 6. TIMELINE
 * const tl = gsap.timeline({ paused: true });
 * tl.to('.el1', { x: 100 })
 *   .to('.el2', { y: 100 }, '-=0.5')
 *   .to('.el3', { opacity: 1 });
 * tl.play();
 *
 * 7. HOVER EFFECT
 * element.addEventListener('mouseenter', () => {
 *   gsap.to(element, { scale: 1.1, duration: 0.3 });
 * });
 * element.addEventListener('mouseleave', () => {
 *   gsap.to(element, { scale: 1, duration: 0.3 });
 * });
 */
/**
 * CLEANUP CHECKLIST:
 *
 * ✅ Use gsap.context() for scoped animations
 * ✅ Return ctx.revert() in useEffect cleanup
 * ✅ Remove event listeners in cleanup
 * ✅ Kill timelines in cleanup
 * ✅ Clear intervals/timeouts in cleanup
 * ✅ Test for memory leaks (React DevTools Profiler)
 */
/**
 * TESTING CHECKLIST:
 *
 * ✅ Component renders without errors
 * ✅ Animations trigger on scroll
 * ✅ Hover effects work
 * ✅ Click handlers work
 * ✅ No console errors
 * ✅ Cleanup works (no memory leaks)
 * ✅ Responsive on mobile
 * ✅ Accessible (keyboard navigation)
 */
